const { verify } = require("crypto");
const sequelize = require("../../../database");
const Kyc = require("../../../Models/Wallet/kyc");
const { createUserActivity } = require("../../../Utils/activityUtils");
const { verifyPAN, isNameMatching } = require("../../../Utils/fidypay");

exports.getKycDetails = async (req, res, next) => {
  try {
    const UserId = req.user.id; // Assuming the user ID is available in the request object

    // Find KYC details based on UserId (assuming a UserId column exists in Kyc model)
    const kycDetails = await Kyc.findOne({ where: { UserId } });

    if (!kycDetails) {
      return res.status(404).json({
        success: false,
        message: "KYC details not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "KYC details retrieved successfully",
      data: kycDetails,
    });
  } catch (error) {
    console.error("Error fetching KYC details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching KYC details",
    });
  }
};

exports.updateKycDetails = async (req, res, next) => {
  let t;

  try {
    const UserId = req.user.id; // Assuming the user ID is available in the request object
    const { panNumber } = req.body;

    // Validate PAN number
    if (
      !panNumber ||
      typeof panNumber !== "string" ||
      panNumber.length !== 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid PAN number. It must be exactly 10 characters.",
      });
    }

    const existingPan=await Kyc.findOne({where:{panNumber}})

    if(existingPan){
      return res.status(401).json({
        success: false,
        message: "This PAN is already registerd with another user.",
      });
    }

    // Find the KYC record for the user
    let kycDetails = await Kyc.findOne({ where: { UserId } });

    if (kycDetails) {
      if (kycDetails.status == "verified") {
        res.status(401).json({ message: "Kyc details are already updated!" });
      }
    }

    const response = await verifyPAN(panNumber);

    const dataResponse = response.data;

    if (dataResponse.status === "FAILED") {
      return res.status(404).json({ error: dataResponse.description });
    }

    if (!isNameMatching(dataResponse.name, req.user.name)) {
      return res.status(403).json({ error: "Name Mismatch in PAN!" });
    }

    
    t = await sequelize.transaction();

    if (!kycDetails) {
      // If no KYC record exists, create a new one
      kycDetails = await Kyc.create(
        {
          UserId,
          panNumber,
          status: "verified", // Set status to 'verified'
        },
        { transaction: t }
      );
    } else {
      // If KYC record exists, update the PAN number and status
      await kycDetails.update(
        {
          panNumber,
          status: "verified", // Update status to 'verified'
        },
        { transaction: t }
      );
    }

    // Log user activity (assuming createUserActivity logs actions in a user activities table)
    await createUserActivity(
      req,
      req.user,
      "KYC",
      "Updated KYC details and verified PAN",
      t
    );

    // Commit the transaction
    await t.commit();

    return res.status(200).json({
      success: true,
      message: "KYC details updated and verified successfully",
      data: kycDetails,
    });
  } catch (error) {
    if (t) {
      await t.rollback(); // Rollback the transaction in case of error
    }
    console.error("Error updating KYC details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating KYC details",
    });
  }
};
