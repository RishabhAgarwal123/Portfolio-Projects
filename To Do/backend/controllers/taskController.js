const Task = require('../models/taskModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

// add task
addTask = catchAsyncError(async (req, res, next) => {
    const { taskName, description, completed, user } = req.body;

    const task = await Task.create({
        taskName,
        description,
        completed,
        updatedAt: Date.now(),
        user: user._id,
        isOpen: false
    });

    res.send({
        status: 201,
        success: true,
        task
    });
});

// update task
updateTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const { taskName, description, completed, user } = req.body;
    const task = await Task.findById({id});

    if (!task) 
        return next(new ErrorHandler(`No task found with id: ${id}`, 400));

    task.taskName = taskName;
    task.description = description;
    task.updatedAt = Date.now();
    task.completed = completed;
    task.user = user._id,

    await task.save({ validateBeforeSave: false });
});

// delete task
deleteTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) 
        return next(new ErrorHandler(`No task found with ID: ${id}`, 400));

    await task.deleteOne();

    res.send({
        status: 200,
        success: true,
        message: 'Taksk deleted successfully'
    })
});

// All task
getAllTask = catchAsyncError(async (req, res, next) => {
    const tasks = await Task.find();

    res.send({
        status: 200,
        success: true,
        tasks
    });
});

// get single task
getTask = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findById(id).populate('user', 'name email');

    if (!task) 
        return next(new ErrorHandler(`No task found with ID: ${id}`, 400));

    res.send({
        status: 200,
        success: true,
        task
    });
});

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getAllTask,
    getTask
}