const express = require("express");

const walletController = require("../../../Controller/Users/Wallet/wallet");

const router = express.Router();

router.get("/walletInfo", walletController.getWalletInfo);
router.get("/transactionHistory", walletController.getTransactionHistory);
router.post("/requestWithdrawal", walletController.requestForWithdrawal);
router.post("/cancelWithdrawal", walletController.requestForCancelWithdrawal);

module.exports = router;
