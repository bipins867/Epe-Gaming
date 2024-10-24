const express = require("express");

const authRouter = require("./Auth/auth");
const userAndRoleRouter = require("./UserAndRole/userAndRole");
const eventsRouter = require("./Event/events");
const gamesRouter = require("./Games/games");
const categoriesRouter = require("./Categories/categories");

const { adminAuthentication } = require("../../Middleware/auth");

const router = express.Router();

router.use("/categories", adminAuthentication,categoriesRouter);
router.use("/games", adminAuthentication,gamesRouter);
router.use("/events", adminAuthentication,eventsRouter);
router.use("/userAndRole",  userAndRoleRouter);
router.use("/auth", authRouter);

module.exports = router;
