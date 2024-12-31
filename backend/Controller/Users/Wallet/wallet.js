const sequelize = require("../../../database");
const {
  MINIMUM_AMOUNT_IN_ACCOUNT,
  MINIMUM_WITHDRAWAL_AMOUNT,
} = require("../../../importantInfo");
const BankDetails = require("../../../Models/Wallet/bankDetails");
const Kyc = require("../../../Models/Wallet/kyc");
const RequestWithdrawal = require("../../../Models/Wallet/requestWithdrawal");
const TransactionHistory = require("../../../Models/Wallet/transactionHistory");
const Wallet = require("../../../Models/Wallet/wallet");
const { generateRandomId } = require("../../../Utils/utils");
const { Sequelize, Op } = require("sequelize");

exports.getWalletInfo = async (req, res) => {
  try {
    // Fetch wallet info based on the user's ID with a one-to-one relationship
    const wallet = await Wallet.findOne({ where: { UserId: req.user.id } });

    // If no wallet is found, return a 404 response
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet information not found for this user",
      });
    }

    const kyc = await Kyc.findOne({ where: { UserId: req.user.id } });
    const bankDetails = await BankDetails.findOne({
      where: { UserId: req.user.id },
    });

    const walletInfo = {
      deposit: wallet.deposit,
      unclearedDeposit: wallet.unclearedDeposit,
      cashBonus: wallet.cashBonus,
      unclearedCashBonus: wallet.unclearedCashBonus,
      netWinning: wallet.netWinning,
      unclearedNetWinning: wallet.unclearedNetWinning,
      totalWinnings: wallet.totalWinnings,
    };
    // Respond with wallet details
    return res.status(200).json({
      success: true,
      message: "Wallet information retrieved successfully",
      walletInfo,
      accountStatus: {
        kycStatus: kyc ? kyc.status : null,
        bankStatus: bankDetails ? bankDetails.status : null,
      },
    });
  } catch (error) {
    console.error("Error fetching wallet information:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve wallet information",
      error: error.message,
    });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    // Fetch transaction history based on the user's ID
    const transactions = await TransactionHistory.findAll({
      where: { UserId: req.user.id },
      limit: 20,
      order: [["createdAt", "DESC"]], // Sort by latest transactions first
    });

    // Return the transactions as a response
    return res.status(200).json({
      success: true,
      message: "Transaction history retrieved successfully",
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve transaction history",
      error: error.message,
    });
  }
};

