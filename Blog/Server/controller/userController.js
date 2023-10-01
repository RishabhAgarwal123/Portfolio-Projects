const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/token');

// Login User
login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // check user email and password
    if (!email || !password)
        return next(new ErrorHandler('Please enter email and password', 400));

    // Finding email and selecting password
    const user = await User.findOne({ email }).select('+password');

    // If user not return error 
    if (!user) return next(new ErrorHandler('Invalid email or password', 401));

    // Validate password
    const isVerified = await user.comparePassword(password);

    // If not verified Invalid password
    if (!isVerified) return next(new ErrorHandler('Invalid password', 403));

    // Generating token and sending 
    sendToken(user, 200, res);
});

// Logout User
logout = catchAsyncError(async (req, res, next) => {
    res.cookie('cookie', null, {
        maxAge: new Date(Date.now()),
        secure: true,
        httpOnly: true
    });
    res.send({
        status: 200,
        success: true,
        message: 'user logged out'
    });
});

// Get user
profile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.send({
        status: 200,
        success: true,
        user
    });
});

// Register user
register = catchAsyncError(async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password
    });

    sendToken(user, 201, res);
});

module.exports = {
    login,
    logout,
    profile,
    register
}