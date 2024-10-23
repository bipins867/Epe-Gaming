const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Adjust the path based on your project structure

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  deposit: {
    type: DataTypes.FLOAT, // Use FLOAT for decimal values
    allowNull: false,
  },
  cashBonus: {
    type: DataTypes.FLOAT, // Use FLOAT for decimal values
    allowNull: false,
  },
  netWinning: {
    type: DataTypes.FLOAT, // Use FLOAT for decimal values
    allowNull: false,
  },
}, {
  tableName: 'wallets', // Specify the table name in camelCase
  timestamps: true, // Enable createdAt/updatedAt timestamps
});

module.exports = Wallet;
