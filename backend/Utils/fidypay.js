const axios = require("axios");

exports.verifyPAN = async (panNumber) => {
  const baseUrl = process.env.FIDYPAY_BASE_URL;
  const url = `https://${baseUrl}/ekyc/pan/fetchPanV2/${panNumber}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.FIDYPAY_AUTHORIZATION,
    "Client-Id": process.env.FIDYPAY_CLIENT_ID,
    "Client-Secret": process.env.FIDYPAY_CLIENT_SECRET,
  };

  const response = await axios.post(url, {}, { headers });

  return response;
};


exports. isNameMatching=(fullName, name)=> {
    // Normalize both inputs by trimming and converting to lowercase
    const normalizedFullName = fullName.trim().toLowerCase();
    const normalizedName = name.trim().toLowerCase();

    // Split names into parts, ignoring extra spaces
    const fullNameParts = normalizedFullName.split(/\s+/);
    const nameParts = normalizedName.split(/\s+/);

    // Check if both parts match in content and order
    if (fullNameParts.length !== nameParts.length) return false;

    for (let i = 0; i < fullNameParts.length; i++) {
        if (fullNameParts[i] !== nameParts[i]) {
            return false;
        }
    }

    return true;
}