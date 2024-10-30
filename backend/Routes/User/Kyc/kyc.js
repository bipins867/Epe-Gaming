const express = require("express");

const kycController=require('../../../Controller/Users/Kyc/kyc')

const router = express.Router();

router.get("/get",kycController.getKycDetails)
router.post('/update',kycController.updateKycDetails)

module.exports = router;
