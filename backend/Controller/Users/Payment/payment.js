const sequelize = require("../../../database");
const { MINIMUM_AMOUNT_IN_ACCOUNT, MINIMUM_FIRST_TIME_DEPOSIT_AMOUNT } = require("../../../importantInfo");
const User = require("../../../Models/User/users");
const Referrals = require("../../../Models/Wallet/referrals");
const Transaction = require("../../../Models/Wallet/transaction");
const TransactionHistory = require("../../../Models/Wallet/transactionHistory");
const Wallet = require("../../../Models/Wallet/wallet");
const { savePaymentRequest, verifyPaymentRequest } = require("./phonePayUtils");
const jwt = require("jsonwebtoken");

exports.addFunds = async (req, res, next) => {
  const { amount } = req.body; // Get amount from request body
  const { customerId, phone, id: userId } = req.user; // Get candidate ID, mobile, and userId from req.user

  // Start a Sequelize transaction
  let t;

  try {
    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount provided." });
    }

    // Get the Wallet of the user to fetch balance
    const userWallet = await Wallet.findOne({
      where: { UserId: userId },
      // transaction: t, // Include transaction
    });

    if (!userWallet) {
      throw new Error("Wallet not found for the user.");
    }

    const minimumAmount = MINIMUM_FIRST_TIME_DEPOSIT_AMOUNT;
    if (!userWallet.isFundedFirst) {
      if (amount < minimumAmount) {
        return res.status(403).json({
          message: `First time payment must be greater than or equal to ${minimumAmount}.00`,
        });
      }
    }

    const currentBalance = userWallet.deposit;

    // Call savePaymentRequest function
    const { paymentResult, merchantTransactionId, merchantUserId } =
      await savePaymentRequest(customerId, phone, amount);

    if (
      paymentResult &&
      paymentResult.data &&
      paymentResult.data.instrumentResponse &&
      paymentResult.data.instrumentResponse.redirectInfo
    ) {
      const redirectInfo = paymentResult.data.instrumentResponse.redirectInfo; // Get the redirect URL from response
      t = await sequelize.transaction();

      // Create a new Transaction
      const transaction = await Transaction.create(
        {
          merchantTransactionId,
          merchantUserId,
          isVerified: false, // Initially mark as unverified
          amount,
          status: "pending", // Transaction status as pending
          time: new Date(),
          UserId: userId, // Associate with the user
        },
        { transaction: t } // Include transaction
      );

      // Create a new TransactionHistory
      const transactionHistory = await TransactionHistory.create(
        {
          transactionType: "paymentGateway", // Transaction type as payment gateway
          merchantUserId,
          merchantTransactionId,
          remark: `Payment of ₹${amount} initiated via gateway.`,
          credit: 0, // No credit for this entry
          debit: 0, // No debit for this entry yet
          balance: currentBalance, // Use the user's Wallet balance
          UserId: userId, // Associate with the user
        },
        { transaction: t } // Include transaction
      );

      // Commit the transaction if all operations succeed
      await t.commit();

      const expiresIn = "5m";
      const token = jwt.sign(
        { redirectInfo, transactionId: merchantTransactionId, amount },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn,
        }
      );
      // Return the redirect URL to the user
      return res.status(200).json({ redirectInfo, token });
    } else {
      // If savePaymentRequest fails, rollback the transaction
      //await t.rollback();
      return res
        .status(500)
        .json({ message: "Failed to process payment. Please try again." });
    }
  } catch (error) {
    console.error("Error in addFunds:", error);
    // Rollback the transaction in case of error
    if (t) {
      await t.rollback();
    }
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

exports.verifyPaymentStatus = async (req, res, next) => {
  let t; // Start a Sequelize transaction
  try {
    const { merchantTransactionId } = req.body;

    // Find the transaction by merchantTransactionId
    const transaction = await Transaction.findOne({
      where: { merchantTransactionId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // Check if the transaction is already verified
    if (transaction.isVerified) {
      return res.status(201).json({
        merchantTransactionId: transaction.merchantTransactionId,
        status: transaction.status === "Successful" ? "Successful" : "Failed",
        amount: transaction.amount,
        time: transaction.time,
      });
    }

    const user = User.findOne({ where: { id: transaction.UserId } });
    // Proceed to check payment status from PhonePay API
    let response = await verifyPaymentRequest(merchantTransactionId);
    response = response.data;

    // Get the user's Wallet and update the balance
    const wallet = await Wallet.findOne({
      where: { UserId: transaction.UserId },
    });

    if (!wallet) {
      throw new Error("User's Wallet not found.");
    }

    // Handle COMPLETED payment
    if (response.data && response.data.state === "COMPLETED") {
      t = await sequelize.transaction();
      // Mark the transaction as successful and verified
      transaction.isVerified = true;
      transaction.status = "Successful";
      await transaction.save({ transaction: t });

      const newBalance =
        parseFloat(wallet.deposit) + parseFloat(transaction.amount);
      wallet.deposit = newBalance;
      await wallet.save({ transaction: t });

      // Handle referral logic if first-time funding
      if (!wallet.isFundedFirst) {
        wallet.isFundedFirst = true;
        await wallet.save({ transaction: t });

        // Referral processing
        const user = await User.findByPk(transaction.UserId);
        if (user.byReferallId && !user.isByReferralUsed) {
          const referral = await Referrals.findOne({
            where: { referralId: user.byReferallId },
            // transaction: t,
          });

          if (referral) {
            const referringUser = await User.findByPk(referral.UserId, {
              // transaction: t,
            });
            const referringWallet = await Wallet.findOne({
              where: { UserId: referringUser.id },
              // transaction: t,
            });
            const rewardAmount = REFERRAL_REWARD_AMOUNT;
            if (referringWallet && rewardAmount > 0) {
              const updatedBalance =
                parseFloat(referringWallet.deposit) + rewardAmount;
              referringWallet.deposit = updatedBalance;
              await referringWallet.save({ transaction: t });

              // Create a transaction history for the referring user
              await TransactionHistory.create(
                {
                  transactionType: "referral",
                  remark: `Referral bonus for Customer Id ${user.candidateId}`,
                  credit: 800,
                  debit: 0,
                  balance: updatedBalance,
                  UserId: referringUser.id,
                },
                { transaction: t }
              );
            }
            referral.pendingReferrals -= 1;
            await referral.save({ transaction: t });

            await ReferredUser.update(
              {
                status: "completed",
                dateOfCompletion: new Date(),
              },
              {
                where: { candidateId: user.candidateId },
                transaction: t,
              }
            );
            await user.update({ isByReferralUsed: true }, { transaction: t });
          }
        }
      }

      // Delete old TransactionHistory before creating a new one
      await TransactionHistory.destroy({
        where: { merchantTransactionId: transaction.merchantTransactionId },
        transaction: t,
      });

      // Create a new transaction history for the user
      const thistory = await TransactionHistory.create(
        {
          transactionType: "paymentGateway",
          merchantUserId: transaction.merchantUserId,
          merchantTransactionId: transaction.merchantTransactionId,
          remark: `Payment Successful of amount ₹${parseFloat(
            transaction.amount
          ).toFixed(2)}`,
          credit: transaction.amount,
          debit: 0,
          balance: newBalance,
          UserId: transaction.UserId,
        },
        { transaction: t }
      );

      // Commit the transaction
      await t.commit();

      // Respond with success
      return res.status(200).json({
        merchantTransactionId: transaction.merchantTransactionId,
        status: "Successful",
        amount: transaction.amount,
        time: transaction.time,
      });
    }

    // Handle PENDING payment status
    else if (response.data && response.data.state === "PENDING") {
      //console.log(response);
      // No database changes, just return the pending status
      return res.status(200).json({
        merchantTransactionId: transaction.merchantTransactionId,
        status: "Pending",
        message: "Your request is in pending state.",
        amount: transaction.amount,
        time: transaction.time,
      });
    }

    // Handle FAILED payment case
    else {
      t = await sequelize.transaction();
      transaction.isVerified = true;
      transaction.status = "Failed";
      await transaction.save({ transaction: t });

      // Delete old TransactionHistory before creating a new one
      await TransactionHistory.destroy({
        where: { merchantTransactionId: transaction.merchantTransactionId },
        transaction: t,
      });

      // Create a new transaction history for failed payment
      await TransactionHistory.create(
        {
          transactionType: "paymentGateway",
          merchantUserId: transaction.merchantUserId,
          merchantTransactionId: transaction.merchantTransactionId,
          remark: `Payment Failed of amount ₹${parseFloat(
            transaction.amount
          ).toFixed(2)}`,
          credit: 0,
          debit: 0,
          UserId: req.user.id,
          balance: wallet.deposit, // Get the current balance without modifying it
        },
        { transaction: t }
      );

      // Commit the transaction even if failed
      await t.commit();

      return res.status(200).json({
        merchantTransactionId: transaction.merchantTransactionId,
        status: "Failed",
        amount: transaction.amount,
        time: transaction.time,
      });
    }
  } catch (err) {
    // Rollback transaction in case of error
    if (t) {
      await t.rollback();
    }
    console.error("Error in checkPaymentStatus:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
