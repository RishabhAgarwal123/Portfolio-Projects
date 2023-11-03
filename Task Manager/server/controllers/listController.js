const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const List = require('../models/listModel');
const Task = require('../models/taskModel');

/**
 * Create Lists
 */

createList = catchAsyncError(async (req, res, next) => {
    const { title } = req.body;
    const list = await List.create({
        title,
        _userId: req.user_id
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

    // Delete all tasks associated with it
    await Task.deleteMany({
        listId: id
    });

    await List.findByIdAndRemove({
        _id: id,
        _userId: user_id
    });

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
    const lists = await List.find(
        {
            _userId: req.user_id
        }
    );
    res.send({
        status: 200,
        success: true,
        lists
    });
});

getSingleList = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    const list = await List.findById(id);

    if (!list) return next(new ErrorHandler(`No list found with ID: ${id}`, 400));

    res.send({
        status: 200,
        success: true,
        message: 'List',
        list
    })
});

/**
 * Update Lists
 */
updateList = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    let list = await List.findById(id);

    if (!list) return next(new ErrorHandler(`No list found with ID: ${id}`, 400));

    list.title = req.body.title;

    // Save the updated list
    list = await list.save();

    res.status(200).json({
        success: true,
        message: 'Update Success',
        list,
    });
});


module.exports = {
    createList,
    deleteList,
    getAllList,
    getSingleList,
    updateList,
}