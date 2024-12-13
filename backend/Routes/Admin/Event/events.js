const express = require("express");

const eventController = require("../../../Controller/Admin/Event/events");

const router = express.Router();

router.post("/getEvents", eventController.getEventsList);
router.post("/create", eventController.createEvent);
router.post("/updateRoomCredentials", eventController.updateRoomCredentials);
router.post("/getEventInfo", eventController.getEventInfo);
router.post("/teamAndMemberInfo", eventController.getTeamsAndMemberInfo);
router.post("/updateEventStatus", eventController.updateEventStatus);
router.post(
  "/updateTeamAndMemberInfo",
  eventController.updateTeamsAndMemberInfo
);
router.post("/declareEventResult", eventController.declareEventResult);

module.exports = router;
