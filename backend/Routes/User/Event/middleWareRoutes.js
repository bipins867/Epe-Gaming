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
const { userAuthentication } = require("../../../Middleware/auth");

const router = express.Router();

router.use(
  userAuthentication,
  userGamesVerifier,
  eventVerifier,
  eventStatusVerifier,
  checkEventAlreadyJoinedVerifier,
  userWalletFundsVerfier,
  userTeamCounter,
  userTeamSizeVerfier
);

exports.joinEventMiddlewareRouter = router;
