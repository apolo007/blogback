const express = require('express');
const router = express.Router();
const { createComment, getComments, getAllComments, approveComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', createComment);
router.get('/:postId', getComments);
router.get('/', authMiddleware, getAllComments);
router.put('/:id/approve', authMiddleware, approveComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;