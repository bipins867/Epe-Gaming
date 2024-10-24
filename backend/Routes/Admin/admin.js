
const express=require('express')


const authRouter=require('./Auth/auth');
const userAndRoleRouter=require('./UserAndRole/userAndRole')

const router=express.Router();


router.use('/userAndRole',userAndRoleRouter)
router.use('/auth',authRouter)


module.exports=router;