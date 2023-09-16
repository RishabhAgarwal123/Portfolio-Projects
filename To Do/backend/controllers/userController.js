const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../../../Ecommerce/Backend/utils/token');

// Register User
register = catchAsyncError(async (req, res, next) => {
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

    // Generate token
    sendToken(user, 201, res);
});

// Login user
login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // check email and password
    if (!email || !password) 
        return next(new ErrorHandler('Please enter email and password', 400));

    // Finding email and selecting password
    const user = await User.findOne({ email }).select('+password');

    // Validate Password
    const isVerifiedUser = await user.comparePassword(password);

    // if not registered user
    if (!isVerifiedUser)
        return next(new ErrorHandler('Invalid Password', 403));

    sendToken(user, 200, res);
});

// Log out
logout = catchAsyncError(async(req, res, next) => {
    res.cookie('cookie', null, {
        maxAge: new Date(Date.now()),
        secure: true,
        httpOnly: true
    });

    res.send({
        statue: 200,
        message: 'User logged out'
    });
});

module.exports = {
    register,
    login,
    logout
}