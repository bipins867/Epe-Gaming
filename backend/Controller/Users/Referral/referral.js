const sequelize = require("../../../database");
const { createUserActivity } = require("../../../Utils/activityUtils");
const User = require("../../../Models/User/users");
const Referrals = require("../../../Models/Wallet/referrals");
const ReferredUser = require("../../../Models/Wallet/referredUsers");

exports.getUserReferallInfo = async (req, res, next) => {
  try {
    
    
    // Find the referral using the referralId
    const referral = await Referrals.findOne({
      where: { UserId: req.user.id }, // Assuming 'id' is the key in your Referrals model
      include: [{ model: User, attributes: ["customerId", "name"] }], // Join with User to get candidateId and name
    });

    // If no referral found, return an error
    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    // Extract user details
    const user = referral.User; // Get associated User from the referral

    // Return the candidateId and name of the user
    return res.status(200).json({
      candidateId: user.candidateId,
      name: user.name,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.getReferalInfo = async (req, res, next) => {
  try {
    const userId = req.user.id; // Get the user ID from the request

    // Fetch the referral information associated with the user
    const referralInfo = await Referrals.findOne({
      where: { UserId: userId }, // Assuming there's a UserId in the Referrals table
      include: [{ model: ReferredUser }], // Include the referred users
    });

    // Check if referral information exists
    if (!referralInfo) {
      return res
        .status(404)
        .json({ message: "No referral information found." });
    }
  
    

    // Return the referral information along with the referred users
    return res.status(200).json({
      referralCode:referralInfo.referralId,
      numberOfReferrals: referralInfo.noOfReferrals,
      pendingReferrals: referralInfo.pendingReferrals,
      referredUsers: referralInfo.ReferredUsers, // List of referred users
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};
