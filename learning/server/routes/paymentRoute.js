import express from 'express';
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from '../controllers/paymentController.js';
import { isAuthenticated } from '../middlewares/Auth/auth.js';

const router = express.Router();

// Buy Subscription
router.route('/subscribe').get(isAuthenticated, buySubscription);
router.route('/subscribe/cancel').delete(isAuthenticated, cancelSubscription);
router.route('/razorpaykey').get(getRazorPayKey);

// Payment Verfication
router.route('/paymentverification').post(isAuthenticated, paymentVerification);

export default router;