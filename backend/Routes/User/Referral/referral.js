const express = require("express");

const referralController=require('../../../Controller/Users/Referral/referral')


const router = express.Router();


router.get('/getUserInfo',referralController.getUserReferallInfo)
router.get('/getInfo',referralController.getReferalInfo)

module.exports = router;
