const TransactionHistory = require("../Models/Wallet/transactionHistory");
const Wallet = require("../Models/Wallet/wallet");

exports.deductAmountForEventJoin = async (user, amount, transaction) => {
  // Fetch the user's wallet
  const wallet = await Wallet.findOne({
    where: { UserId: user.id },
  });

  const amountMap = { cashBonus: 0, deposit: 0, netWinning: 0 };

  const cashBonus = parseFloat(wallet.cashBonus);
  const netWinning = parseFloat(wallet.netWinning);
  const deposit = parseFloat(wallet.deposit);
  const totalAmount = cashBonus + netWinning + deposit;

  // Check if the amount is less than or equal to 10% of the cash bonus
  //let amountUsed = 0;

  if (amount <= 0.1 * cashBonus) {
    // Deduct from cashBonus
    wallet.unclearedCashBonus += parseFloat(amount);
    //amountUsed = parseFloat(amount);
    wallet.cashBonus -= amount;

    amountMap.cashBonus = amount;
  } else {
    // Deduct from netWinning
    let remainingAmount = amount - 0.1 * cashBonus;
    amountMap.cashBonus = 0.1 * cashBonus;
    wallet.unclearedCashBonus += parseFloat(0.1 * cashBonus);

    if (deposit > 0) {
      let unclearedDeposit = 0;
      if (deposit >= remainingAmount) {
        unclearedDeposit = remainingAmount;
      } else {
        unclearedDeposit = deposit;
      }
      amountMap.deposit = unclearedDeposit;

      wallet.unclearedDeposit += unclearedDeposit;
      remainingAmount -= unclearedDeposit;
      wallet.deposit -= unclearedDeposit;
    }

    if (remainingAmount > 0) {
      if (netWinning >= remainingAmount) {
        const unclearedNetWinning = remainingAmount;
        amountMap.netWinning = unclearedNetWinning;

        wallet.unclearedNetWinning += unclearedNetWinning;
        wallet.netWinning -= unclearedNetWinning;
      } else {
        throw new Error("Insufficient funds");
      }
    }
  }
  //console.log(wallet);
  // Update the wallet
  await wallet.save({ transaction });

  // Create transaction history
  const transactionHistory = await TransactionHistory.create(
    {
      transactionType: "eventJoin",
      remark: "User joined the event",
      credit: 0,
      debit: amount,
      balance: totalAmount - amount, // Calculate the new balance
      UserId: user.id,
    },
    { transaction }
  );

  return amountMap;
};
