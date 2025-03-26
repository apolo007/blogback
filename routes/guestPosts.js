const express = require('express');
const router = express.Router();
const { submitGuestPost, getGuestPosts, updateGuestPost } = require('../controllers/guestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', submitGuestPost);
router.get('/', authMiddleware, getGuestPosts);
router.put('/:id', authMiddleware, updateGuestPost);

module.exports = router;