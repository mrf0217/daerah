// controllers/wilayahController.js
const { Provinsi, Kabupaten } = require('../models/wilayahModel');

exports.getAll = async (req, res) => {
  try {
    const provinsi = await Provinsi.findAll(); // ❌ no include
    const kabupaten = await Kabupaten.findAll({ include: Provinsi });

    res.json({
      status: true,
      data: { provinsi, kabupaten },
      message: "OK"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};

exports.getProvinsi = async (req, res) => {
  try {
    const data = await Provinsi.findAll(); // ❌ no include
    res.json({
      status: true,
      data,
      message: "OK"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};

exports.getKabupaten = async (req, res) => {
  try {
    const data = await Kabupaten.findAll({ include: Provinsi }); // ✅ show parent provinsi
    res.json({
      status: true,
      data,
      message: "OK"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};

exports.getByWilayah = async (req, res) => {
  try {
    const { wilayah } = req.params;

    // ✅ provinsi with its kabupaten
    const provinsi = await Provinsi.findByPk(wilayah, { include: Kabupaten });
    if (provinsi) {
      return res.json({
        status: true,
        data: provinsi,
        message: "OK"
      });
    }

    // ✅ kabupaten with its provinsi
    const kabupaten = await Kabupaten.findByPk(wilayah, { include: Provinsi });
    if (kabupaten) {
      return res.json({
        status: true,
        data: kabupaten,
        message: "OK"
      });
    }

    res.status(404).json({
      status: false,
      data: [],
      message: "404 Not Found"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};
