const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Adjust the path based on your project structure

const Events = sequelize.define('Events', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  map: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  matchType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  squadType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prizePool_1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prizePool_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prizePool_3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  perKill: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  
  regCloseTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  roomPassword: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'events', // Specify the table name in camelCase
  timestamps: true, // Enable createdAt/updatedAt timestamps
});

module.exports = Events;
