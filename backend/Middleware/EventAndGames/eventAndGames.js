const TeamUserGames = require("../../Models/AndModels/teamUserGames");
const UserGames = require("../../Models/AndModels/userGames");
const Events = require("../../Models/EventAndGames/events");
const Teams = require("../../Models/EventAndGames/teams");
const Wallet = require("../../Models/Wallet/wallet");

exports.userGamesVerifier = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { GameId } = req.body;

    const userGames = await UserGames.findOne({
      where: { UserId: userId, GameId: GameId },
    });

    if (!userGames || !userGames.playerId || !userGames.playerName) {
      return res
        .status(400)
        .json({ error: "User has not set up player information." });
    }
    req.userGames = userGames;
    next();
  } catch (error) {
    console.error("Internal server error !-", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.eventVerifier = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    // Fetch the event by eventId
    const event = await Events.findOne({ where: { eventId } });
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    req.event = event;
    next();
  } catch (error) {
    console.error("Internal server error !-", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.eventStatusVerifier = async (req, res, next) => {
  try {
    const event = req.event;

    // Check if the event status is open
    if (event.status !== "open") {
      return res.status(402).json({
        message: "Event is not open for registration!",
      });
    }

    // Check if registration close time has passed
    const currentTime = new Date();
    if (currentTime > new Date(event.regCloseTime)) {
      return res.status(403).json({
        message: "Registration is closed!",
      });
    }

    next();
  } catch (error) {
    console.error("Internal server error !-", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.checkEventAlreadyJoinedVerifier = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const event = req.event;

    // Step 1: Fetch all teams for the event
    const teams = await Teams.findAll({ where: { EventId: event.id } });
    if (!teams.length) {
      return next();
    }

    // Step 2: Check if user has already joined any of the teams for the event

    const userInAnyTeam = await TeamUserGames.findOne({
      where: {
        TeamId: teams.map((team) => team.id), // Check across all team IDs in the event
        UserGameId: req.userGames.id, // Use the UserGamesId associated with the user
      },
    });

    // Step 3: If user is found in any team, throw an error
    if (userInAnyTeam) {
      return res
        .status(400)
        .json({ error: "User has already joined a team in this event." });
    }

    // Step 4: If no team is found for the user, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.userWalletFundsVerfier = async (req, res, next) => {
  try {
    const event = req.event;
    const { isTotalPaid, teamId } = req.body;

    if (isTotalPaid === undefined) {
      return res
        .status(404)
        .json({ message: "isTotalPaid condition not found!" });
    }

    const wallet = await Wallet.findOne({
      where: { UserId: req.user.id },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    // Step 3: Calculate total amount (entryFee * squadType)
    let totalAmount;
    if (isTotalPaid) {
      totalAmount = event.entryFee * event.squadType;
    } else {
      totalAmount = event.entryFee;
    }

    if (teamId) {
      const team = await Teams.findOne({
        where: { TeamId: teamId, EventId: event.id },
      });

      if (!team) {
        return res
          .status(404)
          .json({ error: "Team Id not found for this event." });
      }
      req.team = team;
      // Step 4: Get associated TeamUserGames and count
      req.teamUserCount = await TeamUserGames.count({
        where: { TeamId: team.id },
      });

      if (team.isJoinnersPaid) {
        totalAmount = 0;
      } else {
        totalAmount = event.entryFee;
      }
    }

    const availableFunds =
      wallet.deposit + wallet.netWinning + 0.1 * wallet.cashBonus;

    if (totalAmount > availableFunds) {
      return res.status(402).json({ error: "Insufficient Funds!" });
    }

    req.wallet = wallet;
    next();
  } catch (error) {
    console.error("Internal server error !-", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.userTeamCounter = async (req, res, next) => {
  try {
    const event = req.event;

    let currentTeamSize = 0,
      currentTeamCapacity = 0;

    const lastTeam = await Teams.findOne({
      where: { EventId: event.id },
      order: [["teamNumber", "DESC"]],
    });

    if (lastTeam) {
      const teamNumber = lastTeam.teamNumber;
      currentTeamSize = teamNumber * event.squadType;

      const teamUserCount = await TeamUserGames.count({
        where: { TeamId: lastTeam.id },
      });

      currentTeamCapacity = teamUserCount;
    }

    req.lastTeam = lastTeam;
    req.currentTeamSize = currentTeamSize;
    req.currentTeamCapacity = currentTeamCapacity;

    next();
  } catch (error) {
    console.error("Internal server error !-", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.userTeamSizeVerfier = async (req, res, next) => {
  try {
    const event = req.event;
    const { isTotalPaid, teamId } = req.body;

    if (teamId) {
      const team = req.team;

      // Step 4: Get associated TeamUserGames and count
      const teamUserCount = req.teamUserCount;

      // Check if the team has space
      if (teamUserCount >= event.squadType) {
        return res.status(400).json({ error: "Slot is full for this team." });
      }
    } else {
      const lastTeam = req.lastTeam;

      if (isTotalPaid) {
        let teamNumber = 1;

        if (lastTeam) {
          teamNumber = lastTeam.teamNumber;
        }
        const currentCapacity = teamNumber * event.squadType;

        if (currentCapacity >= event.noOfPlayers) {
          return res.status(400).json({
            error:
              "No more teams can be created as the event has reached its capacity.",
          });
        }
      } else {
        const teamUserCount = req.currentTeamCapacity;

        if (teamUserCount >= event.squadType) {
          const totalTeams = req.currentTeamSize;

          const currentCapacity = totalTeams * event.squadType;

          if (currentCapacity >= event.noOfPlayers) {
            return res.status(400).json({
              error:
                "No more teams can be created as the event has reached its capacity.",
            });
          }
        }
      }
    }

    next();
  } catch (error) {
    console.error("Internal server error !-", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
