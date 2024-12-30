const express = require("express");

const eventController = require("../../../Controller/Admin/Event/events");

const router = express.Router();

router.post('/getEventsCount',eventController.getEventCountInfo)
router.post("/getEventsList", eventController.getEventsList);
router.post("/createEvents", eventController.createEvent);
router.post("/updateRoomCredentials", eventController.updateRoomCredentials);
router.post("/getEventInfo", eventController.getEventInfo);
router.post("/getTeamAndMemberInfo", eventController.getTeamsAndMemberInfo);
router.post("/updateEventStatus", eventController.updateEventStatus);
router.post(
  "/updateTeamAndMemberInfo",
  eventController.updateTeamsAndMemberInfo
);
router.post("/declareEventResult", eventController.declareEventResult);

module.exports = router;
