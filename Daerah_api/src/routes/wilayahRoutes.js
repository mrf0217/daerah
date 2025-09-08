const express = require('express');
const router = express.Router();
const wilayahController = require('../controllers/wilayahController');

router.get('/', wilayahController.getAll);
router.get('/provinsi', wilayahController.getProvinsi);
router.get('/kabupaten', wilayahController.getKabupaten);
router.get('/:wilayah', wilayahController.getByWilayah);

module.exports = router;
