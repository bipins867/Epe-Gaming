const express = require("express");

const bankDetailsController=require('../../../Controller/Users/BankDetails/bankDetails')

const router = express.Router();

router.get('/get',bankDetailsController.getBankDetails)
router.post('/update',bankDetailsController.updateBankDetails)

module.exports = router;
