import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { Course } from "../models/courseModel.js"
import ErrorHandler from "../utils/errorHandler/errorHandler.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
        success: true,
        courses
    })
});

export const createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
    // const file = req.file;

    if (!title || !description || !category || !createdBy)
        return next(new ErrorHandler('Please add all fields', 400));

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            public_id: 'temp',
            url: 'tmep'
        }
    });
    res.status(201).json({
        success: true,
        message: 'Course Created Successfully. You can add lectures now'
    })
});