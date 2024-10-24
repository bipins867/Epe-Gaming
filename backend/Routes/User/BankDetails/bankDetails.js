const express = require("express");

const bankDetailsController=require('../../../Controller/Users/BankDetails/bankDetails')

const router = express.Router();

router.use('/get',bankDetailsController.getBankDetails)
router.use('/update',bankDetailsController.updateBankDetails)

module.exports = router;
