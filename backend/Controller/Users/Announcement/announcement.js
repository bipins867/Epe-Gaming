const Announcement = require("../../../Models/Announcement/announcement");

exports.getActiveAnnouncements = async (req, res, next) => {
    try {
      // Fetch all active announcements
      const activeAnnouncements = await Announcement.findAll({
        where: { isActive: true },
        order: [['createdAt', 'DESC']], // Optional: order by the latest announcements
      });
  
      // Return the list of active announcements
      return res.status(200).json({
        message: "Active announcements retrieved successfully.",
        announcements: activeAnnouncements,
      });
    } catch (err) {
      console.error("Error retrieving active announcements:", err);
      return res.status(500).json({
        message: "Error retrieving announcements. Please try again later.",
      });
    }
  };