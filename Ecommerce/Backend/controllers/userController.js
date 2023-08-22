const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/token');
const sendMail = require('../utils/sendMail');

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

// Logout user
logOut = catchAsyncError(async (req, res, next) => {
    res.cookie('cookie', null, {
        maxAge: new Date(Date.now()),
        secure: true,
        httpOnly: true
    });
    res.send({
        status: 200,
        messgae: 'User logged out'
    })
});

// Forgot password
forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) return next(new ErrorHandler('User not found', 404));
    
    // Get reset password token
    const resetToken = user.getResetPasswordToken();

    // Saving user
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please
    ignore it`;

    try {
        // sending mail
        await sendMail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })

        res.send({
            status: 200,
            success: true,
            message: `Email sen to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

module.exports = {
    registerUser,
    loginUser,
    logOut,
    forgotPassword
}
