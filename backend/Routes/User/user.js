
const express=require('express')

const categoriesRouter=require('./Categories/categories')
const gamesRouter=require('./Games/games')
const eventsRouter=require('./Event/events')
const bankDetailsRouter=require('./BankDetails/bankDetails')
const kycRouter=require('./Kyc/kyc')
const referralRouter=require('./Referral/referral')
const authRouter=require('./Auth/auth');
const infoRouter=require('./Info/info')
const notificationRouter=require('./Notifications/notifications')
const walletRouter=require('./Wallet/wallet')
const paymentRouter=require('./Payment/payment')

const { userAuthentication } = require('../../Middleware/auth')


const router=express.Router();

router.use('/payment',paymentRouter);
router.use('/wallet',userAuthentication,walletRouter)
router.use('/notifications',userAuthentication,notificationRouter)
router.use('/info',userAuthentication,infoRouter)
router.use('/bankDetails',userAuthentication,bankDetailsRouter)
router.use('/kyc',userAuthentication,kycRouter)
router.use('/referral',userAuthentication,referralRouter)
router.use('/categories',userAuthentication,categoriesRouter)
router.use('/games',userAuthentication,gamesRouter)
router.use('/events',userAuthentication,eventsRouter)
router.use('/auth',authRouter)


module.exports=router;