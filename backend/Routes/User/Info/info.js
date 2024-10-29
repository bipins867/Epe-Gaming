const express = require("express");

const infoController=require('../../../Controller/Users/Info/info');
const { userAuthentication } = require("../../../Middleware/auth");


const router = express.Router();

router.post('/profileInfo',userAuthentication,infoController.getUserProfileInfo);

module.exports = router;
