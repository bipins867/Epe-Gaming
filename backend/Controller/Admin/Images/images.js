const Image = require("../../../Models/Images/images");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const sequelize=require('../../../database')
const {Op}=require('sequelize');
const { baseDir } = require("../../../importantInfo");
const path=require('path')
const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../../../Utils/fileHandler");


// 1. Get Images by Type
exports.getImages = async (req, res, next) => {
  const { type } = req.body;

  try {
    const images = await Image.findAll({
      where: { type },
    });

    return res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching images:", err);
    return res.status(500).json({ message: "Failed to fetch images." });
  }
};

// 2. Delete Image by ID
exports.deleteImage = async (req, res, next) => {
  const { id } = req.body;
  const { admin } = req;

  let transaction;
  try {
    

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found!" });
    }

    transaction = await sequelize.transaction();
    
    await image.destroy({ transaction });

    await createAdminActivity(
      req,
      admin,
      "Delete Image",
      `${admin.userName} deleted image with ID: ${id}`,
      null,
      transaction
    );

    await transaction.commit();
    return res.status(200).json({ message: "Image deleted successfully." });
  } catch (err) {
    console.error("Error deleting image:", err);
    if (transaction) await transaction.rollback();
    return res.status(500).json({ message: "Failed to delete image." });
  }
};

// 3. Add Image
exports.addImage = async (req, res, next) => {
  const { type } = req.body;
  const { admin } = req;
  const imageFile = req.files[req.fileName]; // Assuming multer stores files here

  let transaction;
  try {

    const filePath=path.join(baseDir,'CustomFiles','SliderImages')
    const fileName=uuidv4();
    
    const url=saveFile(imageFile,filePath,fileName);

    transaction = await sequelize.transaction();

    // Assuming `path` is where multer saves the file location
    const newImage = await Image.create(
      {
        type,
        path: url,
        userId: admin.id // If the image is linked to admin; if not, adjust as needed
      },
      { transaction }
    );

    await createAdminActivity(
      req,
      admin,
      "Add Image",
      `${admin.userName} added a new image with type: ${type}`,
      null,
      transaction
    );

    await transaction.commit();
    return res.status(201).json({ message: "Image added successfully.", image: newImage });
  } catch (err) {
    console.error("Error adding image:", err);
    if (transaction) await transaction.rollback();
    return res.status(500).json({ message: "Failed to add image." });
  }
};
