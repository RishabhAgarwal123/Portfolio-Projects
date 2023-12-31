import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { Course } from "../models/courseModel.js";
import ErrorHandler from "../utils/errorHandler/errorHandler.js";
import { sendMail } from "../utils/sendMail/sendMail.js";
import { sendToken } from "../utils/sendToken/sendToken.js";
import crypto from 'crypto';

export const createUser = catchAsyncError (async (req, res, next) => {
    const { name, email, password } = req.body;
    // const file = req.file

    if (!name || !email || !password) return next(new ErrorHandler('Please provide all details', 400));

    let user = await User.findOne({ email});

    if (user) next(new ErrorHandler(`User cannot be created user with emailId ${user.email} already exists`, 409));

    // Upload file on cloudinary

    // Create user
    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'temp',
            url: 'temp'
        }
    });

    sendToken(res, user, 'User Registered Successfully', 201);
});

export const loginUser = catchAsyncError (async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler('Please provide all details', 400));

    const user = await User.findOne({ email}).select('+password');

    if (!user) next(new ErrorHandler(`Incorrect email or password`, 401));

    const isMatch = await user.comparePassword(password);

    if (!isMatch) next(new ErrorHandler(`Incorrect email or password`, 401));

    sendToken(res, user, `${user.name} Logged In Successfully`, 200);
});

export const logout = catchAsyncError (async (req, res, next) => {
    res.status(200).cookie('token', {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged Out Successfully"
    })
});

export const getProfile = catchAsyncError (async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        message: 'User Found',
        user: user
    })
});

export const updatePassword = catchAsyncError (async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return next(new ErrorHandler('Please provide all details', 400));

    if (oldPassword === newPassword) return next(new ErrorHandler('New password cannot be same as old password', 500));

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) next(new ErrorHandler(`Incorrect old password`, 401));

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        user: user,
        message: 'Password Updated Successfully'
    });
});

export const updateProfile = catchAsyncError (async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
        success: true,
        user: user,
        message: 'Profile Updated Successfully'
    });
});

export const updateProfilePicture = catchAsyncError (async (req, res, next) => {
    // Clodinary to do
    res.status(200).json({
        success: true,
        message: 'Profile Picture Updated Successfully'
    });
});

export const forgetPassword = catchAsyncError (async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email});

    if (!user) return next (new ErrorHandler(`No user with this ${email} is registered`, 400));

    const resetToken = await user.getResetToken();

    await user.save();

    const url = `${process.env.FRONTEND_URL}/api/v1/resetpassword/${resetToken}`;
    const message = `Click on the link to reset your password. ${url}. If you have not requested then. Please Ignore`;
    await sendMail(user.email, 'CODE CRAFTERS Reset Password', message);

    // Send token via email
    res.status(200).json({
        success: true,
        message: `Reset token has been sent to ${user.email} successfully`
    });
})

export const resetPassword = catchAsyncError (async (req, res, next) => {
    const { token } = req.params;
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    });

    if (!user) return next(new ErrorHandler(`Token is invalid or has been expired`));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password Changed Successfully',
    });
})

export const addToPlaylist = catchAsyncError (async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.body.id);

    if (!course) return next(new ErrorHandler('Invalid Course Id', 400));

    const itemExist = user.playlist.find((item) => {
        if (item.course.toString() === course._id.toString()) return true;
    })

    if (itemExist) return next(new ErrorHandler('Course Already Exists', 409));

    user.playlist.push({
        course: course._id,
        poster: course.poster.url,
    });

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Added To Playlist'
    })
});

export const removeFromPlaylist = catchAsyncError (async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.query.id);

    if (!course) return next(new ErrorHandler('Invalid Course Id', 400));

    const newPlaylist = user.playlist.filter((item) => {
        if (item.course.toString() !== course._id.toString()) return item;
    });

    user.playlist = newPlaylist;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Removed From Playlist'
    })
});