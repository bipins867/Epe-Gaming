const express = require("express");

const infoController=require('../../../Controller/Users/Info/info');


const router = express.Router();

router.get('/profileInfo',infoController.getUserProfileInfo);

module.exports = router;
