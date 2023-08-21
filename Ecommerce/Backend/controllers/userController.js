const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/token');

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

    // Generating token and sending 
    sendToken(user, 201, res);
});

// Login user
loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // check user email and password
    if (!email || !password) return next(new ErrorHandler('Please Enter Email and Password', 400));

    // Finding email and selecting password
    const user = await User.findOne({ email }).select('+password');

    // If user not return error 
    if (!user) return next(new ErrorHandler('Invalid email or password', 401));

    // Validating password 
    const isPasswordVerified = await user.comparePassword(password);

    // If not verified Invalid password
    if (!isPasswordVerified) return next(new ErrorHandler('Invalid password', 401));

    // Generating token and sending 
    sendToken(user, 200, res);
    // const token = user.getJWTToken();

    // Returning token after login successfully
    // res.send({
    //     status: 200,
    //     success: true,
    //     message: 'User logged successfully',
    //     token
    // })
});

module.exports = {
    registerUser,
    loginUser
}
