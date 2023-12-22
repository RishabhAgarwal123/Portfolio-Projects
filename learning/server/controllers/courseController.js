import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { Course } from "../models/courseModel.js"

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find();
    res.status(200).json({
        success: true,
        courses
    })
});