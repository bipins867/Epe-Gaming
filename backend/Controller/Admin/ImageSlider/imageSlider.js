const Games = require("../../../Models/EventAndGames/games");
const ImageSlider = require("../../../Models/ImageSlider/ImageSlider");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const path = require("path");
const sequelize = require("../../../database");
const { baseDir } = require("../../../importantInfo");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../../../Utils/fileHandler");

exports.addImage = async (req, res, next) => {
  
  let transaction;
  const admin = req.admin;
  try {
    const { title, type, gameId } = req.body;

    // Check if image file exists
    const imageFile = req.files && req.fileName && req.files[req.fileName][0];
    if (!imageFile) {
      return res.status(400).json({ error: "Image file is required." });
    }
    let gameExists;
    // Validate gameId if provided
    if (gameId) {
      gameExists = await Games.findByPk(gameId);
      if (!gameExists) {
        return res.status(404).json({ error: "Game not found." });
      }
    }
    const commonPath = "CustomFiles";
    const pathCategory = "ImageSlider";

    const filePath = path.join(baseDir, commonPath, pathCategory);
    const fileName = uuidv4();
    const urlImage = saveFile(imageFile, filePath, fileName);
    const imageUrl = path.join(commonPath, pathCategory, urlImage);
    // Save the file and get the URL

    transaction = await sequelize.transaction();

    // Save data to the database
    const imageSlider = await ImageSlider.create(
      {
        title,
        imageUrl,
        type,
        GameId: gameId,
        isActive: true, // Default to active
      },
      { transaction }
    );

    // Create admin activity log
    await createAdminActivity(
      req,
      admin,
      "imageSlider",
      `Added new image to slider: ${title || "No Title"}`,
      null,
      transaction
    );

    // Commit transaction
    await transaction.commit();

    res
      .status(201)
      .json({ message: "Image added successfully.", data: imageSlider });
  } catch (error) {
    // Rollback transaction in case of an error
    if (transaction) await transaction.rollback();
    console.error("Error adding image to slider:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

// Delete Image function
exports.deleteImage = async (req, res, next) => {
  let transaction;
  try {
    const { imageId } = req.body;

    // Find the image by ID
    const image = await ImageSlider.findByPk(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }

    // Start transaction
    transaction = await sequelize.transaction();

    // Remove the image from the file system
    const filePath = path.join(baseDir, image.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the image record from the database
    await image.destroy({ transaction });

    // Log the deletion action
    await createAdminActivity(
      req,
      req.admin,
      "imageSlider",
      `Deleted image: ${image.title || "No Title"}`,
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();

    res.status(200).json({ message: "Image deleted successfully." });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error deleting image:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

// Update Image Status function
exports.updateImageStatus = async (req, res, next) => {
  let transaction;

  try {
    const { isActive, imageId } = req.body;

    // Validate isActive
    if (typeof isActive !== "boolean") {
      return res.status(400).json({ error: "Invalid status value." });
    }

    // Find the image by ID
    const image = await ImageSlider.findByPk(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }

    transaction = await sequelize.transaction();
    // Update the image status
    image.isActive = isActive;
    await image.save({ transaction });

    // Log the update action
    await createAdminActivity(
      req,
      req.admin,
      "imageSlider",
      `Updated status of  image: ${image.title || "No Title"}`,
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();

    res
      .status(200)
      .json({ message: "Image status updated successfully.", data: image });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error updating image status:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

// Get All Images function
exports.getAllImages = async (req, res, next) => {
  try {
    const { type, isActive, gameId } = req.body;

    // Build query filter
    const where = {};
    if (type) where.type = type;
    if (isActive !== undefined && isActive != null) where.isActive = isActive;

    if (gameId !== undefined && gameId !== null) where.GameId = gameId;

    // Fetch all images with optional filters
    const images = await ImageSlider.findAll({ where });

    res
      .status(200)
      .json({ message: "Images fetched successfully.", data: images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};
