const express = require("express");

const authRouter = require("./Auth/auth");
const userAndRoleRouter = require("./UserAndRole/userAndRole");
const eventsRouter = require("./Event/events");
const gamesRouter = require("./Games/games");
const categoriesRouter = require("./Categories/categories");
const announcementRouter = require("./Announcement/announcement");
const imagesRotuer = require("./Images/images");
const notificationRouter = require("./Notifications/notifications");
const imageSliderRouter=require('./ImageSlider/imageSlider')
const withdrawalRouter=require('./Withdrawal/withdrawal')

const { adminAuthentication } = require("../../Middleware/auth");

const router = express.Router();

router.use('/withdrawal',adminAuthentication,withdrawalRouter);
router.use('/imageSlider',adminAuthentication,imageSliderRouter);
router.use("/notifications", adminAuthentication, notificationRouter);
router.use("/images", adminAuthentication, imagesRotuer);
router.use("/announcement", adminAuthentication, announcementRouter);
router.use("/categories", adminAuthentication, categoriesRouter);
router.use("/games", adminAuthentication, gamesRouter);
router.use("/events", adminAuthentication, eventsRouter);
router.use("/userAndRole", userAndRoleRouter);
router.use("/auth", authRouter);

module.exports = router;
