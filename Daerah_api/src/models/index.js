require('dotenv').config();
const { Sequelize } = require('sequelize');

// DB connection using env variables
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

// Import models
const User = require('./userModel')(sequelize, Sequelize.DataTypes);
const Provinsi = require('./provinsiModel')(sequelize, Sequelize.DataTypes);
const Kabupaten = require('./kabupatenModel')(sequelize, Sequelize.DataTypes);

// Define associations here, after all models are initialized
Kabupaten.belongsTo(Provinsi, { foreignKey: 'provinsiId' });
Provinsi.hasMany(Kabupaten, { foreignKey: 'provinsiId' });

module.exports = {
  sequelize,
  User,
  Provinsi,
  Kabupaten
};
const { Wilayah } = require('./wilayahmodel')(sequelize, Sequelize.DataTypes);
module.exports.Wilayah = Wilayah;