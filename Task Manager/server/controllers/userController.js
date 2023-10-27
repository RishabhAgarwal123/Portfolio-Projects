const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');

createUser = catchAsyncError(async (req, res, next) => {
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

module.exports = {
    createUser
}