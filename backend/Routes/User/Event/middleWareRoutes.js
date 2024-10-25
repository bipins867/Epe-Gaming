const express = require("express");
const {
  userGamesVerifier,
  eventVerifier,
  eventStatusVerifier,
  checkEventAlreadyJoinedVerifier,
  userWalletFundsVerfier,
  userTeamCounter,
  userTeamSizeVerfier,
} = require("../../../Middleware/EventAndGames/eventAndGames");

const router = express.Router();

router.use(
  userGamesVerifier,
  eventVerifier,
  eventStatusVerifier,
  checkEventAlreadyJoinedVerifier,
  userWalletFundsVerfier,
  userTeamCounter,
  userTeamSizeVerfier
);

exports.joinEventMiddlewareRouter = router;
