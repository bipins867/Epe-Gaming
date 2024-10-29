const { DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the path based on your project structure

const UserNotification = sequelize.define(
  "UserNotification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value for isRead
    },
  },
  {
    tableName: "userNotifications", // Specify the table name
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = UserNotification;
