const User = require("../../../Models/User/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  otpStore,
  sendOtpAccountVerifyMessage,
  sendLoginOtpMessage,
  sendSignUpOtpMessage,
} = require("../../../Utils/MailService");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../../../database");
const { createUserActivity } = require("../../../Utils/activityUtils");
const Referrals = require("../../../Models/Wallet/referrals");
const ReferredUser = require("../../../Models/Wallet/referredUsers");
const Wallet = require("../../../Models/Wallet/wallet");
const BankDetails = require("../../../Models/Wallet/bankDetails");
const Kyc = require("../../../Models/Wallet/kyc");
const { generateRandomId } = require("../../../Utils/utils");

exports.userSignUp = async (req, res, next) => {
  let transaction; // Start the transaction

  try {
    const { name, email, phone, password, byReferallId } = req.body;

    // Find the last candidateId and increment by 1

    const user=await User.findOne({where:{phone}})
    if(user){
      return  res.status(403).json({message:"User already exists!"})
    }
    const newCustomerId = generateRandomId();
    transaction = await sequelize.transaction();
    // Check if byReferallId exists and is valid
    if (byReferallId && byReferallId.trim() !== "") {
      const referral = await Referrals.findOne({
        where: { referralId: byReferallId },
        // transaction,
      });

      if (!referral) {
        // await transaction.rollback(); // Rollback transaction
        return res.status(400).send({ message: "Invalid referral ID." });
      }

      // Update referral statistics
      await referral.increment("noOfReferrals", { by: 1, transaction });
      await referral.increment("pendingReferrals", { by: 1, transaction });

      // Create a new ReferredUser associated with the valid referral
      await ReferredUser.create(
        {
          candidateId: newCustomerId,
          name,
          status: "pending",
          dateOfJoining: new Date(),
          ReferralId: referral.id, // Associate with the referral
        },
        { transaction }
      );
    }

    // OTP is valid, proceed with the sign-up
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user, ensuring employeeId is empty string if null
    const newUser = await User.create(
      {
        customerId: newCustomerId,
        name,
        email: email || null, // Email optional
        phone,
        password: hashedPassword,
        byReferallId: byReferallId || null, // Store referral ID if present
      },
      { transaction }
    );

    // Create a new referral for the new user with a UUID
    const newReferral = await Referrals.create(
      {
        referralId: uuidv4(), // Generate a UUID for the referral ID
        noOfReferrals: 0, // Initially 0
        pendingReferrals: 0, // Initially 0
        UserId: newUser.id, // Associate the referral with the new user
      },
      { transaction }
    );

    await Wallet.create(
      {
        deposit: 0,
        cashBonus: 0,
        netWinning: 0,
        unclearedDeposit: 0,
        unclearedNetWinning: 0,
        UserId: newUser.id,
      },
      { transaction }
    );

    await BankDetails.create({ UserId: newUser.id }, { transaction });

    await Kyc.create(
      { customerId: newUser.customerId, UserId: newUser.id },
      { transaction }
    );

    await createUserActivity(
      req,
      newUser,
      "auth",
      "SignUp Successfull!",
      transaction
    );

    // If everything is successful, commit the transaction
    await transaction.commit();

    //sendRegistrationTemplate(phone, newCustomerId);

    return res.status(201).json({
      message: "SignUp Successful",
      customerId:newUser.customerId,
    });
  } catch (err) {
    // If any error occurs, rollback the transaction
    console.log(err);
    if (transaction) {
      await transaction.rollback();
    }
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

exports.userLogin = async (req, res, next) => {
  const { phone, password } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    // Compare the provided password with the stored password hash
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Internal server error. Please try again later." });
      }

      const expiresIn = process.env.NODE_ENV === "testing" ? "2d" : "5m";

      if (isMatch) {
        // Generate a JWT token
        const token = jwt.sign(
          { name: user.name, id: user.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: expiresIn }
        );

        // Log successful login attempt in UserActivity
        await createUserActivity(req, user, "auth", "Login Successfull!");
        return res.status(200).json({
          status: "Login Successful",
          token,
          userId: user.id,
        });
      } else {
        // Log unsuccessful login attempt due to incorrect password in UserActivity
        await createUserActivity(
          req,
          user,
          "auth",
          "Login failed: Incorrect password !"
        );

        return res.status(401).json({ error: "Invalid Password" });
      }
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    // Verify the signUpToken

    const { phone } = req.payload;

    const user = await User.findOne({
      where: {
        phone,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await createUserActivity(
      req,
      user,
      "auth",
      "Forget Customer Id attempted!"
    );

    return res.status(200).json({
      candidateId: user.candidateId,
      phone: user.phone,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Error during OTP resend:", err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

exports.changeUserPassword = async (req, res, next) => {
  const { phone } = req.payload;
  const { password } = req.body;

  let transaction;

  try {
    // Find the user by phone number
    const user = await User.findOne({
      where: { phone },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!password) {
      return res.status(400).send({ message: "Invalid Password!" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword; // Assuming 'password' is a field in your User model

    transaction = await sequelize.transaction();

    await user.save({ transaction }); // Save the updated user record

    await createUserActivity(
      req,
      user,
      "auth",
      "Change password successfull!",
      transaction
    );

    transaction.commit();
    // Optionally, you can return a success message
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("Error during password change:", err);
    if (transaction) {
      await transaction.rollback();
    }
    // Handle specific error cases
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

exports.userResendOtp = async (req, res, next) => {
  const { otpAuthenticationToken, otpType } = req.body;

  try {
    // Verify the otpAuthenticationToken
    const payload = jwt.verify(
      otpAuthenticationToken,
      process.env.JWT_SECRET_KEY
    );
    const { phone } = payload;

    // Check if the phone exists in the otpStore
    if (!otpStore[phone]) {
      return res.status(400).json({ message: "OTP expired or invalid." });
    }

    if (otpStore[phone].count <= 0) {
      return res.status(402).json({ message: "Otp trying limit exceed!" });
    }

    // Generate a new OTP for the phone
    const newOtp = crypto.randomInt(100000, 999999).toString();
    otpStore[phone] = { otp: newOtp, count: otpStore[phone].count - 1 };

    if (otpType === "forgetCandidateId" || otpType === "resetPassword") {
      sendOtpAccountVerifyMessage(phone, newOtp);
    } else if (otpType === "login") {
      sendLoginOtpMessage(phone, newOtp);
    } else if (otpType === "signUp") {
      sendSignUpOtpMessage(phone, newOtp);
    } else {
      return res.status(404).json({ message: "Invalid Otp Type!" });
    }

    // Refresh OTP expiration time to 5 more minutes
    setTimeout(() => {
      delete otpStore[phone];
    }, 5 * 60 * 1000);

    return res
      .status(200)
      .json({ message: "OTP resent successfully to phone." });
  } catch (err) {
    console.error("Error during OTP resend:", err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};
