const express = require("express");

const imageController = require("../../../Controller/Admin/Images/images");

const { fileHandlerRouter } = require("../../FileHandler/fileHandler");

const router = express.Router();

router.get("/get", imageController.getImages);
router.post("/delete", imageController.deleteImage);
router.post("/add", fileHandlerRouter("image", 0.2), imageController.addImage);

module.exports = router;
