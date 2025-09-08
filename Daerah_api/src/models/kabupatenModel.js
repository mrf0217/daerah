const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Provinsi = require('./provinsiModel');  // ✅ match actual filename

const Kabupaten = sequelize.define('Kabupaten', {
  wilayah: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nama_kabupaten: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provinsi_wilayah: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'provinsi', // table name, not file name
      key: 'wilayah'
    }
  }
}, {
  tableName: 'kabupaten',
  timestamps: false
});

// Define relation
Kabupaten.belongsTo(Provinsi, { foreignKey: 'provinsi_wilayah' });
Provinsi.hasMany(Kabupaten, { foreignKey: 'provinsi_wilayah' });

module.exports = Kabupaten;
