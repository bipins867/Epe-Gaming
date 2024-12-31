const UserGames = require("../../../Models/AndModels/userGames");
const Events = require("../../../Models/EventAndGames/events");
const User = require("../../../Models/User/users");
const { Op } = require("sequelize");

exports.getGameDashboardInformation = async (req, res, next) => {
  try {
    // Fetch all user profile information from the UserGames model
    const leaderboardData = await UserGames.findAll({
      attributes: [
        "playerId",
        "playerName",
        "totalPoints",
        "matchPlayed",
        "totalKills",
        "totalWinning",
      ],
      order: [
        ["totalPoints", "DESC"], // Sort by totalPoints in descending order
        ["totalKills", "DESC"], // Secondary sort by totalKills in descending order
      ],
    });

    const totalPlayers = await User.count({ where: { isBlocked: false } });

    const currentDateTime = new Date();

    const upcomingMatches = await Events.findAll({
      where: {
        startTime: { [Op.gt]: currentDateTime },
        status: {
          [Op.or]: ["upcoming", "rescheduled"],
        },
        GameId: "1",
        isPublic: true,
        isDeactivated: false,
      },
    });

    const countInfo = { totalPlayers, upcomingMatches: upcomingMatches.length };

    // Return a success response with the leaderboard data
    return res.status(200).json({
      success: true,
      message: "Leaderboard information fetched successfully.",
      leaderboardData,
      countInfo,
      upcomingMatches,
    });
  } catch (error) {
    console.error("Error fetching leaderboard information:", error);

    // Handle errors and return a failure response
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching leaderboard information.",
      error: error.message,
    });
  }
};
