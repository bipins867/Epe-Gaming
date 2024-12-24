const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database");

const TeamUserGames = sequelize.define(
  "TeamUserGames",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isLeader: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deposit: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
      defaultValue: 0,
    },
    cashBonus: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
      defaultValue: 0,
    },
    netWinning: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
      defaultValue: 0,
    },
    kills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    winningBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    points: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    isChallengeCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    playerId: {
      type: DataTypes.STRING, // Assuming playerId corresponds to User id
      allowNull: true,
    },
    playerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "teamUserGames",
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = TeamUserGames;