exports.requestForWithdrawal = async (req, res) => {
  const { amount } = req.body; // Extract amount and user remark from the request body
  const userId = req.user.id; // Get the user ID from the request
  const user = req.user;
  const userRemark="";
  // Start a Sequelize transaction
  let transaction;

  try {
    // Step 1: Check if KYC agreement is accepted
    const userKyc = await Kyc.findOne({
      where: { UserId: req.user.id }, // Use candidateId to find user KYC
      // transaction,
    });

    if (!userKyc || userKyc.status !== "verified") {
      //await transaction.rollback();
      return res.status(403).json({ message: "KYC is not verified yet!" });
    }

    // Step 2: Check if bank details exist
    const bankDetails = await BankDetails.findOne({
      where: { UserId: userId }, // Check for bank details associated with the user
      //transaction,
    });

    if (!bankDetails) {
      //await transaction.rollback();
      return res.status(400).json({
        message: "Bank details not found. Please provide bank information.",
      });
    }

    // Step 3: Check the user's piggybox balance
    const wallet = await Wallet.findOne({
      where: { UserId: userId }, // Fetch the user's piggybox
      // transaction,
    });

    if (!wallet) {
      // await transaction.rollback();
      return res.status(400).json({ message: "Wallet not found." });
    }

    const pendingWithdrawals = await RequestWithdrawal.findOne({
      where: {
        UserId: user.id,
        status: {
          [Op.or]: ["pending", "locked"], // Checks for status 'pending' or 'locked'
        },
      },
      // transaction, (uncomment if using a transaction)
    });

    if (pendingWithdrawals) {
      return res.status(400).json({
        success: false,
        message: "You have already a pending withdrawal request.",
      });
    }

    if (parseFloat(amount) <= MINIMUM_WITHDRAWAL_AMOUNT) {
      return res.status(405).json({
        message: `Invalid Amount the value should be greater than ${MINIMUM_WITHDRAWAL_AMOUNT}.`,
      });
    }

    // Check if the withdrawal would violate the minimum balance requirement
    const remainingBalance = parseFloat(wallet.netWinning) - parseFloat(amount); // Calculate remaining balance after withdrawal

    if (remainingBalance < MINIMUM_AMOUNT_IN_ACCOUNT) {
      //await transaction.rollback();
      return res.status(400).json({
        message: `Insufficient funds. Minimum balance of ${MINIMUM_AMOUNT_IN_ACCOUNT} must be maintained after withdrawal.`,
      });
    }

    // Step 4: Validate withdrawal amount
    if (!amount || amount <= 0) {
      //await transaction.rollback();
      return res.status(400).json({ message: "Invalid withdrawal amount." });
    }
    transaction = await sequelize.transaction();
    // Step 5: Deduct amount from piggyBox balance and add to unclearedBalance
    await wallet.update(
      {
        netWinning: Sequelize.literal(`netWinning - ${amount}`), // Deduct amount from piggyBalance
        unclearedNetWinning: Sequelize.literal(
          `unclearedNetWinning + ${amount}`
        ), // Add amount to unclearedBalance
      },
      {
        where: { UserId: userId },
        transaction,
      }
    );
    // Step 6: Add a new TransactionHistory entry for the withdrawal
    const newBalance = parseFloat(wallet.netWinning) - parseFloat(amount);
    await TransactionHistory.create(
      {
        transactionType: "withdrawal",
        remark: "User Withdrawal requested",
        credit: 0,
        debit: amount,
        balance: newBalance,
        UserId: userId,
      },
      { transaction }
    );

    // Step 7: Get the last `requestId` and increment it
    // const lastRequest = await RequestWithdrawal.findOne({
    //   order: [["requestId", "DESC"]], // Get the latest request ID
    //   transaction,
    // });

    let newRequestId = generateRandomId(); // Start from 2000000 if there are no records
    // if (lastRequest) {
    //   newRequestId = parseInt(lastRequest.requestId) + 1; // Increment from the last requestId
    // }

    // Step 8: Create the withdrawal request with the new requestId
    const withdrawalRequest = await RequestWithdrawal.create(
      {
        requestId: newRequestId, // Assign the new requestId
        requestDate: new Date(), // Current date and time for the request
        amount,
        userRemark: userRemark || null, // User remark can be optional
        status: "pending", // Initial status for the withdrawal request
        UserId: userId,
        candidateId: req.user.candidateId,
        phone: req.user.phone, // Associate with the user
      },
      { transaction }
    );

    // Step 9: Commit the transaction (everything successful)
    await transaction.commit();

    // Return success response
    return res.status(201).json({
      message: "Withdrawal request submitted successfully.",
      requestId: withdrawalRequest.requestId,
    });
  } catch (err) {
    // Rollback the transaction if any error occurs
    if (transaction) {
      await transaction.rollback();
    }

    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

// Controller to handle the cancellation of a pending withdrawal request
exports.requestForCancelWithdrawal = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the request
  // Start a Sequelize transaction
  let transaction;

  try {
    const lockedWithdrawalRequest = await RequestWithdrawal.findOne({
      where: { UserId: userId, status: "locked" },
    });

    if (lockedWithdrawalRequest) {
      return res.status(402).json({
        success: false,
        message: "Can't cancel the locked Withdrawal Request.",
      });
    }

    // Step 1: Fetch the recent withdrawal request with a "pending" status
    const recentWithdrawalRequest = await RequestWithdrawal.findOne({
      where: { UserId: userId, status: "pending" },
    });

    if (!recentWithdrawalRequest) {
      // If no pending request is found, return an error response
      return res.status(404).json({
        success: false,
        message: "No pending withdrawal request found for cancellation.",
      });
    }

    const { amount } = recentWithdrawalRequest; // Get the withdrawal amount from the recent request

    // Step 2: Check and update the user's piggybox balances
    const wallet = await Wallet.findOne({ where: { UserId: userId } });

    if (!wallet) {
      return res.status(400).json({ message: "PiggyBox not found." });
    }

    // Use parseFloat to handle balance calculations
    const updatedNetWinning =
      parseFloat(wallet.netWinning) + parseFloat(amount);
    const updatedUnclearedNetWinning =
      parseFloat(wallet.unclearedNetWinning) - parseFloat(amount);

    // Step 3: Start a transaction for atomic operations
    transaction = await sequelize.transaction();

    // Update the Wallet balance and unclearedBalance
    await Wallet.update(
      {
        netWinning: updatedNetWinning,
        unclearedNetWinning: updatedUnclearedNetWinning,
      },
      {
        where: { UserId: userId },
        transaction,
      }
    );

    // Step 4: Create a new TransactionHistory entry for the cancellation
    await TransactionHistory.create(
      {
        transactionType: "withdrawal",
        remark: "User Withdrawal Cancelled",
        credit: amount, // Refund the withdrawn amount
        debit: 0,
        balance: updatedNetWinning,
        UserId: userId,
      },
      { transaction }
    );

    // Step 5: Update the withdrawal request status to "canceled"
    await RequestWithdrawal.update(
      { status: "canceled" },
      {
        where: { id: recentWithdrawalRequest.id },
        transaction,
      }
    );

    // Step 6: Commit the transaction (all operations successful)
    await transaction.commit();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Withdrawal request has been successfully canceled.",
      newBalance: updatedNetWinning,
      requestId: recentWithdrawalRequest.requestId,
    });
  } catch (err) {
    // Rollback the transaction if any error occurs
    if (transaction) {
      await transaction.rollback();
    }

    console.error("Error while cancelling withdrawal request:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
