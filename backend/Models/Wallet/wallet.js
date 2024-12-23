const { DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the path based on your project structure

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isFundedFirst: {
      type: DataTypes.FLOAT,
      defaultValue: false,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
    },
    unclearedDeposit: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
    },
    cashBonus: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
    },
    unclearedCashBonus: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
    },

    netWinning: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
    },
    unclearedNetWinning: {
      type: DataTypes.FLOAT, // Use FLOAT for decimal values
      allowNull: false,
    },
    totalWinnings: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "wallets", // Specify the table name in camelCase
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = Wallet;
