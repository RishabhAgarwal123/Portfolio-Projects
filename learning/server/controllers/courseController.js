import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { Course } from "../models/courseModel.js"
import getDataUri from "../utils/dataUri/dataUri.js";
import ErrorHandler from "../utils/errorHandler/errorHandler.js";
import cloudinary from 'cloudinary';
import { Stats } from "../models/statsModel.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const keyword = req.query.keyword || '';
    const category = req.query.category || '';
    const courses = await Course.find(
        {
            title: {
                $regex: keyword,
                $options: 'i'
            },
            category: {
                $regex: category,
                $options: 'i'
            }
        }
    ).select("-lectures");
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

export const deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler('Course Not Found', 404));

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for (let i = 0; i < course.lectures.length; i++) {
        const singleLecture = course.lectures[i];

        await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, { resource_type: 'video' });
    }
    await Course.deleteOne({ _id: id });

    res.status(200).json({
        success: true,
        message: 'Course Deleted Successfully'
    })
});

export const getCourseLecture = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorHandler('Course Not Found', 404));

    course.views += 1;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course Found Successfully',
        lectures: course.lectures
    })
});

// Max video size 100mb
export const addLecture = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler('Course Not Found', 404));

    if (!title || !description)
        return next(new ErrorHandler('Please add all fields', 400));

    const fileUri = getDataUri(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        resource_type: 'video'
    });

    // Upload file here
    course.lectures.push({
        title,
        description,
        video: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
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

export const deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;

    // Finding course
    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler('Course Not Found', 404));

    // Getting lectures to be deleted
    const lecture = course.lectures.find((course) =>  {
        if (course._id.toString() === lectureId) return course;
    })

    // Removing from cloudinary
    await cloudinary.v2.uploader.destroy(lecture.video.public_id, { resource_type: 'video' });

    // removing from db array
    course.lectures = course.lectures.filter((course) =>  {
        if (course._id.toString() !== lectureId) return course;
    })
    
    // Update num of videos in course
    course.numOfVideos = course.lectures?.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Lecture Deleted Successfully'
    })
});

Course.watch().on('change', async () => {
    let stats = await Stats.find({}).sort({ createdAt: 'desc' }).limit(1);

    if (stats.length === 0) {
        stats = [new Stats()];
    }

    const courses = await Course.find({});
    let totalViews = 0;

    for (let i = 0; i < courses.length; i++) {
        totalViews += courses[i].views;
    }

    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();
});