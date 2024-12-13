const TeamUserGames = require("../../../Models/AndModels/teamUserGames");
const UserGames = require("../../../Models/AndModels/userGames");
const Events = require("../../../Models/EventAndGames/events");
const Games = require("../../../Models/EventAndGames/games");
const Teams = require("../../../Models/EventAndGames/teams");
const User = require("../../../Models/User/users");
const Wallet = require("../../../Models/Wallet/wallet");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const { generateRandomId } = require("../../../Utils/utils");
const sequelize = require("../../../database");

exports.getEventsList = async (req, res, next) => {
  const { GameId } = req.body;

  try {
    if (!GameId) {
      return res.status(400).json({
        success: false,
        message: "GameId is required to fetch events.",
      });
    }

    // Fetch the four categories of events filtered by GameId
    const ongoingEvents = await Events.findAll({
      where: { status: "ongoing", GameId },
      include: [{ model: Games }],
    });

    const inReviewEvents = await Events.findAll({
      where: { status: "inReview", GameId },
      include: [{ model: Games }],
    });

    const upcomingOrRescheduledEvents = await Events.findAll({
      where: {
        status: ["upcoming", "rescheduled"], // Handle both statuses
        GameId,
      },
      include: [{ model: Games }],
    });

    const canceledOrDeclaredEvents = await Events.findAll({
      where: {
        status: ["canceled", "declared"], // Handle both statuses
        GameId,
      },
      include: [{ model: Games }],
    });

    // Respond with the categorized lists
    return res.status(200).json({
      success: true,
      message: "Event lists fetched successfully",
      data: {
        ongoingEvents,
        inReviewEvents,
        upcomingOrRescheduledEvents,
        canceledOrDeclaredEvents,
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event lists",
      error: error.message,
    });
  }
};

exports.createEvent = async (req, res, next) => {
  let t; // Start a transaction

  try {
    // Destructure data from the request body
    let {
      tittle,
      description,
      eventType,
      map,
      matchType,
      noOfPlayers,
      squadType,
      prizePool_1,
      prizePool_2,
      prizePool_3,
      perKill,
      regCloseTime,
      startTime,
      status = "open", // Default value for status
      entryFee,
      gameId,
    } = req.body;

    // Validate input fields
    if (!tittle || typeof tittle !== "string" || tittle.trim().length === 0) {
      return res.status(400).json({ error: "Invalid tittle" });
    }

    if (typeof description !== "string") {
      return res.status(400).json({ error: "Invalid description" });
    }

    if (!eventType || typeof eventType !== "string") {
      return res.status(400).json({ error: "Invalid event type" });
    }

    if (map && typeof map !== "string") {
      return res.status(400).json({ error: "Invalid map" });
    }

    const validMatchTypes = ["ranked", "unranked"];
    if (!validMatchTypes.includes(matchType)) {
      return res.status(400).json({ error: "Invalid match type" });
    }

    if (!Number.isInteger(noOfPlayers) || noOfPlayers <= 0) {
      return res.status(400).json({ error: "Invalid number of players" });
    }

    const validSquadTypes = [1, 2, 3, 4]; // solo, duo, squad
    if (!validSquadTypes.includes(squadType)) {
      return res.status(400).json({ error: "Invalid squad type" });
    }

    if (noOfPlayers % squadType !== 0) {
      return res.status(400).json({
        error: "Mismatch in number of players according to squad type",
      });
    }

    if (matchType === "ranked") {
      if (prizePool_2 == null && prizePool_3 == null) {
        return res.status(400).json({
          error: "Prize pools 2 and 3 must be provided for ranked matches",
        });
      }
    } else {
      // For unranked matches
      if (prizePool_2 != null || prizePool_3 != null) {
        return res.status(400).json({
          error:
            "Prize pools 2 and 3 should not be provided for unranked matches",
        });
      }
      prizePool_2 = null;
      prizePool_3 = null;
      perKill = 0; // Set perKill to 0 for unranked matches
    }

    // Validate gameId and check for the associated game
    const game = await Games.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    t = await sequelize.transaction();

    // Generate eventId
    const eventId = generateRandomId();

    // Create the event
    const newEvent = await Events.create(
      {
        eventId,
        tittle,
        description,
        eventType,
        map,
        matchType,
        noOfPlayers,
        squadType,
        prizePool_1,
        prizePool_2,
        prizePool_3,
        perKill,
        regCloseTime,
        startTime,
        status,
        entryFee,
        isPublic: true, // Default value
        isDeactivated: false, // Default value
        GameId: gameId,
      },
      { transaction: t }
    );

    // Log admin activity
    await createAdminActivity(
      req,
      req.admin,
      "event",
      "Created new event",
      null,
      t
    );

    await t.commit(); // Commit the transaction
    res.status(201).json(newEvent);
  } catch (error) {
    if (t) {
      await t.rollback(); // Rollback the transaction in case of error
    }
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRoomCredentials = async (req, res, next) => {
  const { eventId, roomId, roomPassword } = req.body;

  if (!eventId || !roomId || !roomPassword) {
    return res.status(400).json({
      success: false,
      message: "Event ID, Room ID, and Room Password are required.",
    });
  }

  let transaction; // Start a Sequelize transaction

  try {
    // Find the event by eventId
    const event = await Events.findOne({ where: { eventId } });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }
    transaction = await sequelize.transaction();

    // Update the room credentials
    await event.update({ roomId, roomPassword }, { transaction });

    // Log the activity using createAdminActivity
    await createAdminActivity(
      req,
      req.admin,
      "event",
      `Room credentials updated: Room ID=${roomId}, Room Password=${roomPassword} of Event Id :- ${event.eventId}`,
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Room credentials updated successfully.",
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error updating room credentials:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update room credentials.",
      error: error.message,
    });
  }
};

exports.getEventInfo = async (req, res, next) => {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event ID is required.",
    });
  }

  try {
    // Fetch the event information by eventId
    const event = await Events.findOne({
      where: { eventId },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event information retrieved successfully.",
      data: event,
    });
  } catch (error) {
    console.error("Error fetching event information:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve event information.",
      error: error.message,
    });
  }
};

