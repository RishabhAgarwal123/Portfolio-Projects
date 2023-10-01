const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Login User
login = catchAsyncError(async (req, res, next) => {

});

// Logout User
logout = catchAsyncError(async (req, res, next) => {

});

// Get user
profile = catchAsyncError(async (req, res, next) => {

});

// Register user
register = catchAsyncError(async (req, res, next) => {

});

module.exports = {
    login,
    logout,
    profile,
    register
}