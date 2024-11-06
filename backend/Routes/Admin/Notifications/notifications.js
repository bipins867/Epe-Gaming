const express = require("express");

const notificationController = require("../../../Controller/Admin/Notifications/notifications");

const router = express.Router();

router.post("/send", notificationController.sendNotification);

module.exports = router;
