const ErrorHandler = require('../utils/errorHandler');

module.exports = (error, req, res, next) => {
    error.status = error.status || 500;
    error.message = error.message || 'Internal Server Error';

    // Wrong mongoDb is error
    if (error.name === 'CastError') {
        const message = `Resource not found. Invalid: ${error.paht}`
        error = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }

    // Wrong jwt error
    if (error.name === 'JsonwebTokenError') {
        const message = `Json web token is invalid. Try Again!`;
        error = new ErrorHandler(message, 400);
    }

    // JWT expire
    if (error.name === 'TokenExpiredError') {
        const message = `Json web token is expired. Try Again!`;
        error = new ErrorHandler(message, 400);
    }

    res.send ({
        status: error.status,
        success: false,
        message: error.message
    })
}