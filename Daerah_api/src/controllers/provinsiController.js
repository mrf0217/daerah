const Provinsi = require('../models/provinsiModel');

exports.getAll = async (req, res) => {
  try {
    const data = await Provinsi.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Provinsi.getById(req.params.wilayah);
    if (!data) return res.status(404).json({ message: "Provinsi not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await Provinsi.create(req.body);
    res.status(201).json({ message: "Provinsi created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
