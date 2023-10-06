const path = require('path');
const Post = require('../models/postModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const fs = require('fs');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const upload = uploadMiddleware.single('image');

// Create a post
createPost = async (req, res, next) => {
    // Handle the file upload using multer
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'File upload error',
            });
        }

        try {
            const { title, summary, content } = req.body;
            const { originalname, filename } = req.file;

            // Rename the uploaded file with its original extension
            const ext = path.extname(originalname);
            const imageFileName = `${filename}${ext}`;
            const imagePath = path.join('uploads', imageFileName);
            console.log(ext)

            // Creating a post
            const post = await Post.create({
                title,
                summary,
                content,
                image: imagePath,
                author: req.user._id
            });
            // Returning success response
            res.send({
                success: true,
                status: 201,
                post,
            });
        } catch (error) {
            // Handle any errors that occur during post creation
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    });
};

// Delete post
deletePost = catchAsyncError(async (req, res, next) => {

});

// Edit post
editPost = catchAsyncError(async (req, res, next) => {

});

// Get a single post
getSinglePost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('author', ['username']);
    if (!post) return next(ErrorHandler(`No post found with id ${id}`, 400));
    res.send({
        success: true,
        status: 200,
        post
    })
});

// Get All post
getPosts = catchAsyncError(async (req, res, next) => {
    const posts = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);

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