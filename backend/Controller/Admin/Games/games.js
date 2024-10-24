const Categories = require("../../../Models/EventAndGames/categories");
const Games = require("../../../Models/EventAndGames/games");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const sequelize = require("../../../database");

exports.createGames = async (req, res, next) => {
  const { tittle, description, categorieId } = req.body;
  const admin = req.admin;

  // Validation for tittle and description
  if (
    !tittle ||
    typeof tittle !== "string" ||
    tittle.length < 3 ||
    tittle.length > 100
  ) {
    return res.status(400).json({
      success: false,
      message: "tittle must be a string between 3 and 100 characters.",
    });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.length < 5 ||
    description.length > 500
  ) {
    return res.status(400).json({
      success: false,
      message: "Description must be a string between 5 and 500 characters.",
    });
  }

  let transaction;
  try {
    // Find the associated category by ID
    const category = await Categories.findByPk(categorieId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    transaction = await sequelize.transaction();
    // Create the new game and associate it with the found category
    const newGame = await Games.create(
      {
        tittle,
        description,
        CategoryId: category.id, // Ensure the game is associated with the category
      },
      { transaction }
    );

    // Log the admin activity
    await createAdminActivity(
      req,
      admin,
      "games",
      `Created a new game in category: ${category.name}`, // Log with category name
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "Game created successfully",
      data: newGame,
    });
  } catch (error) {
    // Rollback transaction in case of error
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create game",
      error: error.message,
    });
  }
};

exports.editGames = async (req, res, next) => {
  
  const { tittle,id, description } = req.body;
  const admin = req.admin;

  // Ensure at least one field (tittle or description) is provided for update
  if (!tittle && !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide a tittle or description to update.",
    });
  }

  // Validation for tittle
  if (
    tittle &&
    (typeof tittle !== "string" || tittle.length < 3 || tittle.length > 100)
  ) {
    return res.status(400).json({
      success: false,
      message: "tittle must be a string between 3 and 100 characters.",
    });
  }

  // Validation for description
  if (
    description &&
    (typeof description !== "string" ||
      description.length < 5 ||
      description.length > 500)
  ) {
    return res.status(400).json({
      success: false,
      message: "Description must be a string between 5 and 500 characters.",
    });
  }

  const transaction = await sequelize.transaction();
  try {
    // Find the game by ID
    const game = await Games.findByPk(id);
    if (!game) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Game not found" });
    }

    // Update the game
    if (tittle) game.tittle = tittle;
    if (description) game.description = description;
    await game.save({ transaction });

    // Log the admin activity
    await createAdminActivity(
      req,
      admin,
      "games",
      "Edited game",
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Game updated successfully",
      data: game,
    });
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update game",
      error: error.message,
    });
  }
};

exports.deactivateGames = async (req, res, next) => {
  const { id } = req.body;
  const admin = req.admin;

  const transaction = await sequelize.transaction();
  try {
    // Find the game by ID
    const game = await Games.findByPk(id);
    if (!game) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Game not found" });
    }

    // Deactivate the game
    game.isDeactivated = true;
    await game.save({ transaction });

    // Log the admin activity
    await createAdminActivity(
      req,
      admin,
      "games",
      "Deactivated game",
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Game deactivated successfully",
      data: game,
    });
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to deactivate game",
      error: error.message,
    });
  }
};

exports.getActiveGames = async (req, res, next) => {
  try {
    // Fetch all games where isDeactivated is false
    const activeGames = await Games.findAll({
      where: {
        isDeactivated: false,
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
