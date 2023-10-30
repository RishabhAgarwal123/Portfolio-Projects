const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const User = require('../models/userModel');

const verifySession = catchAsyncError(async (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');

    const user = await User.findByIdAndToken(_id, refreshToken);
    // console.log(user)
    if (!user) {
        return new ErrorHandler('User not found. Make sure that refresh token and id is valid', 400);
    }

    req.user_id = user._id;
    req.userObject = user;
    req.refreshToken = refreshToken;

    let isSessionValid = false;

    user.sessions.forEach((session) => {
        if (session.token === refreshToken) {
            if (User.hasRefreshTokenExpire(session.expiresAt) === false) {
                isSessionValid = true;
            }
        }
    });

    if (isSessionValid) next();
    else {
        return new ErrorHandler('Refresh token is expired or session is invalid', 401);
    }
});

module.exports = {
    verifySession
}