const AdminActivity = require("./User/adminActivity");
const Admin = require("./User/admins");
const Role = require("./User/role");
const UserActivity = require("./User/userActivity");
const User = require("./User/users");
const AdminAndRole = require("./AndModels/adminAndRole");

const BankDetails = require("./Wallet/bankDetails");
const Kyc = require("./Wallet/kyc");
const Referrals = require("./Wallet/referrals");
const ReferredUser = require("./Wallet/referredUsers");
const RequestWithdrawal = require("./Wallet/requestWithdrawal");
const Transaction = require("./Wallet/transaction");
const TransactionHistory = require("./Wallet/transactionHistory");
const Wallet = require("./Wallet/wallet");

const Categories = require("./EventAndGames/categories");
const Events = require("./EventAndGames/events");
const Games = require("./EventAndGames/games");

const UserGames = require("./AndModels/userGames");
const Teams = require("./EventAndGames/teams");
const TeamUserGames = require("./AndModels/teamUserGames");

const Notification = require("./Notifications/notifications");
const UserNotification = require("./AndModels/userNotifications");


const Image = require("./Images/images");
const Announcement = require("./Announcement/announcement");
const AuthToken = require("./User/authToken");

//Now Association starts here ---

User.hasMany(UserActivity);
UserActivity.belongsTo(User);

Admin.hasMany(AdminActivity);
AdminActivity.belongsTo(Admin);

User.hasOne(BankDetails);
BankDetails.belongsTo(User);

User.hasOne(Kyc);
Kyc.belongsTo(User);

User.hasOne(Wallet);
Wallet.belongsTo(User);

User.hasOne(Referrals);
Referrals.belongsTo(User);

User.hasMany(RequestWithdrawal);
RequestWithdrawal.belongsTo(User);

User.hasMany(TransactionHistory);
TransactionHistory.belongsTo(User);

User.hasMany(Transaction);
Transaction.belongsTo(User);

Referrals.hasMany(ReferredUser);
ReferredUser.belongsTo(Referrals);

//-------------

Categories.hasMany(Games);
Games.belongsTo(Categories);

Games.hasMany(Events);
Events.belongsTo(Games);

//Through Associations --

Admin.belongsToMany(Role, { through: AdminAndRole, foreignKey: "AdminId" });
Role.belongsToMany(Admin, { through: AdminAndRole, foreignKey: "RoleId" });

User.belongsToMany(Games, { through: UserGames });
Games.belongsToMany(User, { through: UserGames });

Events.hasMany(Teams);
Teams.belongsTo(Events);

UserGames.belongsToMany(Teams, { through: TeamUserGames });
Teams.belongsToMany(UserGames, { through: TeamUserGames });


User.belongsToMany(Notification, { through: UserNotification });
Notification.belongsToMany(User, { through: UserNotification });


// User.hasMany(Image)
// Image.belongsTo(User)

Games.hasMany(Image)
Image.belongsTo(Games)

User.hasMany(AuthToken)
AuthToken.belongsTo(User)