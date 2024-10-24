const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Adjust the path based on your project structure

const Games = sequelize.define('Games', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  urlImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeactivated:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  }
}, {
  tableName: 'games', // Specify the table name in camelCase
  timestamps: true, // Enable createdAt/updatedAt timestamps
});

module.exports = Games;
