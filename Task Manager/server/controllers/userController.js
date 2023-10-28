const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');

registerUser = catchAsyncError(async (req, res, next) => {
    let body = req.body;
    let newUser = await User.create(body);

    const refreshToken = await newUser.createSession();
    const accessToken = await newUser.generateAccessToken();

    res
        .header('x-refresh-token', refreshToken)
        .header('x-access-token', accessToken)
        .send
        ({
            status: 201,
            success: true,
            newUser
        })
});

loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = User.findByCredentials(email, password);
    const refreshToken = await user.createSession();
    const accessToken = await user.generateAccessToken();

    res
        .header('x-refresh-token', refreshToken)
        .header('x-access-token', accessToken)
        .send
        ({
            status: 201,
            success: true,
            user
        })
});

module.exports = {
    registerUser,
    loginUser
}