const express = require("express");

const eventController = require("../../../Controller/Users/Event/events");
const { joinEventMiddlewareRouter } = require("./middleWareRoutes");
const { userAuthentication } = require("../../../Middleware/auth");

const router = express.Router();

router.post("/getEventsList", eventController.getEventList);
router.post("/searchEvent", eventController.searchEvent);
router.post(
  "/getUserGameInfo",
  userAuthentication,
  eventController.getUserGamesInfo
);
router.post(
  "/updateUserGameInfo",
  userAuthentication,
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
  userAuthentication,
  eventController.createChallengeEvent
);

router.post("/getTeamInfo", eventController.getEventTeamInfo);
router.post("/searchTeamInfo", eventController.searchTeamInfo);
router.post("/getJoinEventTeamInfo", eventController.getJoinEventTeamInfo);

module.exports = router;
