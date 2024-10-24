const express = require("express");

const eventController=require('../../../Controller/Admin/Event/events')

const router = express.Router();

router.post('/create',eventController.createEvent);


module.exports = router;
