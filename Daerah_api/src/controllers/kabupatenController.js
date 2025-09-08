const Kabupaten = require('../models/kabupatenModel');

exports.getAll = async (req, res) => {
  try {
    const data = await Kabupaten.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Kabupaten.getById(req.params.wilayah);
    if (!data) return res.status(404).json({ message: "Kabupaten not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await Kabupaten.create(req.body);
    res.status(201).json({ message: "Kabupaten created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
