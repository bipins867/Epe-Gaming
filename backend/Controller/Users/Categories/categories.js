exports.getActiveCategories = async (req, res, next) => {
    try {
      // Fetch all categories where isDeactivated is false
      const activeCategories = await Categories.findAll({
        where: {
          isDeactivated: false,
        },
      });
  
      // Respond with the list of active categories
      return res
        .status(200)
        .json({
          success: true,
          message: "Active categories retrieved successfully",
          data: activeCategories,
        });
    } catch (error) {
      // Handle any errors
      console.log(error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to retrieve active categories",
          error: error.message,
        });
    }
  };
  