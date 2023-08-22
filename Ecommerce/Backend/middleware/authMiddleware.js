const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { cookie: token } = req.cookies;

    if (!token) return next(new ErrorHandler('Please login to access this resource', 401));

    const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decryptToken.id);
    next();
});

// Admin roles
const authorization = (...roles) => {
    return (req, res, next) => {
        // console.log(req)
        if (!roles.includes(req.user.role))
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));

        next();
    }
}

module.exports = { isAuthenticatedUser, authorization };