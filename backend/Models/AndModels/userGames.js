const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Adjust the path based on your project structure

const UserGames = sequelize.define('UserGames', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  playerId: {
    type: DataTypes.STRING, // Assuming playerId corresponds to User id
    allowNull: true,
    
  },
  playerName: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  matchPlayed:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
  },
  totalKills:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
  },
  totalWinning:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
  }
}, {
  tableName: 'userGames', // Specify the table name in camelCase
  timestamps: true, // Enable createdAt/updatedAt timestamps
});

module.exports = UserGames;
