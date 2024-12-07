const express = require("express");

const appController = require("../../Controller/App/app");

const router = express.Router();

router.get("/getAppInfo", appController.getAppInfo);

module.exports = router;
