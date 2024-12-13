const { DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the path based on your project structure

const Teams = sequelize.define(
  "Teams",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    teamNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamRank: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    teamId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure each team has a unique teamId
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set to false by default
    },
    isJoinnersPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set to false by default
    },
    isAmountDistributed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Set to false by default
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isResultUpdated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "teams", // The table name in your database
    timestamps: true, // Enable createdAt/updatedAt fields
  }
);

module.exports = Teams;
