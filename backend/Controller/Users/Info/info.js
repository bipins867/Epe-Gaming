const UserGames = require("../../../Models/AndModels/userGames");
const Image = require("../../../Models/Images/images");
const BankDetails = require("../../../Models/Wallet/bankDetails");
const Kyc = require("../../../Models/Wallet/kyc");
const Wallet = require("../../../Models/Wallet/wallet");



exports.getUserProfileInfo = async (req, res, next) => {
    try {
      const userId = req.user.id;
  
      // Fetch user information
      const user = req.user;
  
      // Fetch profile picture
      const profilePic = await Image.findOne({
        where: {
          type: 'profilePic',
          UserId: userId,
        },
        attributes: ['imageUrl'], // Assuming 'url' is the field for image URL
      });
  
      // Calculate wallet balance
      const wallet = await Wallet.findOne({
        where: { UserId: userId }, // Adjust this if necessary based on your associations
        attributes: ['deposit', 'cashBonus', 'netWinning', 'totalWinnings'],
      });
  
      const walletBalance = parseFloat(wallet.deposit) + parseFloat(wallet.cashBonus) + parseFloat(wallet.netWinning);
      const totalWinning = parseFloat(wallet.totalWinnings);
  
      // Fetch user game statistics
      const userGames = await UserGames.findAll({
        where: {
          UserId: userId,
        },
        attributes: ['matchPlayed', 'totalKills'],
      });
  
      const matchesPlayed = userGames.reduce((total, game) => total + game.matchPlayed, 0);
      const totalKills = userGames.reduce((total, game) => total + game.totalKills, 0);

      const kyc=await Kyc.findOne({where:{UserId:user.id}})
      const bankDetails=await BankDetails.findOne({where:{UserId:user.id}})
  
      // Compile the response data
      const userProfileInfo = {
        name: user.name,
        customerId: user.customerId,
        email:user.email,
        phone:user.phone,
        profilePic: profilePic ? profilePic.url : null, // Return null if no profile picture is found
        walletBalance: walletBalance,
        matchesPlayed: matchesPlayed,
        totalKills: totalKills,
        totalWinning: totalWinning,
        kycStatus:kyc?kyc.status:null,
        bankStatus:bankDetails?bankDetails.status:null,
      };
  
      // Send response
      res.status(200).json({
        success: true,
        data: userProfileInfo,
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