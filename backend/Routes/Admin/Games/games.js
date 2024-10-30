const express = require("express");

const gamesController=require('../../../Controller/Admin/Games/games');
const { fileHandlerRouter } = require("../../FileHandler/fileHandler");

const router = express.Router();

router.post('/create',fileHandlerRouter("image", 0.1),gamesController.createGames)
router.post('/edit',gamesController.editGames)
router.post('/deactivate',gamesController.deactivateGames)
router.post('/getActive',gamesController.getActiveGames)

module.exports = router;
