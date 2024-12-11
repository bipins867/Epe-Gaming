const Events = require("../../../Models/EventAndGames/events");
const Games = require("../../../Models/EventAndGames/games");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const { generateRandomId } = require("../../../Utils/utils");
const sequelize = require("../../../database");

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


exports.updateRoomCredentials=async(req,res,next)=>{}


exports.getTeamAndMembersInfo=async(req,res,next)=>{}