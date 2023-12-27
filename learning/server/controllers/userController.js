import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { User } from "../models/userModel.js"
import ErrorHandler from "../utils/errorHandler/errorHandler.js";
import { sendToken } from "../utils/sendToken/sendToken.js";

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