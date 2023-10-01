const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { cookie: token } = req.cookies;
    if (!token || token === 'j:null')
        return next(new ErrorHandler('Please login to access this resource', 401));

    const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await UserActivation.findById(decryptToken.id);
    next();
});