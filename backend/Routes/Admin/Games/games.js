const express = require("express");

const gamesController=require('../../../Controller/Admin/Games/games')

const router = express.Router();

router.post('/create',gamesController.createGames)
router.post('/edit',gamesController.editGames)
router.post('/deactivate',gamesController.deactivateGames)
router.post('/getActive',gamesController.getActiveGames)

module.exports = router;
