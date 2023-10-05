const express = require('express');
const { createPost,
    editPost,
    deletePost,
    getPosts,
    getSinglePost } = require('../controller/postController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/post/create').post(isAuthenticatedUser, createPost);
router.route('/post/delete').delete(isAuthenticatedUser, deletePost);
router.route('/post/edit').put(isAuthenticatedUser, editPost);
router.route('/post/all').get(isAuthenticatedUser, getPosts);
router.route('/post/single').get(isAuthenticatedUser, getSinglePost);

module.exports = router;