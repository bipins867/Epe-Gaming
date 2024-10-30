const express = require("express");

const announcementController=require('../../../Controller/Users/Announcement/announcement')


const router = express.Router();

router.get('/get',announcementController.getActiveAnnouncements);


module.exports = router;
