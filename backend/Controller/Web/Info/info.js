const UserGames = require("../../../Models/AndModels/userGames");


exports.getLeaderboardInfo = async (req, res, next) => {
  try {
    // Fetch all user profile information from the UserGames model
    const leaderboardData = await UserGames.findAll({
      attributes: [
        'playerId', 
        'playerName', 
        'totalPoints', 
        'matchPlayed', 
        'totalKills'
      ],
      order: [
        ['totalPoints', 'DESC'], // Sort by totalPoints in descending order
        ['totalKills', 'DESC']   // Secondary sort by totalKills in descending order
      ],
    });

    // Return a success response with the leaderboard data
    return res.status(200).json({
      success: true,
      message: 'Leaderboard information fetched successfully.',
      data: leaderboardData,
    });
  } catch (error) {
    console.error('Error fetching leaderboard information:', error);

    // Handle errors and return a failure response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching leaderboard information.',
      error: error.message,
    });
  }
};
