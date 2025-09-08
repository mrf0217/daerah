const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provinsi = sequelize.define('Provinsi', {
  wilayah: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nama_provinsi: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'provinsi',
  timestamps: false
});

module.exports = Provinsi;
const Kabupaten = require('./kabupatenModel');

// Define relation
Provinsi.hasMany(Kabupaten, { foreignKey: 'provinsi_wilayah' });
Kabupaten.belongsTo(Provinsi, { foreignKey: 'provinsi_wilayah' });