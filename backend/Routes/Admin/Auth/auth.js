const express = require("express");


const router = express.Router();


router.post('/login',authController.adminLogin)
router.post('/getAdminActivity',activityController.getAdminActivityHistory)

module.exports = router;
