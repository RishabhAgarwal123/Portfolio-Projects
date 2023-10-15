const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const List = require('../models/listModel');

/**
 * Create Lists
 */
createList = catchAsyncError(async (req, res, next) => {

});

/**
 * Delete Lists
 */
deleteList = catchAsyncError(async (req, res, next) => {

});

/**
 * Get all Lists
 */
getAllList = catchAsyncError(async (req, res, next) => {

});

/**
 * Update Lists
 */
updateList = catchAsyncError(async (req, res, next) => {

});

module.exports = {
    createList,
    deleteList,
    getAllList,
    updateList
}