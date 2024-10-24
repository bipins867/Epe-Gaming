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
  },
  {
    tableName: "teamUserGames",
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = TeamUserGames;
