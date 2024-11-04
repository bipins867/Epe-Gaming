const UserGames = require("../../../Models/AndModels/userGames");
const Image = require("../../../Models/Images/images");
const BankDetails = require("../../../Models/Wallet/bankDetails");
const Kyc = require("../../../Models/Wallet/kyc");
const Wallet = require("../../../Models/Wallet/wallet");
const { baseDir } = require("../../../importantInfo");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../../../Utils/fileHandler");
const { createUserActivity } = require("../../../Utils/activityUtils");
const sequelize = require("../../../database");
const User = require("../../../Models/User/users");
const fs = require("fs");

exports.getUserProfileInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch user information
    const user = req.user;

    // Calculate wallet balance
    const wallet = await Wallet.findOne({
      where: { UserId: userId }, // Adjust this if necessary based on your associations
      attributes: ["deposit", "cashBonus", "netWinning", "totalWinnings"],
    });

    const walletBalance =
      parseFloat(wallet.deposit) +
      parseFloat(wallet.cashBonus) +
      parseFloat(wallet.netWinning);
    const totalWinning = parseFloat(wallet.totalWinnings);

    // Fetch user game statistics
    const userGames = await UserGames.findAll({
      where: {
        UserId: userId,
      },
      attributes: ["matchPlayed", "totalKills"],
    });

    const matchesPlayed = userGames.reduce(
      (total, game) => total + game.matchPlayed,
      0
    );
    const totalKills = userGames.reduce(
      (total, game) => total + game.totalKills,
      0
    );

    const kyc = await Kyc.findOne({ where: { UserId: user.id } });
    const bankDetails = await BankDetails.findOne({
      where: { UserId: user.id },
    });

    // Compile the response data
    const userProfileInfo = {
      name: user.name,
      customerId: user.customerId,
      email: user.email,
      phone: user.phone,
      profileUrl: user.profileUrl ? user.profileUrl : null, // Return null if no profile picture is found
      walletBalance: walletBalance,
      kycStatus: kyc ? kyc.status : null,
      bankStatus: bankDetails ? bankDetails.status : null,
    };
    const statusInfo = {
      matchesPlayed: matchesPlayed,
      totalKills: totalKills,
      totalWinning: totalWinning,
    };

    // Send response
    res.status(200).json({
      success: true,
      profileInfo: userProfileInfo,
      statusInfo,
    });
  } catch (error) {
    console.error("Error fetching user profile info:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
    next(error);
  }
};

exports.updateProfileImage = async (req, res, next) => {
  const { user } = req; // Extract user info from req.user
  const profileFile = req.files[req.fileName][0]; // Assuming multer stores files here
  let transaction;

  try {
    const commonPath = "CustomFiles";
    const pathCategory = "ProfileImages";

    // Prepare file path for saving
    const filePath = path.join(baseDir, commonPath, pathCategory);
    const fileName = uuidv4();

    // Save the new file and get the URL
    let newProfileUrl = saveFile(profileFile, filePath, fileName);
    newProfileUrl = path.join(commonPath, pathCategory, newProfileUrl);

    // Store old profile URL for deletion after update
    const oldProfileUrl = user.profileUrl;

    // Start a transaction
    transaction = await sequelize.transaction();

    // Update user's profile with the new profile URL
    await user.update({ profileUrl: newProfileUrl }, { transaction });

    // Log user activity
    await createUserActivity(
      req,
      user,
      "UserInfo",
      `User updated their profile picture. New profile URL: ${newProfileUrl}`,
      transaction
    );

    // Commit the transaction
    await transaction.commit();

    // Delete old profile picture if it exists
    if (oldProfileUrl) {
      const oldProfilePath = path.join(baseDir, oldProfileUrl);
      fs.unlink(oldProfilePath, (err) => {
        if (err)
          console.error(
            `Error deleting old profile picture for user -> : ${req.user.id}->\n`,
            err
          );
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        id: user.id,
        profileUrl: newProfileUrl,
      },
    });
  } catch (error) {
    // Rollback transaction in case of error
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error updating profile:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
      error: error.message,
    });
  }
};

exports.updateProfileInfo = async (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user.id;
  let transaction;

  try {
    // Ensure at least one field is provided
    if (!email && !name) {
      return res.status(400).json({
        success: false,
        message: "Please provide either email or name to update.",
      });
    }

    // Check if email already exists (if email is provided)
    if (email) {
      const existingUser = await User.findOne({
        where: { email },
        attributes: ["id"],
      });

      // If email exists and belongs to a different user, throw an error
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({
          success: false,
          message: "The email is already in use by another user.",
        });
      }
    }

    // Find the user
    const user = req.user;

    // Start transaction
    transaction = await sequelize.transaction();

    // Track the original values for logging purposes
    const originalData = { email: user.email, name: user.name };

    // Update only the fields provided in the request
    if (email) user.email = email;
    if (name) user.name = name;

    // Save the changes
    await user.save({ transaction });

    // Log user activity
    const changes = [];
    if (email && originalData.email !== email) {
      changes.push(`email changed from '${originalData.email}' to '${email}'`);
    }
    if (name && originalData.name !== name) {
      changes.push(`name changed from '${originalData.name}' to '${name}'`);
    }

    await createUserActivity(
      req,
      user,
      "UserInfo",
      `User updated profile information: ${changes.join(", ")}`,
      transaction
    );

    // Commit the transaction
    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Profile information updated successfully.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    // Rollback transaction in case of error
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error updating profile information:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating profile information.",
      error: error.message,
    });
  }
};
