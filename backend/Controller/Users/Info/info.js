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
      profilePic: user.profileUrl ? user.profileUrl : null, // Return null if no profile picture is found
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

exports.updateProfile = async (req, res, next) => {
  const { user } = req; // Extract user info from req.user

  const profileFile = req.files[req.fileName]; // Assuming multer stores files here
  let transaction;

  try {
    // Prepare file path for saving
    const filePath = path.join(baseDir, "CustomFiles", "ProfileImages");
    const fileName = uuidv4();
    const profileUrl = saveFile(profileFile, filePath, fileName); // Save the file and get the URL

    transaction = await sequelize.transaction();

    // Update the user's profile
    const updatedUser = await req.user.update({ profileUrl }, { transaction });

    // Log the user activity
    await createUserActivity(
      req,
      user,
      "UserInfo",
      `User updated their profile, new profile URL: ${profileUrl}`,
      transaction
    );

    // Commit the transaction
    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedUser,
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
