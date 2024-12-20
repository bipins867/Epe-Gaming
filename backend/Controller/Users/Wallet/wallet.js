const sequelize = require("../../../database");
const { MINIMUM_AMOUNT_IN_ACCOUNT } = require("../../../importantInfo");
const User = require("../../../Models/User/users");
const BankDetails = require("../../../Models/Wallet/bankDetails");
const Kyc = require("../../../Models/Wallet/kyc");
const Referrals = require("../../../Models/Wallet/referrals");
const Transaction = require("../../../Models/Wallet/transaction");
const TransactionHistory = require("../../../Models/Wallet/transactionHistory");
const Wallet = require("../../../Models/Wallet/wallet");
const { createUserActivity } = require("../../../Utils/activityUtils");


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

