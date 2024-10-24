const Categories = require("../../../Models/EventAndGames/categories");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const sequelize = require("../../../database");

exports.createCategories = async (req, res, next) => {
  const { title, description } = req.body;
  const admin = req.admin;

  // Validation for title and description
  if (
    !title ||
    typeof title !== "string" ||
    title.length < 3 ||
    title.length > 100
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Title must be a string between 3 and 100 characters.",
      });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.length < 5 ||
    description.length > 500
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Description must be a string between 5 and 500 characters.",
      });
  }

  const transaction = await sequelize.transaction();
  try {
    // Create the new category
    const newCategory = await Categories.create(
      {
        title,
        description,
      },
      { transaction }
    );

    // Log the admin activity
    await createAdminActivity(
      req,
      admin,
      "categories",
      "Created a new category",
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();
    return res
      .status(201)
      .json({
        success: true,
        message: "Category created successfully",
        data: newCategory,
      });
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to create category",
        error: error.message,
      });
  }
};

exports.editCategories = async (req, res, next) => {
  const { title, description, id } = req.body;
  const admin = req.admin;

  // Ensure at least one field (title or description) is provided for update
  if (!title && !description) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide a title or description to update.",
      });
  }

  // Validation for title
  if (
    title &&
    (typeof title !== "string" || title.length < 3 || title.length > 100)
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Title must be a string between 3 and 100 characters.",
      });
  }

  // Validation for description
  if (
    description &&
    (typeof description !== "string" ||
      description.length < 5 ||
      description.length > 500)
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Description must be a string between 5 and 500 characters.",
      });
  }

  const transaction = await sequelize.transaction();
  try {
    // Find the category by ID
    const category = await Categories.findByPk(id);
    if (!category) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Update the category
    if (title) category.title = title;
    if (description) category.description = description;
    await category.save({ transaction });

    // Log the admin activity
    await createAdminActivity(
      req,
      admin,
      "categories",
      "Edited category",
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();
    return res
      .status(200)
      .json({
        success: true,
        message: "Category updated successfully",
        data: category,
      });
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to update category",
        error: error.message,
      });
  }
};

exports.deactivateCategories = async (req, res, next) => {
  const { id } = req.body;
  const admin = req.admin;

  const transaction = await sequelize.transaction();
  try {
    // Find the category by ID
    const category = await Categories.findByPk(id);
    if (!category) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Deactivate the category
    category.isDeactivated = true;
    await category.save({ transaction });

    // Log the admin activity
    await createAdminActivity(
      req,
      admin,
      "categories",
      "Deactivated category",
      null,
      transaction
    );

    // Commit the transaction
    await transaction.commit();
    return res
      .status(200)
      .json({
        success: true,
        message: "Category deactivated successfully",
        data: category,
      });
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to deactivate category",
        error: error.message,
      });
  }
};

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
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve active categories",
        error: error.message,
      });
  }
};
