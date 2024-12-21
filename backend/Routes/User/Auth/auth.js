const express = require("express");
const {
  initialLoginUserAuthentication,
  initialSignuUserAuthentication,
  userAuthentication,
} = require("../../../Middleware/auth");
const {
  validateLogin,
  validateSignUp,
  validateChangePassword,
  checkValidationErrors,
} = require("../../../Middleware/validator");


const userAuthenticationController = require("../../../Controller/Users/Auth/users");
const { middlewareSendOtp,middlewareVerifyOtp } = require("../../../Middleware/otpAuthentication");

//----------Changes take time ---

const router = express.Router();

router.post(
  "/login",
  initialLoginUserAuthentication,
  middlewareSendOtp,
  middlewareVerifyOtp,
  userAuthenticationController.userLogin
);
router.post(
  "/signUp",
  validateSignUp,
  checkValidationErrors,
  initialSignuUserAuthentication,
  middlewareSendOtp,
  middlewareVerifyOtp,
  userAuthenticationController.userSignUp
);

router.post(
  "/verify",
  userAuthentication,
  userAuthenticationController.verifyUser
);

router.post(
  "/changePassword",
  userAuthentication,
  // initialResetPasswordUserAuthentication,
  // middlewareSendOtp,
  // middlewareVerifyOtp,
  validateChangePassword,
  checkValidationErrors,
  userAuthenticationController.changeUserPassword
);

router.post("/resendOtp", userAuthenticationController.userResendOtp);

//Here changes are made to upside only ---

// router.post(
//   "/verifyOtp",
//   validateSignUp,
//   checkValidationErrors,
//   userAuthenticationController.userOtpVerify
// );

// router.post(
//   "/verifyUserResetOrForgetPasswordOtp",
//   userAuthenticationController.userResetOrForgetPasswordOtpVerify
// );

// router.post(
//   "/verifyUserForgetCandidateIdOtp",
//   userAuthenticationController.userForgetCandidateIdOtpVerify
// );

module.exports = router;
