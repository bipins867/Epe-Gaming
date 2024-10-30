const express = require("express");

const categoriesController=require('../../../Controller/Admin/Categories/categories');
const { fileHandlerRouter } = require("../../FileHandler/fileHandler");

const router = express.Router();

router.post('/create',fileHandlerRouter("image", 0.1),categoriesController.createCategories)
router.post('/edit',categoriesController.editCategories)
router.post('/deactivate',categoriesController.deactivateCategories)
router.post('/getActive',categoriesController.getActiveCategories)

module.exports = router;
