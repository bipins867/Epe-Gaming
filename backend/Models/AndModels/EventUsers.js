const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const EventUsers = sequelize.define(
  "EventUsers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    tableName: "eventUsers",
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = EventUsers;
