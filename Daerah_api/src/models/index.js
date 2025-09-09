require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'wilayah',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  }
);

const User = require('./userModel')(sequelize, Sequelize.DataTypes);
const Provinsi = require('./provinsiModel')(sequelize, Sequelize.DataTypes);
const Kabupaten = require('./kabupatenModel')(sequelize, Sequelize.DataTypes);

// ✅ Correct associations
Kabupaten.belongsTo(Provinsi, { foreignKey: 'provinsi_wilayah', targetKey: 'wilayah' });
Provinsi.hasMany(Kabupaten, { foreignKey: 'provinsi_wilayah', sourceKey: 'wilayah' });

module.exports = { sequelize, User, Provinsi, Kabupaten };
