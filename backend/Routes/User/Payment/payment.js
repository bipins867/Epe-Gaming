const express = require("express");


const paymentController=require('../../../Controller/Users/Payment/payment');
const { userAuthentication } = require("../../../Middleware/auth");



const router = express.Router();

router.post('/addPayment',userAuthentication,paymentController.addFunds)
router.post('/verifyPayment',paymentController.verifyPaymentStatus)

module.exports = router;
