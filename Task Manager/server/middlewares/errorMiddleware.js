const ErrorHandler = require('../utils/errorHandler');

module.exports = (error, req, res, next) => {
    error.status = error.status || 500;
    error.message = error.message || 'Internal Server Error';

    // Wrong mongoDB is error
    if (error.name === 'CastError') {
        error = new ErrorHandler(`Resource not found. Invalid: ${error.path}`, 400);
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        error = new ErrorHandler(`Duplicate ${Object.keys(error.keyValue)} entered`, 400);
    }

    // Wrong JWT token
    if (error.name === 'TokenExpiredError') {
        error = new ErrorHandler(`Json web token is expired. Try Again!`, 400);
    }

    res.send({
        status: error.status,
        success: false,
        message: error.message
    })
}