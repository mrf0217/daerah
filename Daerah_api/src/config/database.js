const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wilayah', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
