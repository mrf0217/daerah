// models/index.js

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

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

const db = {};

db.User = require('./userModel')(sequelize, DataTypes);
db.Provinsi = require('./provinsiModel')(sequelize, DataTypes);
db.Kabupaten = require('./kabupatenModel')(sequelize, DataTypes);

db.Kabupaten.belongsTo(db.Provinsi, { foreignKey: 'provinsiId' });
db.Provinsi.hasMany(db.Kabupaten, { foreignKey: 'provinsiId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;