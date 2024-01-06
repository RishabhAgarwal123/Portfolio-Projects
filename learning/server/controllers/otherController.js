import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler/errorHandler.js";
import { sendMail } from "../utils/sendMail/sendMail.js";

export const contactForm = catchAsyncError (async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) 
        return next(new ErrorHandler('All fields are mandatory', 400));

    const to = process.env.MY_MAIL;
    const subject = `Contact from 'CODE CRAFTORS'`;
    const text = `I am ${name} and my email is ${email}. \n${message}`;

    await sendMail(to, subject, text);

    res.status(200).json({
        success: true,
        message: 'Your Message Has Been Delivered'
    });
});

export const courseRequestForm = catchAsyncError (async (req, res, next) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) 
        return next(new ErrorHandler('All fields are mandatory', 400));

    const to = process.env.MY_MAIL;
    const subject = `Requesting a course of ${course} on 'CODE CRAFTORS'`;
    const text = `I am ${name} and my email is ${email}. \n${course}`;

    await sendMail(to, subject, text);

    res.status(200).json({
        success: true,
        message: 'Your Request Has Been Delivered. It will be addressed within in 2 business days.'
    });
});

export const getAdminDashboardDetails = catchAsyncError (async (req, res, next) => {

    res.status(200).json({
        success: true
    });
});