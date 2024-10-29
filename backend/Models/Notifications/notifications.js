const { DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the path based on your project structure

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'all', // Default value for type
    },
  },
  {
    tableName: "notifications", // Specify the table name
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = Notification;
