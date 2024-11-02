const sequelize = require("../../../database");
const EventUsers = require("../../../Models/AndModels/EventUsers");
const TeamUserGames = require("../../../Models/AndModels/teamUserGames");
const UserGames = require("../../../Models/AndModels/userGames");
const Events = require("../../../Models/EventAndGames/events");
const Games = require("../../../Models/EventAndGames/games");
const Teams = require("../../../Models/EventAndGames/teams");
const User = require("../../../Models/User/users");
const Wallet = require("../../../Models/Wallet/wallet");
const { createUserActivity } = require("../../../Utils/activityUtils");
const { generateRandomId } = require("../../../Utils/utils");
const { deductAmountForEventJoin } = require("../../../Utils/wallet");
const { Op } = require("sequelize");

exports.getEventList = async (req, res, next) => {
  try {
    const { GameId, eventType } = req.body;
    const userId = req.user.id; // Get user ID from request

    // Validate required inputs
    if (!GameId) {
      return res.status(400).json({
        success: false,
        message: "GameId is required.",
      });
    }

    if (!eventType || typeof eventType !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing eventType.",
      });
    }

    const currentDateTime = new Date();

    // Retrieve events and determine if the user has joined each event
    const fetchEvents = async (condition) => {
      const events = await Events.findAll({
        where: {
          ...condition,
          GameId,
          eventType,
          isPublic: true,
          isDeactivated: false,
        },
      });

      // Check if the user is joined in each event
      return await Promise.all(
        events.map(async (event) => {
          const isUserJoined = await EventUsers.findOne({
            where: { UserId: userId, EventId: event.id },
          });
          return {
            ...event.toJSON(),
            isUserJoined: !!isUserJoined, // Boolean flag
          };
        })
      );
    };

    // Retrieve upcoming, ongoing, and past events with isUserJoined flag
    const [upcomingEvents, ongoingEvents, pastEvents] = await Promise.all([
      fetchEvents({ startTime: { [Op.gt]: currentDateTime } }),
      fetchEvents({
        startTime: { [Op.lte]: currentDateTime },
      }),
      fetchEvents({ status: "past" }),
    ]);

    // Return categorized events in response
    return res.status(200).json({
      success: true,
      message: "Events retrieved successfully.",

      upcomingEvents,
      ongoingEvents,
      pastEvents,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving events.",
      error: error.message,
    });
  }
};
exports.searchEvent = async (req, res, next) => {
  try {
    const { GameId, eventId } = req.body; // Extract GameId and eventId from the request body

    // Validate inputs
    if (!GameId || !eventId) {
      return res
        .status(400)
        .json({ success: false, message: "GameId and eventId are required" });
    }

    // Find the event based on GameId and eventId
    const event = await Events.findOne({
      where: {
        GameId, // Match the provided GameId
        eventId, // Match the provided eventId
      },
    });

    // If no event is found or the event is deactivated
    if (!event || event.isDeactivated) {
      return res.status(404).json({
        success: false,
        message: "Event not found or has been deactivated",
      });
    }

    // Return the found event details
    return res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error searching for event:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while searching for the event",
    });
  }
};

exports.getUserGamesInfo = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming UserId is available in req.user
    const { GameId } = req.body;
    // Validate input
    if (!GameId) {
      return res.status(400).json({ error: "GameId is required" });
    }

    // Find user game information based on UserId and GameId
    const userGameInfo = await UserGames.findOne({
      where: {
        UserId: userId, // Assuming playerId in UserGames corresponds to the user's id
        GameId, // GameId provided in the request body
      },
    });

    if (!userGameInfo) {
      return res.status(404).json({
        error: "No user game information found!",
      });
    }

    return res.status(200).json({
      success: true,
      userGameInfo,
    });
  } catch (error) {
    console.error("Error fetching user games info:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user games info",
    });
  }
};

