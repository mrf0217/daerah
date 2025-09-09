const { Model } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  class Provinsi extends Model {}
  Provinsi.init({
    // define attributes here
    name: DataTypes.STRING,
    // add other fields
  }, {
    sequelize,
    modelName: 'Provinsi',
    tableName: 'provinsi', // adjust as needed
  });
  return Provinsi;
};