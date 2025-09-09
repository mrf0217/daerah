const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  class Kabupaten extends require('sequelize').Model {}
  Kabupaten.init({
    // attributes
    name: DataTypes.STRING,
    provinsiId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Kabupaten',
    tableName: 'kabupaten',
  });
  return Kabupaten;
};
