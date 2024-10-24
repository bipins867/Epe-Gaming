const express = require("express");

const referralController=require('../../../Controller/Users/Referral/referral')


const router = express.Router();


router.use('/getUserInfo',referralController.getUserReferallInfo)
router.use('/getInfo',referralController.getReferalInfo)

module.exports = router;
