const express = require("express");


const paymentController=require('../../../Controller/Users/Payment/payment');
const { userAuthentication } = require("../../../Middleware/auth");



const router = express.Router();

router.get('/addPayment',userAuthentication,paymentController.addFunds)
router.get('/verifyPayment',paymentController.verifyPaymentStatus)

module.exports = router;
