const ErrorHandler = require('../utils/errorHandler');

module.exports = (error, req, res, next) => {
    error.status = error.status || 500;
    error.message = error.message || 'Internal Server Error';

    if (error.name === 'CastError') {
        const message = `Resource not found. Invalid: ${error.path}`;
        error = new ErrorHandler(message, 404);
    }

    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }

    if (error.name === 'JsonWebTokenError') {
        const message = 'Json web token is invalid. Try Again!';
        error = new ErrorHandler(message, 400);
    }

    if (error.name === 'TokenExpiredError') {
        const message = 'Json web token is expired. Try Again!';
        error = new ErrorHandler(message, 400);
    }

    // Log the error for debugging
    console.error(error);

    res.status(error.status).json({
        success: false,
        message: error.message
    });
};