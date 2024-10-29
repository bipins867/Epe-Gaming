
const express=require('express')

const categoriesRouter=require('./Categories/categories')
const gamesRouter=require('./Games/games')
const eventsRouter=require('./Event/events')
const bankDetailsRouter=require('./BankDetails/bankDetails')
const kycRouter=require('./Kyc/kyc')
const referralRouter=require('./Referral/referral')
const authRouter=require('./Auth/auth');
const infoRouter=require('./Info/info')


const router=express.Router();

router.use('/bankDetails',bankDetailsRouter)
router.use('/kyc',kycRouter)
router.use('/referral',referralRouter)
router.use('/categories',categoriesRouter)
router.use('/games',gamesRouter)
router.use('/events',eventsRouter)
router.use('/auth',authRouter)
router.use('/info',infoRouter)


module.exports=router;