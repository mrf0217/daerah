const express = require('express');
const router = express.Router();
const provinsiController = require('../controllers/provinsiController');

router.get('/', provinsiController.getAll);
router.get('/:wilayah', provinsiController.getById);
router.post('/', provinsiController.create);

module.exports = router;
