const express = require("express");

const infoController=require('../../../Controller/Users/Info/info');
const { fileHandlerRouter } = require("../../FileHandler/fileHandler");


const router = express.Router();

router.get('/profileInfo',infoController.getUserProfileInfo);
router.post('/updateProfileImage',fileHandlerRouter('image',0.2),infoController.updateProfileImage)
router.post('/updateProfileInfo',infoController.updateProfileInfo)

module.exports = router;
