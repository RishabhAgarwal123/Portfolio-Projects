const Post = require('../models/postModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create a post
createPost = catchAsyncError(async (req, res, next) => {

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

});

module.exports = {
    createPost,
    deletePost,
    editPost,
    getSinglePost,
    getPosts
}