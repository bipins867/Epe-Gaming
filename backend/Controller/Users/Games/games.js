const Games = require("../../../Models/EventAndGames/games");
const sequelize = require("../../../database");


exports.getActiveGames = async (req, res, next) => {
    const {CategoryId}=req.body;
    try {
      // Fetch all games where isDeactivated is false
      const activeGames = await Games.findAll({
        where: {
          isDeactivated: false,
          CategoryId:CategoryId
        },
      });
  
      // Respond with the list of active games
      return res.status(200).json({
        success: true,
        message: "Active games retrieved successfully",
        data: activeGames,
      });
    } catch (error) {
      // Handle any errors
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve active games",
        error: error.message,
      });
    }
  };
  