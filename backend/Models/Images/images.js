// models/Image.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the path as per your project structure

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming type cannot be null
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming imageUrl cannot be null
      defaultValue:''
    },
  },
  {
    tableName: "images", // Specify the table name
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = Image;
