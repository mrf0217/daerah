// src/models/wilayahModel.js
module.exports = (sequelize, DataTypes) => {
  // Define models
  const Provinsi = sequelize.define('Provinsi', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'provinsi',
    timestamps: false
  });

  const Kabupaten = sequelize.define('Kabupaten', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    provinsi_wilayah: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'kabupaten',
    timestamps: false
  });

  // Define relationships
  Provinsi.hasMany(Kabupaten, { foreignKey: 'provinsi_wilayah' });
  Kabupaten.belongsTo(Provinsi, { foreignKey: 'provinsi_wilayah' });

  // Helper class
  class Wilayah {
    static async getAll() {
      const provinsi = await Provinsi.findAll();
      const kabupaten = await Kabupaten.findAll({ include: Provinsi });
      return { provinsi, kabupaten };
    }

    static async getProvinsi() {
      return await Provinsi.findAll();
    }

    static async getKabupaten() {
      return await Kabupaten.findAll({ include: Provinsi });
    }

    static async getByWilayah(id) {
      const prov = await Provinsi.findByPk(id);
      if (prov) {
        const kab = await Kabupaten.findAll({ where: { provinsi_wilayah: id } });
        return { type: 'provinsi', data: prov, kabupaten: kab };
      }

      const kab = await Kabupaten.findByPk(id, { include: Provinsi });
      if (kab) {
        return { type: 'kabupaten', data: kab };
      }

      return null;
    }
  }

  return { Provinsi, Kabupaten, Wilayah };
};
