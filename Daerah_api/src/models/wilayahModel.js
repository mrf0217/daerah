const Provinsi = require('./provinsiModel');
const Kabupaten = require('./kabupatenModel');

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

  static async getByWilayah(wilayah) {
    // check provinsi
    const prov = await Provinsi.findByPk(wilayah);
    if (prov) {
      const kab = await Kabupaten.findAll({ where: { provinsi_wilayah: wilayah } });
      return { type: 'provinsi', data: prov, kabupaten: kab };
    }

    // check kabupaten
    const kab = await Kabupaten.findByPk(wilayah, { include: Provinsi });
    if (kab) {
      return { type: 'kabupaten', data: kab };
    }

    return null;
  }
}

module.exports = { Provinsi, Kabupaten };
