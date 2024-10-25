const express = require("express");


const eventController=require('../../../Controller/Users/Event/events');
const { joinEventMiddlewareRouter } = require("./middleWareRoutes");

const router = express.Router();

router.post('/getEventList',eventController.getEventList)
router.post('/searchEvent',eventController.searchEvent)
router.post('/getUserGameInfo',eventController.getUserGamesInfo)
router.post('/updateUserGameInfo',eventController.updateUserGamesInfo)


router.post('/joinEventPublicTeam',joinEventMiddlewareRouter,eventController.joinEventPublicTeam)
router.post('/joinEventSoloTeam',joinEventMiddlewareRouter,eventController.joinEventSoloTeam)
router.post('/joinEventPrivateTeam',joinEventMiddlewareRouter,eventController.joinEventPrivateTeam)


router.post('/createChallengeEvent',eventController.createChallengeEvent)

module.exports = router;
