const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Adjust the path based on your project structure

const Teams = sequelize.define('Teams', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure each team has a unique teamId
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Set to false by default
  },
  isJoinnersPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Set to false by default
  },
  isAmountDistributed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Set to false by default
  },
}, {
  tableName: 'teams', // The table name in your database
  timestamps: true, // Enable createdAt/updatedAt fields
});

module.exports = Teams;
