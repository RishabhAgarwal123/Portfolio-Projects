import { catchAsyncError } from "../middlewares/CatchAsyncError/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { RazorPayInstance } from "../server.js";
import ErrorHandler from "../utils/errorHandler/errorHandler.js";
import crypto from 'crypto';
import { Payment } from "../models/paymentModel.js";

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

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    
    const subscriptionId = user.subscription.id;
    let refund = false;

    await RazorPayInstance.subscriptions.cancel(subscriptionId);

    const payment = await Payment.findOne({
        razorpay_subscription_id: subscriptionId
    });

    const timeGap = Date.now() - payment.createdAt;
    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if (refundTime > timeGap) {
        await RazorPayInstance.payments.refund(payment.razorpay_payment_id);
        refund = true;
    }

    await payment.deleteOne({ razorpay_payment_id });
    user.subscription.id = undefined;
    user.subscription.status = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message:
            refund ? `Subscription cancelled refund initaited, You will receive full refund within ${process.env.REFUND_DAYS} days` :
                `Subscription cancelled, No refund initaited as subscription was cancelled after ${process.env.REFUND_DAYS} days`
    })
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
    const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

    const user = await User.findById(req.user._id);

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET
    ).update(razorpay_payment_id + "|" + subscriptionId, "utf-8").digest('hex');

    const isMatched = generatedSignature === razorpay_signature;

    if (!isMatched) return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

    // Db comes here
    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscription_id
    });

    user.subscription.status = 'active';

    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`);
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY
    })
});