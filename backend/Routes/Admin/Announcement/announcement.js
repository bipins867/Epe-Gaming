const express = require("express");

const announcementController=require('../../../Controller/Admin/Announcement/announcement')


const router = express.Router();

router.get('/get',announcementController.getAnnouncements);
router.post('/create',announcementController.createAnnouncement)
router.post('/update',announcementController.updateAnnouncementStatus)
router.post('/delete',announcementController.deleteAnnouncement)


module.exports = router;
