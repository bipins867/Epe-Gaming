const TransactionHistory = require("../Models/Wallet/transactionHistory");
const Wallet = require("../Models/Wallet/wallet");

exports.deductAmountForEventJoin = async (user,  amount, transaction) => {
  // Fetch the user's wallet
  const wallet = await Wallet.findOne({
    where: { UserId: user.id },
  });

  

  const cashBonus = parseFloat(wallet.cashBonus);
  const netWinning = parseFloat(wallet.netWinning);
  const deposit = parseFloat(wallet.deposit);
  const totalAmount = cashBonus + netWinning + deposit;

  // Check if the amount is less than or equal to 10% of the cash bonus
  let amountUsed = 0;

  if (amount <= 0.1 * cashBonus) {
    // Deduct from cashBonus
    wallet.unclearedCashBonus += parseFloat(amount);
    amountUsed = parseFloat(amount);
    wallet.cashBonus -= amountUsed;
  } else {
    // Deduct from netWinning
    const remainingAmount = amount - 0.1 * cashBonus;
    if (remainingAmount <= netWinning) {
      wallet.unclearedNetWinning += remainingAmount;
      amountUsed += remainingAmount;
      wallet.netWinning -= remainingAmount;
    }

    // If still not fulfilled, deduct from deposit
    const finalRemaining = remainingAmount - netWinning;

    if (finalRemaining <= deposit) {
      wallet.deposit -= finalRemaining;
      amountUsed += finalRemaining;
    } else {
      throw new Error("Insufficient funds");
    }
  }

  // Update the wallet
  await wallet.save({ transaction });

  // Create transaction history
  const transactionHistory = await TransactionHistory.create(
    {
      transactionType: "eventJoin",
      remark: "User joined the event",
      credit: 0,
      debit: amountUsed,
      balance: totalAmount - amountUsed, // Calculate the new balance
      UserId: user.id,
    },
    { transaction }
  );

  return true;
};
