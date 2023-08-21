const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Register user
registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'This is sample image key',
            url: 'Sample url'
        }
    });

    const token = user.getJWTToken();

    res.send({
        status: 201,
        success: true,
        message: 'User registered successfully',
        token
    })
});

// Login user
loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // check user email and password
    if (!email || !password) return next(new ErrorHandler('Please Enter Email and Password', 400));

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorHandler('Invalid email or password', 401));

    const isPasswordVerified = await user.comparePassword(password);

    if (!isPasswordVerified) return next(new ErrorHandler('Invalid password', 401));

    const token = user.getJWTToken();

    res.send({
        status: 200,
        success: true,
        message: 'User logged successfully',
        token
    })
});

module.exports = {
    registerUser,
    loginUser
}
