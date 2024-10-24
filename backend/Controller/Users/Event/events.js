const sequelize = require("../../../database");
const TeamUserGames = require("../../../Models/AndModels/teamUserGames");
const UserGames = require("../../../Models/AndModels/userGames");
const Events = require("../../../Models/EventAndGames/events");
const Teams = require("../../../Models/EventAndGames/teams");
const Wallet = require("../../../Models/Wallet/wallet");
const { createUserActivity } = require("../../../Utils/activityUtils");
const { generateRandomId } = require("../../../Utils/utils");
const { deductAmountForEventJoin } = require("../../../Utils/wallet");

exports.getEventList = async (req, res, next) => {
  try {
    const { GameId } = req.params; // Assuming the GameId is passed as a URL parameter
    const { eventType, status } = req.body; // These are passed in the request body

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

    if (!status || typeof status !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing status.",
      });
    }

    // Query events based on the provided conditions
    const events = await Events.findAll({
      where: {
        GameId: GameId,
        isPublic: true, // Only public events
        eventType: eventType, // Event type as provided in req.body
        status: status, // Status as provided in req.body
        isDeactivated: false, // Only active events (not deactivated)
      },
    });

    // Return the list of events
    return res.status(200).json({
      success: true,
      message: "Events retrieved successfully.",
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving events.",
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
        id: eventId, // Match the provided eventId
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
        error: "No user game information found for the given GameId and UserId",
      });
    }

    return res.status(200).json({
      success: true,
      data: userGameInfo,
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
    const userGameInfo = await UserGames.findOne({
      where: { UserId: userId, GameId },
    });

    if (!userGameInfo) {
      return res.status(404).json({ error: "User game info not found" });
    }

    t = await sequelize.transaction();

    // Update user game information
    await userGameInfo.update(
      {
        playerName,
        playerId,
      },
      { transaction: t }
    );

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
    const { eventId, GameId } = req.body;

    // Check if UserGames exists (by GameId and userId)
    const userGames = await UserGames.findOne({
      where: { UserId: userId, GameId: GameId },
    });

    if (!userGames || !userGames.playerId || !userGames.playerName) {
      return res
        .status(400)
        .json({ error: "User has not set up player information." });
    }

    // Fetch the event by eventId
    const event = await Events.findOne({ where: { eventId } });
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Fetch the user's wallet
    const wallet = await Wallet.findOne({
      where: { UserId: user.id },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    if (
      event.entryFee >
      wallet.deposit + wallet.netWinning + 0.1 * wallet.cashBonus
    ) {
      return res.status(402).json({ error: "Insufficent Funds!" });
    }
    // Proceed if there are Teams associated with the event
    let lastTeam = await Teams.findOne({
      where: { EventId: event.id },
      order: [["teamNumber", "DESC"]],
    });

    t = await sequelize.transaction();

    let teamUserCount = 0;
    let newTeam;

    if (lastTeam) {
      // Get associated TeamUserGames and count
      teamUserCount = await TeamUserGames.count({
        where: { TeamId: lastTeam.id },
      });

      // If last team has space, add to this team
      if (teamUserCount < event.squadType) {
        await TeamUserGames.create(
          {
            TeamId: lastTeam.id,
            UserGamesId: userGames.id,
            isLeader: false, // Adjust based on business logic
          },
          { transaction: t }
        );
      } else {
        // If seat is full, check if more teams can be created based on event.squadType and noOfPlayers
        const totalTeams = await Teams.count({ where: { EventId: event.id } });
        const currentCapacity = totalTeams * event.squadType;

        if (currentCapacity < event.noOfPlayers) {
          // Create a new team and add the user to this team
          newTeam = await Teams.create(
            {
              EventId: event.id,
              teamNumber: lastTeam.teamNumber + 1,
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
              UserGamesId: userGames.id,
              isLeader: false, // Adjust based on business logic
            },
            { transaction: t }
          );
        } else {
          return res.status(400).json({
            error:
              "No more teams can be created as the event has reached its capacity.",
          });
        }
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
          UserGamesId: userGames.id,
          isLeader: false, // Adjust based on business logic
        },
        { transaction: t }
      );
    }

    try {
      await deductAmountForEventJoin(req.user, event.entryFee, t);
    } catch (error) {
      t.rollback();
      return res.status(403).json({
        success: false,
        message: error,
      });
    }
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
    const { eventId, GameId, isPublic, isJoinnersPaid, isAmountDistributed } = req.body;

    // Step 1: Check if UserGames exists (by GameId and userId)
    const userGames = await UserGames.findOne({
      where: { UserId: userId, GameId: GameId },
    });

    if (!userGames || !userGames.playerId || !userGames.playerName) {
      return res
        .status(400)
        .json({ error: "User has not set up player information." });
    }

    // Step 2: Fetch the event by eventId
    const event = await Events.findOne({ where: { id: eventId } });
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Step 3: Calculate total amount (entryFee * squadType)
    const totalAmount = event.entryFee * event.squadType;

    // Step 4: Fetch the user's wallet
    const wallet = await Wallet.findOne({
      where: { UserId: userId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    // Step 5: Check if the user has enough funds to join the event
    const availableFunds =
      wallet.deposit + wallet.netWinning + 0.1 * wallet.cashBonus;

    if (totalAmount > availableFunds) {
      return res.status(402).json({ error: "Insufficient Funds!" });
    }

    // Step 6: Fetch the last team based on eventId and teamNumber (descending order)
    let lastTeam = await Teams.findOne({
      where: { EventId: event.id },
      order: [["teamNumber", "DESC"]],
    });

    t = await sequelize.transaction();

    let teamUserCount = 1;
    let newTeam;

    if(lastTeam){
      teamUserCount=lastTeam.teamNumber+1;
    }
    
      // If no teams exist, create the first team and add the user to it
      newTeam = await Teams.create(
        {
          EventId: event.id,
          teamNumber: teamUserCount,
          teamId: generateRandomId(),
          isPublic: isPublic, // Passed from req.body
          isJoinnersPaid: isJoinnersPaid, // Passed from req.body
          isAmountDistributed: isAmountDistributed, // Passed from req.body
        },
        { transaction: t }
      );

      await TeamUserGames.create(
        {
          TeamId: newTeam.id,
          UserGamesId: userGames.id,
          isLeader: true, // Adjust based on your logic
        },
        { transaction: t }
      );
    
      
    // Step 7: Deduct the totalAmount from the user's wallet
    try {
      await deductAmountForEventJoin(req.user, totalAmount, t);
    } catch (error) {
      await t.rollback();
      return res.status(403).json({
        success: false,
        message: error.message || "Failed to deduct amount.",
      });
    }

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
    const { eventId, teamId ,GameId} = req.body;

    // Step 1: Check if UserGames exists (by GameId and userId)
    const userGames = await UserGames.findOne({
      where: { UserId: userId,GameId },
    });

    if (!userGames || !userGames.playerId || !userGames.playerName) {
      return res
        .status(400)
        .json({ error: "User has not set up player information." });
    }

    // Step 2: Fetch the event by eventId
    const event = await Events.findOne({ where: { eventId } });
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Step 3: Fetch the team by teamId
    const team = await Teams.findOne({
      where: { teamId: teamId, EventId: event.id },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found for this event." });
    }

    // Step 4: Get associated TeamUserGames and count
    const teamUserCount = await TeamUserGames.count({
      where: { TeamId: team.id },
    });

    // Check if the team has space
    if (teamUserCount >= event.squadType) {
      return res.status(400).json({ error: "Slot is full for this team." });
    }

    // Step 5: Fetch the user's wallet
    const wallet = await Wallet.findOne({
      where: { UserId: userId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    // Step 6: Check if the user has enough funds to join the event
    const totalAmount = event.entryFee;
    const availableFunds =
      wallet.deposit + wallet.netWinning + 0.1 * wallet.cashBonus;

    if (totalAmount > availableFunds) {
      return res.status(402).json({ error: "Insufficient Funds!" });
    }

    // Step 7: Transaction handling to join the team and deduct the amount
    t = await sequelize.transaction();

    // Add the user to the private team
    await TeamUserGames.create(
      {
        TeamId: team.id,
        UserGamesId: userGames.id,
        isLeader: false, // Adjust based on your logic
      },
      { transaction: t }
    );

    // Deduct the totalAmount from the user's wallet
    try {
      await deductAmountForEventJoin(req.user, totalAmount, t);
    } catch (error) {
      await t.rollback();
      return res.status(403).json({
        success: false,
        message: error.message || "Failed to deduct amount.",
      });
    }

    // Step 8: Log the user's activity (event join)
    await createUserActivity(
      req,
      req.user,
      "EventJoin",
      `Joined private team (ID: ${teamId}) for event: ${event.eventId}`,
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

//------------

exports.getEventDetails = async (req, res, next) => {};

exports.getEventTeamInfo = async (req, res, next) => {};
