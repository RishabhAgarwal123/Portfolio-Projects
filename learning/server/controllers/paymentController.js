import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { RazorPayInstance } from "../server.js";
import ErrorHandler from "../utils/errorHandler/errorHandler.js";

export const buySubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user.role === 'admin')
        return next(new ErrorHandler('Admin do not need to buy any subscription', 400));

    const planId = process.env.PLAN_ID || 'plan_NLBKPxAP3kkRfF';

    const subscription = await RazorPayInstance.subscriptions.create({
        plan_id: planId,
        customer_notify: 1,
        total_count: 12
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'User Subscription Started',
        subscriptionId: subscription.id
    })
});