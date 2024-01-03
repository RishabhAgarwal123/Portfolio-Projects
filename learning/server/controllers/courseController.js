import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { Course } from "../models/courseModel.js"
import getDataUri from "../utils/dataUri/dataUri.js";
import ErrorHandler from "../utils/errorHandler/errorHandler.js";
import cloudinary from 'cloudinary';

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
        success: true,
        courses
    })
});

export const createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
    const file = req.file;

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    if (!title || !description || !category || !createdBy)
        return next(new ErrorHandler('Please add all fields', 400));

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });
    res.status(201).json({
        success: true,
        message: 'Course Created Successfully. You can add lectures now'
    })
});

export const getCourseLecture = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorHandler('Course Not Found',  404));

    course.views += 1;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course Found Successfully',
        lectures: course.lectures
    })
});

export const addLecture = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    // const file = req.file;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler('Course Not Found',  404));

    // Upload file here
    course.lectures.push({
        title,
        description,
        video: {
            public_id: 'temp',
            url: 'url'
        }
    });

    course.numOfVideos = course.lectures?.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Lecture Added Successfully',
        lectures: course.lectures
    })
});

export const getCourseDetail = catchAsyncError(async (req, res, next) => {

});