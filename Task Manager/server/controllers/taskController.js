const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const Task = require('../models/taskModel');

/**
 * Create Tasks
 */
createTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const { title } = req.body;

    const task = await Task.create({
        listId: id,
        title
    });

    res.send({
        success: true, 
        status: 201,
        task
    });
});

/**
 * Delete Tasks
 */
deleteTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler(`No task found with ID: ${id}`, 400));

    await task.deleteOne();

    const tasks = await Task.find();

    res.send({
        status: 200,
        success: true,
        message: "Task deleted successfully",
        tasks
    })
});
/**
 * Get all Tasks
 */

getAllTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    const tasks = await Task.find({
        listId: id
    });

    res.send({
        status: 200,
        success: true,
        message: 'Tasks List',
        tasks,
        listId: id
    })
});

getSingleTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler(`No task found with ID: ${id}`, 400));

    res.send({
        status: 200,
        success: true,
        message: 'Task',
        task
    })
});

/**
 * Update Tasks
 */
updateTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler(`No task found with ID: ${id}`, 400));

    task.title = req.body.title;
    task.completed = req.body.completed;

    await task.save({ validateBeforeSave: false });

    res.send({
        status: 200,
        success: true,
        message: 'Update Success',
        task
    });
});

module.exports = {
    createTask,
    deleteTask,
    getAllTask,
    getSingleTask,
    updateTask
}