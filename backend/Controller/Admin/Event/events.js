const Events = require("../../../Models/EventAndGames/events");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const { generateRandomId } = require("../../../Utils/utils");
const sequelize = require("../../../database");


exports.createEvent = async (req, res, next) => {
  const t = await sequelize.transaction(); // Start a transaction

  try {
    // Destructure data from the request body
    const {
      title,
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
      status = 'upcoming', // Default value for status
      entryFee,
    } = req.body;

    // Validate input fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: "Invalid title" });
    }
    
    if (typeof description !== 'string') {
      return res.status(400).json({ error: "Invalid description" });
    }

    if (!eventType || typeof eventType !== 'string') {
      return res.status(400).json({ error: "Invalid event type" });
    }

    if (map && typeof map !== 'string') {
      return res.status(400).json({ error: "Invalid map" });
    }

    const validMatchTypes = ['ranked', 'unranked'];
    if (!validMatchTypes.includes(matchType)) {
      return res.status(400).json({ error: "Invalid match type" });
    }

    if (!Number.isInteger(noOfPlayers) || noOfPlayers <= 0) {
      return res.status(400).json({ error: "Invalid number of players" });
    }

    const validSquadTypes = [1, 2,3, 4]; // solo, duo, squad
    if (!validSquadTypes.includes(squadType)) {
      return res.status(400).json({ error: "Invalid squad type" });
    }

    if (noOfPlayers % squadType !== 0) {
      return res.status(400).json({ error: "Mismatch in number of players according to squad type" });
    }

    if (matchType === 'ranked') {
      if (prizePool_2 == null && prizePool_3 == null) {
        return res.status(400).json({ error: "Prize pools 2 and 3 must be provided for ranked matches" });
      }
    } else {
      // For unranked matches
      if (prizePool_2 != null || prizePool_3 != null) {
        return res.status(400).json({ error: "Prize pools 2 and 3 should not be provided for unranked matches" });
      }
      prizePool_2 = null;
      prizePool_3 = null;
      perKill = 0; // Set perKill to 0 for unranked matches
    }

    // Generate eventId
    const eventId = generateRandomId();

    // Create the event
    const newEvent = await Events.create({
      eventId,
      title,
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
      isDeactivated: false // Default value
    }, { transaction: t });

    // Log admin activity
    await createAdminActivity(req, req.admin, "event", "Created new event", null, t);

    await t.commit(); // Commit the transaction
    res.status(201).json(newEvent);
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of error
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
