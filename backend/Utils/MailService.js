require("dotenv").config();
const axios = require("axios");

// In app.js or a similar central file
exports.otpStore = {}; // Object to hold OTP data in memory


exports.generateOtp = (min, max) => {
  const data = Math.random() * (max - min) + min;
  return parseInt(data);
};

async function sendSms(mobileNumber, message) {
  if (process.env.NODE_ENV !== "testing") {
    const apikey = process.env.SMS_API_KEY;
    const senderid = process.env.SMS_SENDER_ID;
    const url = `http://text.instavaluesms.in/V2/http-api.php?apikey=${apikey}&senderid=${senderid}&number=${mobileNumber}&message=${message}&format=json`;
    const response = await axios.get(url);
    // console.log(url)
    // console.log("*************")
    // console.log(response.data);
    return response;
  }
}


exports.sendSignUpOtpMessage = async (mobileNumber, otp) => {
  let message = process.env.SMS_OTP_SIGNUP;
  //console.log(message);
  message = message.replace("{otp}", otp);

  return await sendSms(mobileNumber, message);
};

exports.sendOtpAccountVerifyMessage = async (mobileNumber, otp) => {
  let message = process.env.SMS_OTP_VERIFY;
  message = message.replace("{otp}", otp);
  return await sendSms(mobileNumber, message);
};

exports.sendLoginOtpMessage = async (mobileNumber, otp) => {
  let message = process.env.SMS_OTP_LOGIN;
  message = message.replace("{otp}", otp);
  return await sendSms(mobileNumber, message);
};
