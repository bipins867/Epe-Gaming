const firebaseAdmin = require("firebase-admin");

exports.sendNotification = async (req, res, next) => {
  const { fcmToken, title, message } = req.body;

  if (!fcmToken || !title || !message) {
    return res.status(400).send("fcmToken, title, and message are required");
  }

  // Construct the message object for v1 API
  const notificationMessage = {
    token: fcmToken,
    notification: {
      title: title,
      body: message,
    },
    data: {
      click_action: "FLUTTER_NOTIFICATION_CLICK", // Required for background handling
    },
  };

  try {
    // Send the notification using the v1 API
    await firebaseAdmin.messaging().send(notificationMessage);
    res.json({ success: true, message: "Notification sent Successfully!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
