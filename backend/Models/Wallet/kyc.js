const Sequelize = require("sequelize");
const sequelize = require("../../database"); // Adjust the path to your database configuration

const Kyc = sequelize.define(
  "kyc",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    panNumber: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [10, 10], // Assuming PAN number is 10 characters
      },
    },
    panUrl: {
      type: Sequelize.STRING,
      allowNull: true, // Set to true if the URL is optional
    },
    adminMessage: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "kycs", // Optional: specify table name if different from model name
  }
);

module.exports = Kyc;
