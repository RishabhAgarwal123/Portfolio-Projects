const path = require('path');
const Post = require('../models/postModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const upload = uploadMiddleware.single('image');

// Create a post
createPost = async (req, res, next) => {
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

            // Rename the uploaded file with its original extensionx
            const ext = path.extname(originalname);
            const imageFileName = `${filename}${ext}`;
            const imagePath = path.join('uploads', imageFileName);

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
                message: 'Post Created Successfully!'
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
    const { id } = req.params;
    const post = Post.findById(id);

    if (!post) return next(new ErrorHandler(`No post found with ID: ${id}`, 400));

    await post.deleteOne();

    res.send({
        status: 200,
        success: true,
        message: "Post deleted successfully"
    })
});

// Edit post
editPost = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const { title, summary, content } = req.body;
    let post = await Post.findById(id);

    if (!post) return next(new ErrorHandler(`No post found with the id: ${id}`, 404));

    post.title = title;
    post.summary = summary;
    post.content = content;

    post = await post.save();

    res.send({
        success: true,
        post,
        status: 200,
        message: 'Post Updated Successfully'
    })
});

// Get a single post
getSinglePost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('author', ['username']);
    if (!post) return next(ErrorHandler(`No post found with id ${id}`, 400));
    res.send({
        success: true,
        status: 200,
        post,
        message: 'Post found successfully'
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
        posts,
        message: 'Posts found'
    })
});

module.exports = {
    createPost,
    deletePost,
    editPost,
    getSinglePost,
    getPosts
}