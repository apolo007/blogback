const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, uploadMiddleware.single('image'), uploadImage);

module.exports = router;