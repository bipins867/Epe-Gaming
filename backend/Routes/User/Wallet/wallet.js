const express = require("express");


const walletController=require('../../../Controller/Users/Wallet/wallet')



const router = express.Router();

router.get('/walletInfo',walletController.getWalletInfo)
router.get('/transactionHistory',walletController.getTransactionHistory)

module.exports = router;
