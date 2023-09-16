const Task = require('../models/taskModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

// add task
addTask = catchAsyncError(async (req, res, next) => {
    const { taskName, description, completed, dueDate, user } = req.body;

    const task = await Task.create({
        taskName,
        description,
        completed,
        dueDate,
        updatedAt: Date.now(),
        userId: user._id
    });

    res.send({
        status: 201,
        success: true,
        task
    });
});

// update task
updateTask = catchAsyncError(async (req, res, next) => {

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