const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers } = require('../controllers/newsletterController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/subscribe', subscribe);
router.get('/subscribers', authMiddleware, getSubscribers);

module.exports = router;