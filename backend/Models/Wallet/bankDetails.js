const { DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Make sure to replace with your actual sequelize instance

const BankDetails = sequelize.define(
  "BankDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountHolderName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ifscCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    upiId: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "bankDetails",
    timestamps: true, // Adds 'createdAt' and 'updatedAt' automatically
  }
);

module.exports = BankDetails;
