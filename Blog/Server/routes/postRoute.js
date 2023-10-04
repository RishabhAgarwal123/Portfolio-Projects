const express = require('express');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const { createPost,
    editPost,
    deletePost,
    getPosts,
    getSinglePost } = require('../controller/postController');
const router = express.Router();

router.route('/create').post(isAuthenticatedUser, createPost);
router.route('/delete').delete(isAuthenticatedUser, deletePost);
router.route('/edit').put(isAuthenticatedUser, editPost);
router.route('/all').get(isAuthenticatedUser, getPosts);
router.route('/single').get(isAuthenticatedUser, getSinglePost);

module.exports = router;

