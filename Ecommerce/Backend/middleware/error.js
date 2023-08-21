const ErrorHandler = require('../utils/errorHandler');

module.exports = (error, req, res, next) => {
    error.status = error.status || 500;
    error.message = error.message || 'Internal Server Error';

    // Wrong mongoDb id error
    if (error.name === 'CastError') {
        const message = `Reource not found. Invalid: ${error.path}`
        error = new ErrorHandler(message, 400);
    }

    res.send({
        status: error.status,
        success: false,
        message: error.message
    })
}