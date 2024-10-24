const express = require("express");

const kycController=require('../../../Controller/Users/Kyc/kyc')

const router = express.Router();

router.use("/get",kycController.getKycDetails)
router.use('/update',kycController.updateKycDetails)

module.exports = router;
