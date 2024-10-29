const { DataTypes } = require("sequelize");
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
      defaultValue:0
    },
    cashBonus: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
      defaultValue:0
    },
    netWinning: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
      defaultValue:0
    },
    kills:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    }
  },
  {
    tableName: "teamUserGames",
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = TeamUserGames;