exports.updateUserGamesInfo = async (req, res, next) => {
  let t;
  try {
    const userId = req.user.id; // Get UserId from the request
    const { playerId, playerName, GameId } = req.body;

    // Validate inputs
    if (
      !playerId ||
      typeof playerId !== "string" ||
      playerId.trim().length === 0
    ) {
      return res.status(400).json({ error: "Valid playerId is required" });
    }

    if (
      !playerName ||
      typeof playerName !== "string" ||
      playerName.trim().length === 0
    ) {
      return res.status(400).json({ error: "Valid playerName is required" });
    }

    // Find the user game entry by playerId
    let userGameInfo = await UserGames.findOne({
      where: { UserId: userId, GameId },
    });

    t = await sequelize.transaction();

    if (!userGameInfo) {
      userGameInfo = await UserGames.create({
        playerName,
        playerId,
        UserId: userId,
        GameId,
      });
    } else {
      // Update user game information
      await userGameInfo.update(
        {
          playerName,
          playerId,
        },
        { transaction: t }
      );
    }
    // Log user activity
    await createUserActivity(
      req,
      req.user,
      "UserGames",
      "Updated user game info",
      t
    ); // Log the activity

    // Commit transaction
    await t.commit();

    return res.status(200).json({
      success: true,
      message: "User game info updated successfully",
      data: userGameInfo,
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error("Error updating user games info:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating user games info",
    });
  }
};

//-------------------------
exports.joinEventPublicTeam = async (req, res, next) => {
  let t;

  try {
    const userId = req.user.id;
    const event = req.event;
    //const wallet=req.wallet;
    const lastTeam = req.lastTeam;
    const userGames = req.userGames;

    t = await sequelize.transaction();

    let amountMap;
    if (req.event.entryFee > 0) {
      try {
        amountMap = await deductAmountForEventJoin(req.user, event.entryFee, t);
      } catch (error) {
        t.rollback();
        console.log(error);
        return res.status(403).json({
          success: false,
          message: error.toString(),
        });
      }
    }

    if (!amountMap) {
      amountMap.deposit = 0;
      amountMap.netWinning = 0;
      amountMap.cashBonus = 0;
    }

    let teamUserCount = 0;
    let newTeam;

    if (lastTeam) {
      // Get associated TeamUserGames and count
      teamUserCount = req.currentTeamCapacity;

      // If last team has space, add to this team
      if (teamUserCount < event.squadType) {
        await TeamUserGames.create(
          {
            TeamId: lastTeam.id,
            UserGameId: userGames.id,
            isLeader: false, // Adjust based on business logic
            ...amountMap,
          },
          { transaction: t }
        );
      } else {
        // Create a new team and add the user to this team
        newTeam = await Teams.create(
          {
            EventId: event.id,
            teamNumber: parseInt(lastTeam.teamNumber) + 1,
            teamId: generateRandomId(),
            isPublic: true,
            isJoinnersPaid: false,
            isAmountDistributed: true,
          },
          { transaction: t }
        );

        await TeamUserGames.create(
          {
            TeamId: newTeam.id,
            UserGameId: userGames.id,
            isLeader: false, // Adjust based on business logic
            ...amountMap,
          },
          { transaction: t }
        );
      }
    } else {
      // If no teams exist, create the first team and add the user to it
      newTeam = await Teams.create(
        {
          EventId: event.id,
          teamNumber: 1,
          teamId: generateRandomId(),
          isPublic: true,
          isJoinnersPaid: false, //New joinner has to pay first for the joining
          isAmountDistributed: true,
        },
        { transaction: t }
      );

      await TeamUserGames.create(
        {
          TeamId: newTeam.id,
          UserGameId: userGames.id,
          isLeader: false, // Adjust based on business logic
          ...amountMap,
        },
        { transaction: t }
      );
    }

    await EventUsers.create(
      { UserId: userId, EventId: event.id },
      { transaction: t }
    );

    await createUserActivity(
      req,
      req.user,
      "EventJoin",
      `Joined first team :- Event :- ${event.eventId}`,
      t
    );
    // Commit the transaction
    await t.commit();

    res.status(200).json({
      success: true,
      message: "User successfully joined a team",
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error("Error in joining event public team:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while joining a team",
    });
  }
};

exports.joinEventSoloTeam = async (req, res, next) => {
  let t;

  try {
    const userId = req.user.id;
    const event = req.event;
    //const wallet=req.wallet;
    let lastTeam = req.lastTeam;
    const userGames = req.userGames;

    let { isTeamPublic, isJoinnersPaid, isAmountDistributed } = req.body;

    if (
      isTeamPublic === undefined ||
      isAmountDistributed === undefined ||
      isJoinnersPaid === undefined
    ) {
      return res.status(400).json({
        error:
          "isTeamPublic,isJoinnersPaid,isAmountDistributed are must be provided in body!",
      });
    }

    t = await sequelize.transaction();

    let teamUserCount = 1;
    let newTeam;

    if (lastTeam) {
      teamUserCount = parseInt(lastTeam.teamNumber) + 1;
    }

    let totalAmount;

    if (isJoinnersPaid) {
      totalAmount = event.entryFee * event.squadType;
    } else {
      totalAmount = event.entryFee;
      isAmountDistributed = true;
    }

    // If no teams exist, create the first team and add the user to it
    newTeam = await Teams.create(
      {
        EventId: event.id,
        teamNumber: teamUserCount,
        teamId: generateRandomId(),
        isPublic: isTeamPublic, // Passed from req.body
        isJoinnersPaid: isJoinnersPaid, // Passed from req.body
        isAmountDistributed: isAmountDistributed, // Passed from req.body
      },
      { transaction: t }
    );

    let amountMap;

    // Step 7: Deduct the totalAmount from the user's wallet
    if (req.event.entryFee > 0) {
      try {
        amountMap = await deductAmountForEventJoin(req.user, totalAmount, t);
      } catch (error) {
        await t.rollback();
        console.log(error);
        return res.status(403).json({
          success: false,
          message: error.message || "Failed to deduct amount.",
        });
      }
    }

    if (amountMap) {
      await TeamUserGames.create(
        {
          TeamId: newTeam.id,
          UserGameId: userGames.id,
          isLeader: true, // Adjust based on your logic
          deposit: amountMap.deposit,
          cashBonus: amountMap.cashBonus,
          netWinning: amountMap.netWinning,
        },
        { transaction: t }
      );
    } else {
      await TeamUserGames.create(
        {
          TeamId: newTeam.id,
          UserGameId: userGames.id,
          isLeader: true, // Adjust based on your logic
        },
        { transaction: t }
      );
    }
    await EventUsers.create(
      { UserId: userId, EventId: event.id },
      { transaction: t }
    );

    // Step 8: Log the user's activity (event join)
    await createUserActivity(
      req,
      req.user,
      "EventJoin",
      `Joined team for event: ${event.eventId}`,
      t
    );

    // Commit the transaction if everything is successful
    await t.commit();

    res.status(200).json({
      success: true,
      message: "User successfully joined a solo team",
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error("Error in joining event solo team:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while joining a solo team",
    });
  }
};

exports.joinEventPrivateTeam = async (req, res, next) => {
  let t;

  try {
    const userId = req.user.id;
    const event = req.event;
    //const wallet=req.wallet;
    const lastTeam = req.lastTeam;
    const userGames = req.userGames;
    const newTeam = req.team;

    // Step 7: Transaction handling to join the team and deduct the amount (if applicable)
    t = await sequelize.transaction();

    let totalAmount = 0;
    if (!newTeam.isJoinnersPaid) {
      totalAmount = event.entryFee;
    }
    let amountMap;
    // Deduct the totalAmount from the user's wallet if greater than 0
    if (totalAmount > 0) {
      try {
        amountMap = await deductAmountForEventJoin(req.user, totalAmount, t);
      } catch (error) {
        await t.rollback();
        return res.status(403).json({
          success: false,
          message: error.message || "Failed to deduct amount.",
        });
      }
    }
    if (amountMap) {
      await TeamUserGames.create(
        {
          TeamId: newTeam.id,
          UserGameId: userGames.id,
          isLeader: true, // Adjust based on your logic
          deposit: amountMap.deposit,
          cashBonus: amountMap.cashBonus,
          netWinning: amountMap.netWinning,
        },
        { transaction: t }
      );
    } else {
      await TeamUserGames.create(
        {
          TeamId: newTeam.id,
          UserGameId: userGames.id,
          isLeader: true, // Adjust based on your logic
        },
        { transaction: t }
      );
    }
    await EventUsers.create(
      { UserId: userId, EventId: event.id },
      { transaction: t }
    );

    // Step 8: Log the user's activity (event join)
    await createUserActivity(
      req,
      req.user,
      "EventJoin",
      `Joined private team (ID: ${newTeam.teamId}) for event: ${event.eventId}`,
      t
    );

    // Commit the transaction if everything is successful
    await t.commit();

    res.status(200).json({
      success: true,
      message: "User successfully joined the private team",
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error("Error in joining event private team:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while joining the private team",
    });
  }
};

//==================================

exports.createChallengeEvent = async (req, res, next) => {
  let t;
  try {
    const userId = req.user.id;

    // Destructure incoming request body
    const {
      tittle,
      description,
      map,
      noOfPlayers,
      squadType,
      regCloseTime,
      startTime,
      gameId,
      entryFee,
      isPublic,
      isPublicTeam,
      isJoinnersPaid,
      isAmountDistributed,
    } = req.body;

    // Set default values for matchType, eventType, and other default fields
    const eventType = "challenge";
    const matchType = "unranked";
    const perKill = 0; // Since it is fixed
    const prizePool_1_calculated = 2 * entryFee;

    // Step 1: Check if UserGames exists (by gameId and userId)
    const userGames = await UserGames.findOne({
      where: { UserId: userId, GameId: gameId },
    });

    if (!userGames || !userGames.playerId || !userGames.playerName) {
      return res
        .status(400)
        .json({ error: "User has not set up player information." });
    }

    // Step 2: Fetch user's wallet
    const wallet = await Wallet.findOne({
      where: { UserId: userId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    // Step 3: Validate user's funds based on isAmountDistributed
    let totalAmount;
    if (!isJoinnersPaid) {
      totalAmount = entryFee * squadType; // Total amount for distributed fees
    } else {
      totalAmount = entryFee; // Standard entry fee
    }

    // Calculate available funds from wallet
    const availableFunds =
      wallet.deposit + wallet.netWinning + 0.1 * wallet.cashBonus;

    // Check if the user has enough funds
    if (totalAmount > availableFunds) {
      return res
        .status(402)
        .json({ error: "Insufficient funds to create the challenge event." });
    }

    // Step 4: Begin transaction
    t = await sequelize.transaction();

    // Step 5: Create the event
    const event = await Events.create(
      {
        tittle,
        description,
        eventType,
        map,
        matchType,
        noOfPlayers,
        squadType,
        entryFee,
        prizePool_1: prizePool_1_calculated,
        perKill,
        regCloseTime,
        startTime,
        isPublic,
      },
      { transaction: t }
    );

    // Step 6: Create the team for the event
    const team = await Teams.create(
      {
        teamId: generateRandomId(), // Generate a random team ID
        EventId: event.id,
        teamNumber: 1,
        isPublicTeam,
        isJoinnersPaid,
        isAmountDistributed,
      },
      { transaction: t }
    );

    // Step 7: Create TeamUserGames entry, marking the creator as the leader
    await TeamUserGames.create(
      {
        TeamId: team.id,
        UserGameId: userGames.id,
        isLeader: true, // The creator is the leader of the team
      },
      { transaction: t }
    );

    // Step 8: Deduct the required amount from the user's wallet
    try {
      await deductAmountForEventJoin(req.user, totalAmount, t);
    } catch (error) {
      await t.rollback();
      return res.status(403).json({
        success: false,
        message:
          error.message || "Failed to deduct amount for the event creation.",
      });
    }

    // Step 9: Log user activity (event creation)
    await createUserActivity(
      req,
      req.user,
      "EventCreation",
      `Created challenge event (ID: ${event.id}) and team (ID: ${team.id})`,
      t
    );

    // Step 10: Commit the transaction if everything is successful
    await t.commit();

    res.status(201).json({
      success: true,
      message: "Challenge event created successfully.",
      event,
      team,
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error("Error in creating challenge event:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the challenge event.",
    });
  }
};

//------------

exports.getEventTeamInfo = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    // Validate if eventId is provided
    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required.",
      });
    }

    // Find the event
    const event = await Events.findOne({ where: { eventId } });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // Fetch teams associated with the event
    const teams = await Teams.findAll({
      where: { EventId: event.id },

      include: [
        {
          model: UserGames,

          required: true, // Optional: Use if you want to enforce that teams must have user games
          through: {
            model: TeamUserGames,
          },
        },
      ],
    });

    // Calculate total number of players across all teams for the event
    const totalPlayersJoined = teams.reduce((count, team) => {
      return count + team.UserGames.length;
    }, 0);

    return res.status(200).json({
      success: true,
      message: "Teams and associated UserGames retrieved successfully.",
      data: {
        totalNumberOfTeams: teams.length,
        totalPlayersJoined,
        userId: req.user.id,
        teams,
        event,
      },
    });
  } catch (error) {
    console.error("Error fetching event team information:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving team information.",
    });
  }
};
