const path = require('path');
const Post = require('../models/postModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const upload = uploadMiddleware.single('image');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY,
});

const uploadOptions = {
    folder: 'Blog_Images', // Replace 'your_folder_name' with the desired folder name
    transformation: [
        { width: 300, height: 200, crop: 'fill' }, // Replace with your desired image transformation options
    ],
    resource_type: 'auto'
};

// Create a post
const createPost = async (req, res, next) => {
    try {
        // Handle the file upload using multer
        const result = await cloudinary.uploader.upload(req.file.path, uploadOptions);

        const { title, summary, content } = req.body;

        // Create a post with the Cloudinary image URL
        const post = await Post.create({
            title,
            summary,
            content,
            image: result.secure_url, // Use the Cloudinary URL for the image
            author: req.user._id, // Assuming you have user authentication
        });

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
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