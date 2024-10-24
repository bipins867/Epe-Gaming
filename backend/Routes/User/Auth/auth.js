const express = require("express");

const router = express.Router();

router.post(
  "/login",
  userLoginLimiter,
  initialLoginUserAuthentication,
  middlewareSendOtp,
  middlewareVerifyOtp,
  userAuthenticationController.userLogin
);
router.post(
  "/signUp",
  userSignUpLimiter,
  validateSignUp,
  checkValidationErrors,
  initialSignuUserAuthentication,
  middlewareSendOtp,
  middlewareVerifyOtp,
  userAuthenticationController.userSignUp
);

router.post(
  "/changeUserPassword",
  userAuthLimiter,
  initialResetPasswordUserAuthentication,
  middlewareSendOtp,
  middlewareVerifyOtp,
  validateChangePassword,
  checkValidationErrors,
  userAuthenticationController.changeUserPassword
);

router.post(
  "/getUserInfo",
  userAuthLimiter,
  initialForgetCustomerIdUserAuthentication,
  middlewareSendOtp,
  middlewareVerifyOtp,
  userAuthenticationController.getUserInfo
);

router.post(
  "/activateAccount",
  userAuthLimiter,
  middlewareSendOtp,
  middlewareVerifyOtp,
  userAuthenticationController.activateUserAccount
);



router.post("/resendOtp",userResendOtpimiter, userAuthenticationController.userResendOtp);

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
