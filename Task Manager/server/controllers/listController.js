const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const List = require('../models/listModel');

/**
 * Create Lists
 */

createList = catchAsyncError(async (req, res, next) => {
    const { title } = req.body;
    const list = await List.create({
        title
    });

    res.send({
        status: 201,
        success: true,
        list
    });
});

/**
 * Delete Lists
 */
deleteList = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const list = await List.findById(id);

    if (!list) return next(new ErrorHandler(`No list found with ID: ${id}`, 400));

    await list.deleteOne();

    const lists = await List.find();

    res.send({
        status: 200,
        success: true,
        message: "List deleted successfully",
        lists
    })
});

/**
 * Get all Lists
 */
getAllList = catchAsyncError(async (req, res, next) => {
    const lists = await List.find();
    res.send({
        status: 200,
        success: true,
        lists
    });
});

/**
 * Update Lists
 */
updateList = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const list = await List.findById(id);

    if (!list) return next(new ErrorHandler(`No list found with ID: ${id}`, 400));

    list.title = req.body.title;

    await list.save({ validateBeforeSave: false });

    res.send({
        status: 200,
        success: true,
        message: 'Update Success',
        list
    });
});

module.exports = {
    createList,
    deleteList,
    getAllList,
    updateList,
}