const Post = require('../models/postModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const fs = require('fs');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'})

// Create a post
createPost = catchAsyncError(uploadMiddleware.single('file'), async (req, res, next) => {
    const { title, summary, content } = req.body;
    const { originalName, path } = req.file;
    const parts = originalName?.split('.');
    const extension = parts[parts.length - 1];
    const newPath = `${path}.${extension}`;
    fs.renameSync(path, newPath);

    // Creating a post
    const post = await Post.create({ title, summary, content, image: newPath });

    // Returning
    res.send({
        success: true,
        status: 201,
        post
    });
});

// Delete post
deletePost = catchAsyncError(async (req, res, next) => {

});

// Edit post
editPost = catchAsyncError(async (req, res, next) => {

});

// Get a single post
getSinglePost = catchAsyncError(async (req, res, next) => {

});

// Get All post
getPosts = catchAsyncError(async (req, res, next) => {
    const posts = await Post.find();

    res.send({
        success: true,
        status: 200,
        posts
    })
});

module.exports = {
    createPost,
    deletePost,
    editPost,
    getSinglePost,
    getPosts
}