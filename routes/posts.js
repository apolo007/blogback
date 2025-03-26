const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, updatePost, deletePost, likePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:slug', getPost);
router.put('/:slug', authMiddleware, updatePost);
router.delete('/:slug', authMiddleware, deletePost);
router.post('/:slug/like', likePost);

module.exports = router;