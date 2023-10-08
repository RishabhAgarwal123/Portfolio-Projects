const express = require('express');
const { createPost,
    editPost,
    deletePost,
    getPosts,
    getSinglePost, 
    } = require('../controller/postController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a post
router.route('/create').post(isAuthenticatedUser, createPost);

// Delete post
router.route('/delete/:id').get(isAuthenticatedUser, deletePost);

// Edit post
router.route('/edit/:id').put(isAuthenticatedUser, editPost);

// Get all posts
router.route('/all').get(isAuthenticatedUser, getPosts);

// Get a single post
router.route('/single/:id').get(isAuthenticatedUser, getSinglePost);

module.exports = router;