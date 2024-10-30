const UserNotification = require("../../../Models/AndModels/userNotifications");
const Notification = require("../../../Models/Notifications/notifications");
const { Op } = require("sequelize");

exports.getNotifications = async (req, res, next) => {
  try {
    // Fetch 20 notifications for the user, including `isRead` from UserNotification
    const notifications = await Notification.findAll({
      include: [
        {
          model: User,
          where: { id: req.user.id },
          attributes: [], // No need to retrieve User fields, only use for filtering
          through: {
            model: UserNotification,
            attributes: ["isRead"], // Only include `isRead` from the through table
          },
        },
      ],
      limit: 20,
      order: [["createdAt", "DESC"]],
    });

    // Return the fetched notifications
    return res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return res
      .status(500)
      .json({
        message: "Error fetching notifications. Please try again later.",
      });
  }
};

exports.markNotificationAsRead = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Update the `isRead` field to `true` for the specified notification for the user
    const [updatedCount] = await UserNotification.update(
      { isRead: true },
      {
        where: {
          UserId: userId,
        },
      }
    );

    return res.status(200).json({ message: "Notification marked as read." });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    return res
      .status(500)
      .json({
        message: "Error updating notification. Please try again later.",
      });
  }
};
