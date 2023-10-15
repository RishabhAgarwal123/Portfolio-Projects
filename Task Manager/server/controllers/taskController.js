const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

/**
 * Create Tasks
 */
createTask = catchAsyncError(async (req, res, next) => {

});

/**
 * Delete Tasks
 */
deleteTask = catchAsyncError(async (req, res, next) => {

});
/**
 * Get all Tasks
 */

getAllTask = catchAsyncError(async (req, res, next) => {

});

/**
 * Update Tasks
 */
updateTask = catchAsyncError(async (req, res, next) => {

});

module.exports = {
    createTask,
    deleteTask,
    getAllTask,
    updateTask
}