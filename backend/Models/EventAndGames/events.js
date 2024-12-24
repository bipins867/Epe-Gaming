const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database"); // Adjust the path based on your project structure

const Events = sequelize.define(
  "Events",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    entryFee: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    map: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noOfPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    matchType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    version: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "TPP",
    },
    squadType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prizePool_1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue:0
    },
    prizePool_2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue:0
    },
    prizePool_3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue:0
    },
    perKill: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue:0
    },
    regStartTime:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    regCloseTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roomPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"upcoming"
    },
    remark:{
      type:Sequelize.STRING
    },
    isResultDeclared: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isRunning: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDeactivated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "events", // Specify the table name in camelCase
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = Events;
