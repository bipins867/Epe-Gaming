const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Adjust the path based on your project structure

const EventUserGames = sequelize.define('EventUserGames', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isLeader: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isJoinnersPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAmountDistributed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'eventUserGames', // Specify the table name in camelCase
  timestamps: true, // Enable createdAt/updatedAt timestamps
});

module.exports = EventUserGames;
