const express = require('express');
const router = express.Router();
const kabupatenController = require('../controllers/kabupatenController');

router.get('/', kabupatenController.getAll);
router.get('/:wilayah', kabupatenController.getById);
router.post('/', kabupatenController.create);

module.exports = router;