exports.getTeamsAndMemberInfo = async (req, res, next) => {
  try {
    const { eventId } = req.body; // Retrieve eventId from request parameters

    // Step 1: Fetch the event information based on eventId
    const event = await Events.findOne({
      where: { eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Step 2: Get the teams for the event
    const teams = await Teams.findAll({
      where: { EventId: event.id },
    });

    if (!teams || teams.length === 0) {
      return res
        .status(404)
        .json({ message: "No teams found for this event." });
    }

    // Step 3: Get team member information for each team
    const teamsInfo = [];

    for (let team of teams) {
      const teamInfo = {
        team,
        teamMembers: [],
      };

      // Get the team members from TeamUserGames
      const teamUserGames = await TeamUserGames.findAll({
        where: { TeamId: team.id },
      });

      for (let teamUser of teamUserGames) {
        // Step 4: Get the UserGames information for each team member
        const userGame = await UserGames.findOne({
          where: { id: teamUser.UserGameId },
        });

        if (userGame) {
          // Step 5: Collect the information for the player
          const playerInfo = {
            teamUserGamesId: teamUser.id,
            playerId: userGame.playerId,
            playerName: userGame.playerName,
            leaderBoardRank: userGame.leaderBoardRank,
            matchPlayed: userGame.matchPlayed,
            totalKills: userGame.totalKills,
            deposit: teamUser.deposit,
            cashBonus: teamUser.cashBonus,
            netWinning: teamUser.netWinning,
            kills: teamUser.kills,
            winningBalance: teamUser.winningBalance,
            status: teamUser.status,
            point: teamUser.point,
            remark: teamUser.remark,
          };

          teamInfo.teamMembers.push(playerInfo);
        }
      }

      teamsInfo.push(teamInfo);
    }

    // Step 6: Respond with the teams and member information
    return res.status(200).json({
      success: true,
      eventId,
      teams: teamsInfo,
    });
  } catch (error) {
    console.error("Error in getTeamsAndMemberInfo:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//Update-> inReview,rescheduled,cancelled
exports.updateEventStatus = async (req, res, next) => {
  let transaction;

  try {
    const { eventId, status, remark, rescheduledTime } = req.body;

    // Step 1: Fetch the event by eventId
    const event = await Events.findOne({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const currentStatus = event.status;
    const currentTime = new Date();

    transaction = await sequelize.transaction();

    // Step 2: Handle status update based on current status and given conditions
    if (status === "rescheduled") {
      // Reschedule is allowed only for "upcoming" events
      if (currentStatus !== "upcoming") {
        return res
          .status(400)
          .json({ message: "Only 'upcoming' events can be rescheduled." });
      }
      if (!rescheduledTime) {
        return res
          .status(400)
          .json({ message: "Rescheduled time is required for rescheduling." });
      }

      await event.update(
        {
          status: "rescheduled",
          startTime: rescheduledTime,
          remark: remark || "Event has been rescheduled.",
        },
        { transaction }
      );

      transaction.commit();
      return res.status(200).json({
        success: true,
        message: "Event status updated to 'rescheduled'.",
        event,
      });
    } else if (status === "cancelled") {
      // Cancellation is allowed for "upcoming" events
      if (currentStatus !== "upcoming") {
        return res
          .status(400)
          .json({ message: "Only 'upcoming' events can be cancelled." });
      }
      if (!remark) {
        return res
          .status(400)
          .json({ message: "Reason (remark) is required for cancellation." });
      }

      // Fetch all teams associated with the event
      const teams = await Teams.findAll({
        where: { EventId: event.id },
      });

      for (let team of teams) {
        // Fetch teamUserGames for each team
        const teamUserGames = await TeamUserGames.findAll({
          where: { TeamId: team.id },
        });

        for (let teamUserGame of teamUserGames) {
          const userGame = await UserGames.findOne({
            where: { id: teamUserGame.UserGameId },
          });

          if (!userGame) continue;

          const user = await User.findOne({
            where: { id: userGame.UserId },
          });

          if (!user) continue;

          const wallet = await Wallet.findOne({
            where: { UserId: user.id },
          });

          if (!wallet) continue;

          // Step 3: Adjust wallet balances
          wallet.deposit += teamUserGame.deposit;
          wallet.cashBonus += teamUserGame.cashBonus;
          wallet.netWinning += teamUserGame.netWinning;

          wallet.unclearedDeposit -= teamUserGame.deposit;
          wallet.unclearedCashBonus -= teamUserGame.cashBonus;
          wallet.unclearedNetWinning -= teamUserGame.netWinning;

          // Ensure uncleared balances do not go negative
          wallet.unclearedDeposit = Math.max(wallet.unclearedDeposit, 0);
          wallet.unclearedCashBonus = Math.max(wallet.unclearedCashBonus, 0);
          wallet.unclearedNetWinning = Math.max(wallet.unclearedNetWinning, 0);

          await wallet.save({ transaction: transaction });

          // Step 4: Reset teamUserGame balances
          teamUserGame.deposit = 0;
          teamUserGame.cashBonus = 0;
          teamUserGame.netWinning = 0;
          await teamUserGame.save({ transaction: transaction });
        }
      }

      // Update event status to cancelled
      await event.update(
        {
          status: "cancelled",
          remark,
        },
        { transaction: transaction }
      );

      // Commit transaction
      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: "Event status updated to 'cancelled' and balances adjusted.",
        event,
      });
    } else if (status === "inReview") {
      // "inReview" is allowed only if the start time has passed and the event was "upcoming"
      if (currentStatus !== "upcoming") {
        return res.status(400).json({
          message: "Only 'upcoming' events can be moved to 'inReview'.",
        });
      }
      if (new Date(event.startTime) > currentTime) {
        return res
          .status(400)
          .json({ message: "The event start time has not passed yet." });
      }

      await event.update(
        {
          status: "inReview",
          remark:
            remark || "Event moved to review as the start time has passed.",
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: "Event status updated to 'inReview'.",
        event,
      });
    } else {
      // Invalid status provided
      return res.status(400).json({
        message:
          "Invalid status. Allowed statuses are: 'rescheduled', 'cancelled', 'inReview'.",
      });
    }
  } catch (error) {
    // Rollback transaction in case of an error
    if (transaction) await transaction.rollback();

    console.error("Error in updateEventStatus:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
//In the case of result declaration .....
exports.updateTeamsAndMemberInfo = async (req, res, next) => {
  try {
    const { teamInfo, membersInfo } = req.body;

    // Validate input data
    if (!teamInfo || !teamInfo.teamId) {
      return res
        .status(400)
        .json({ message: "Team information with a valid teamId is required." });
    }
    if (!Array.isArray(membersInfo) || membersInfo.length === 0) {
      return res
        .status(400)
        .json({ message: "Members information should be a non-empty array." });
    }

    const transaction = await sequelize.transaction();

    try {
      // Step 1: Update the team information
      const team = await Teams.findOne({
        where: { id: teamInfo.teamId },
      });

      if (!team) {
        await transaction.rollback();
        return res.status(404).json({ message: "Team not found." });
      }

      await team.update(
        {
          status: teamInfo.status,
          remark: teamInfo.remark,
          teamRank: teamInfo.teamRank,
          isChecked: true,
        },
        { transaction }
      );

      // Step 2: Update the team members' information
      for (const member of membersInfo) {
        if (!member.teamUserGameId) {
          await transaction.rollback();
          return res
            .status(400)
            .json({ message: "Each member must have a valid teamUserGameId." });
        }

        const teamUserGame = await TeamUserGames.findOne({
          where: { id: member.teamUserGameId },
        });

        if (!teamUserGame) {
          await transaction.rollback();
          return res.status(404).json({
            message: `Team member with ID ${member.teamUserGameId} not found.`,
          });
        }
        const prevKill = teamUserGame.prevKill;

        await teamUserGame.update(
          {
            status: member.status,
            remark: member.remark,
            kills: member.kills,
          },
          { transaction }
        );

        const userGames = await UserGames.findOne({
          where: {
            id: teamUserGame.UserGameId,
          },
        });

        await userGames.update(
          { totalKills: userGames.totalKills - prevKill },
          { transaction }
        );
        await userGames.update(
          {
            totalKills: member.kills + userGames.totalKills,
          },
          { transaction }
        );
      }

      // Commit the transaction
      await transaction.commit();

      // Step 3: Return success response
      return res.status(200).json({
        success: true,
        message: "Team and members' information updated successfully.",
      });
    } catch (error) {
      // Rollback transaction in case of an error
      await transaction.rollback();
      console.error("Error in updateTeamsAndMemberInfo (nested try):", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } catch (error) {
    console.error("Error in updateTeamsAndMemberInfo:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//declareResult
exports.declareEventResult = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { eventId } = req.body; // Extract eventId from request

    // Step 1: Fetch the event info
    const event = await Events.findOne({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Check if the event status allows result declaration
    if (!["ongoing", "rescheduled", "upcoming"].includes(event.status)) {
      return res.status(400).json({
        message: `Event status must be 'ongoing', 'rescheduled', or 'upcoming' to declare results.`,
      });
    }

    // Step 2: Get all teams associated with the event
    const teams = await Teams.findAll({
      where: { EventId: event.id },
    });

    if (!teams || teams.length === 0) {
      return res
        .status(400)
        .json({ message: "No teams found for this event." });
    }

    // Check if all teams have isChecked set to true
    const uncheckedTeam = teams.find((team) => !team.isChecked);
    if (uncheckedTeam) {
      return res.status(400).json({
        message:
          "All teams must be verified (isChecked=true) before declaring results.",
      });
    }

    // Step 3: Process each team and their members
    for (let team of teams) {
      const teamUserGames = await TeamUserGames.findAll({
        where: { TeamId: team.id },
      });

      for (let teamUserGame of teamUserGames) {
        const userGame = await UserGames.findOne({
          where: { id: teamUserGame.UserGameId },
        });

        if (!userGame) continue;

        const user = await User.findOne({
          where: { id: userGame.UserId },
        });

        if (!user) continue;

        const wallet = await Wallet.findOne({
          where: { UserId: user.id },
        });

        if (!wallet) continue;

        // Step 4: Update wallet balances
        wallet.netWinning += teamUserGame.winningBalance;
        wallet.unclearedDeposit -= teamUserGame.deposit;
        wallet.unclearedCashBonus -= teamUserGame.cashBonus;
        wallet.unclearedNetWinning -= teamUserGame.netWinning;

        // Ensure no uncleared balances go negative
        wallet.unclearedDeposit = Math.max(wallet.unclearedDeposit, 0);
        wallet.unclearedCashBonus = Math.max(wallet.unclearedCashBonus, 0);
        wallet.unclearedNetWinning = Math.max(wallet.unclearedNetWinning, 0);

        await wallet.save({ transaction });

        // Step 5: Reset teamUserGame fields
        teamUserGame.deposit = 0;
        teamUserGame.cashBonus = 0;
        teamUserGame.netWinning = 0;
        await teamUserGame.save({ transaction });
      }
    }

    // Step 6: Update event status to 'declared'
    event.status = "declared";
    await event.save({ transaction });

    // Commit the transaction
    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Event results declared and balances updated.",
    });
  } catch (error) {
    // Rollback transaction in case of an error
    await transaction.rollback();

    console.error("Error in declareEventResult:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
