const sequelize = require("../../../database");
const BankDetails = require("../../../Models/Wallet/bankDetails");
const { createUserActivity } = require("../../../Utils/activityUtils");

exports.getBankDetails = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in the request object

    // Find the bank details for the user
    const bankDetails = await BankDetails.findOne({
      where: { userId: userId },
    });

    if (!bankDetails) {
      return res.status(404).json({
        success: false,
        message: "No bank details found for the user",
      });
    }

    return res.status(200).json({
      success: true,
      data: bankDetails,
    });
  } catch (error) {
    console.error("Error fetching bank details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving bank details",
    });
  }
};

exports.updateBankDetails = async (req, res, next) => {
  let t;

  try {
    const userId = req.user.id; // Assuming the user ID is available in the request object
    const { bankName, accountHolderName, accountNumber, ifscCode, upiId } =
      req.body;

    // Check if at least one set of details (bank details or UPI ID) is provided
    const hasBankDetails =
      bankName && accountHolderName && accountNumber && ifscCode;
    const hasUpiDetails = upiId && typeof upiId === "string";

    if (!hasBankDetails && !hasUpiDetails) {
      return res.status(400).json({
        error: "Either complete bank details or a UPI ID must be provided.",
      });
    }

    // Validate bank details if provided
    if (hasBankDetails) {
      if (typeof bankName !== "string" || bankName.trim().length === 0) {
        return res.status(400).json({ error: "Invalid bank name" });
      }

      if (
        typeof accountHolderName !== "string" ||
        accountHolderName.trim().length === 0
      ) {
        return res.status(400).json({ error: "Invalid account holder name" });
      }

      if (!/^\d{9,18}$/.test(accountNumber)) {
        return res.status(400).json({
          error: "Invalid account number. Must be between 9 and 18 digits.",
        });
      }

      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
        return res.status(400).json({
          error:
            "Invalid IFSC code. Must follow standard format (e.g., ABCD0123456).",
        });
      }
    }

    // Validate UPI ID if provided
    if (hasUpiDetails && typeof upiId !== "string") {
      return res.status(400).json({ error: "Invalid UPI ID" });
    }
    t = await sequelize.transaction();
    // Check if bank details already exist for the user
    let bankDetails = await BankDetails.findOne({ where: { UserId: userId } });

    if (!bankDetails) {
      // If no bank details exist, create new ones
      bankDetails = await BankDetails.create(
        {
          UserId: userId,
          bankName: hasBankDetails ? bankName : null,
          accountHolderName: hasBankDetails ? accountHolderName : null,
          accountNumber: hasBankDetails ? accountNumber : null,
          ifscCode: hasBankDetails ? ifscCode : null,
          upiId: hasUpiDetails ? upiId : null,
        },
        { transaction: t }
      );
    } else {
      // Update existing bank details
      await bankDetails.update(
        {
          bankName: hasBankDetails ? bankName : bankDetails.bankName,
          accountHolderName: hasBankDetails
            ? accountHolderName
            : bankDetails.accountHolderName,
          accountNumber: hasBankDetails
            ? accountNumber
            : bankDetails.accountNumber,
          ifscCode: hasBankDetails ? ifscCode : bankDetails.ifscCode,
          upiId: hasUpiDetails ? upiId : bankDetails.upiId,
        },
        { transaction: t }
      );
    }

    // Log user activity (assuming createUserActivity logs actions in a user activities table)
    await createUserActivity(
      req,
      req.user,
      "BankDetails",
      "Updated bank details",
      t
    );

    // Commit the transaction
    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Bank details updated successfully",
      data: bankDetails,
    });
  } catch (error) {
    if (t) {
      await t.rollback(); // Rollback the transaction in case of error
    }
    console.error("Error updating bank details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating bank details",
    });
  }
};
