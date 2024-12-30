const express = require("express");

const eventController = require("../../../Controller/Users/Event/events");
const { joinEventMiddlewareRouter } = require("./middleWareRoutes");
const {} = require("../../../Middleware/auth");

const router = express.Router();

router.post("/getEventsList", eventController.getEventList);
router.post("/searchEvent", eventController.searchEvent);
router.post(
  "/getUserGameInfo",

  eventController.getUserGamesInfo
);
router.post(
  "/updateUserGameInfo",

  eventController.updateUserGamesInfo
);

router.post(
  "/joinEventPublicTeam",

  joinEventMiddlewareRouter,
  eventController.joinEventPublicTeam
);
router.post(
  "/joinEventSoloTeam",

  joinEventMiddlewareRouter,
  eventController.joinEventSoloTeam
);
router.post(
  "/joinEventPrivateTeam",

  joinEventMiddlewareRouter,
  eventController.joinEventPrivateTeam
);

router.post(
  "/createChallengeEvent",

  eventController.createChallengeEvent
);

router.post("/getTeamInfo", eventController.getEventTeamInfo);
router.post("/searchTeamInfo", eventController.searchTeamInfo);
router.post("/getJoinEventTeamInfo", eventController.getJoinEventTeamInfo);

module.exports = router;
