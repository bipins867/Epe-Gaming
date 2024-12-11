const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const ImageSlider = sequelize.define('ImageSlider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Primary key',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Title of the image slider',
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
    comment: 'URL of the image',
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Type of the image slider (e.g., banner, carousel)',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'Indicates whether the slider is active',
  },
}, {
  tableName: 'imageSliders', // Specify the table name
  timestamps: true, // Enable createdAt and updatedAt fields
  comment: 'Table for managing image sliders',
});

module.exports = ImageSlider;
