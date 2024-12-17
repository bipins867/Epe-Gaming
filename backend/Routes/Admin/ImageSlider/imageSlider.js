const express = require("express");

const imageSlidersController = require("../../../Controller/Admin/ImageSlider/imageSlider");
const { fileHandlerRouter } = require("../../FileHandler/fileHandler");

const router = express.Router();

router.post(
  "/addImage",
  fileHandlerRouter("image", 5),
  imageSlidersController.addImage
);
router.post("/deleteImage", imageSlidersController.deleteImage);
router.post("/updateImageStatus", imageSlidersController.updateImageStatus);
router.post("/getImages", imageSlidersController.getAllImages);

module.exports = router;
