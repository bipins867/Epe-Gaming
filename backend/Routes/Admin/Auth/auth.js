const express = require("express");

const authController=require('../../../Controller/Admin/Auth/auth')
const activityController=require('../../../Controller/Admin/Auth/adminActivity');
const { adminAuthentication } = require("../../../Middleware/auth");


const router = express.Router();


router.post('/login',authController.adminLogin)
router.post('/getAdminActivity',adminAuthentication,activityController.getAdminActivityHistory)

module.exports = router;
