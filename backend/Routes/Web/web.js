
const express=require('express')
const infoRouter=require('./Info/info');



const router=express.Router();

router.use('/info',infoRouter);
module.exports=router;