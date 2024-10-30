const express = require("express");

const notificationController=require('../../../Controller/Users/Notifications/notifications')


const router = express.Router();

router.get('/get',notificationController.getNotifications);
router.post('/updateReadStatus',notificationController.markNotificationAsRead)

module.exports = router;
