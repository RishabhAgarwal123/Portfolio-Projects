const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/token');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register user
registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'Avatars',
        width: 150,
        crop: 'scale'
    });

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
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
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset password
resetPassword = catchAsyncError(async (req, res, next) => {
    // createing hash token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // Finding user on the base of the above token
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return next(new ErrorHandler('Reset password token is invalid or has been expired', 400));

    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('Password does not match', 400));

    // Changing password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Saving
    await user.save();
    // Making user login
    sendToken(user, 200, res);
});

// Change Password
updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword); 

    if (!isPasswordMatch) return next(new ErrorHandler('Old password is incorrect', 400));

    if (req.body.newPassword !== req.body.confirmPassword) return next(new ErrorHandler('Password does not match', 400));

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

    // res.send({
    //     status: 200,
    //     user
    // });
});

// Get user detail
getUserDetail = catchAsyncError(async (req, res, next) => {
    console.log(req.user)
    const user = await User.findById(req.user.id);

    res.send({
        status: 200,
        user
    });
});

// Update Profile
updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;

    const newUser = {
        name,
        email
    }

    // We will cloudinary later
    
    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.send({
        status: 201,
        success: true,
        user
    });
});

// Get all users for admin
getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.send({
        success: true,
        users,
        status: 200
    })
});

// Get single user (admin)
getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler(`Use does not exist with ID: ${req.params.id}`, 400))

    res.send({
        success: true,
        user,
        status: 200
    });
});

// Update Role -- ADMIN
updateUserRole= catchAsyncError(async (req, res, next) => {
    const { name, email, role } = req.body;

    const newUser = {
        name,
        email,
        role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.send({
        status: 201,
        success: true,
        user
    });
});

// Delete user -- ADMIN
deleteUser= catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.params.id)

    if (!user) return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 400));

    // Delete
    const deletedUser = await User.deleteOne({ _id: user._id });

    if (deletedUser.deletedCount === 1) {
        res.send({
            status: 200,
            success: true,
            message: 'User deleted successfully'
        });
    } else {
        return next(new ErrorHandler('User deletion failed', 500));
    }
});

module.exports = {
    registerUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserDetail,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser
}
