const sequelize = require("../../../database");
const EventUsers = require("../../../Models/AndModels/EventUsers");
const TeamUserGames = require("../../../Models/AndModels/teamUserGames");
const UserGames = require("../../../Models/AndModels/userGames");
const Events = require("../../../Models/EventAndGames/events");
const Games = require("../../../Models/EventAndGames/games");
const Teams = require("../../../Models/EventAndGames/teams");
const Wallet = require("../../../Models/Wallet/wallet");
const { createUserActivity } = require("../../../Utils/activityUtils");
const { generateRandomId } = require("../../../Utils/utils");
const { deductAmountForEventJoin } = require("../../../Utils/wallet");
const { Op } = require("sequelize");

exports.createChallengeEvent = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const event = await createEvent(req, transaction);

    await joinEvent(req, event, transaction);

    await transaction.commit();

    res.json({ success: true, message: "Challenge created successfully!" });
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
    }
    // Check for specific error types and return meaningful messages
    let errorMessage = "An error occurred while joining the private team.";
    if (error instanceof sequelize.ValidationError) {
      errorMessage =
        "Validation error: " +
        error.errors.map((err) => err.message).join(", ");
    } else if (error.message) {
      errorMessage = error.message; // For custom error messages
    } else {
      console.error("Unhandled error in createChallengeEvent:", error);
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

async function createEvent(
  req,

  transaction
) {
  const { map, squadType, entryFee, startTime, gameId } = req.body;

  // Generate eventId
  const eventId = generateRandomId();

  const data = {
    eventId,
    tittle: map,
    description: "Challenge event!",
    eventType: "challenge",
    map,
    matchType: "unranked",
    noOfPlayers: 2 * squadType,
    squadType,
    prizePool_1: entryFee * squadType,
    regCloseTime: startTime,
    startTime,
    status: "upcoming",
    entryFee,
    GameId: gameId,
    isPublic: true, // Default value
    isDeactivated: false, // Default value
  };

  // Validate gameId and check for the associated game
  const game = await Games.findByPk(gameId);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // Create the event
  const newEvent = await Events.create(data, { transaction });

  await createUserActivity(
    req,
    req.user,
    "event",
    `User Created a challenge :- ${data.eventId}`,
    transaction
  );
  return newEvent;
}

async function joinEvent(req, event, transaction) {
  const userId = req.user.id;
  const {
    gameId,
    isTotalPaid,
    isTeamPublic,
    isJoinnersPaid,
    isAmountDistributed,
  } = req.body;

  const userGames = await UserGames.findOne({
    where: { UserId: userId, GameId: gameId },
  });

  if (!userGames || !userGames.playerId || !userGames.playerName) {
    throw new Error("User Game Prfoile Information not found!");
  }
  verifyJoinInfo(
    isTotalPaid,
    isTeamPublic,
    isJoinnersPaid,
    isAmountDistributed
  );

  const totalAmount = 0;

  if (isTotalPaid) {
    totalAmount = event.entryFee * event.squadType;
  } else {
    totalAmount = event.entryFee;
  }

  const wallet = await Wallet.findOne({
    where: { UserId: req.user.id },
  });

  const availableFunds =
    wallet.deposit + wallet.netWinning + 0.1 * wallet.cashBonus;

  if (totalAmount > availableFunds) {
    throw new Error("Insufficent Funds!");
  }

  const amountMap = await deductAmountForEventJoin(
    req.user,
    totalAmount,
    transaction
  );

  const newTeam = await Teams.create(
    {
      EventId: event.id,
      teamNumber: 1,
      teamId: generateRandomId(),
      isPublic: isTeamPublic,
      isJoinnersPaid: isJoinnersPaid, //New joinner has to pay first for the joining
      isAmountDistributed: isAmountDistributed,
    },
    { transaction }
  );

  await TeamUserGames.create(
    {
      TeamId: newTeam.id,
      UserGameId: userGames.id,
      isLeader: true, // Adjust based on business logic
      isChallengeCreated: true,
      ...amountMap,
    },
    { transaction }
  );

  await EventUsers.create(
    { UserId: req.user.id, EventId: event.id },
    { transaction }
  );

  await createUserActivity(
    req,
    req.user,
    "EventJoin",
    `Joined first team :- Event :- ${event.eventId}`,
    transaction
  );
}

function verifyJoinInfo(
  isTotalPaid,
  isTeamPublic,
  isJoinnersPaid,
  isAmountDistributed
) {
  if (!isTotalPaid) {
    if (!isTeamPublic) {
      throw Error("Team can't be private");
    }

    if (!isJoinnersPaid) {
      throw Error("Joinners have to pay here");
    }

    if (!isAmountDistributed) {
      throw Error("Amount needed to be distributed!");
    }
  }
}
