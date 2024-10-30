const express = require("express");

const infoController=require('../../../Controller/Users/Info/info');
const { fileHandlerRouter } = require("../../FileHandler/fileHandler");


const router = express.Router();

router.get('/profileInfo',infoController.getUserProfileInfo);
router.post('/updateProfile',fileHandlerRouter('image',0.2),infoController.updateProfile)

module.exports = router;
