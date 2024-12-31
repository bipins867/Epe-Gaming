
const express=require('express')
const infoController=require('../../../Controller/Web/Info/info')



const router=express.Router();

router.get('/dasbhoardInfo',infoController.getGameDashboardInformation);

module.exports=router;