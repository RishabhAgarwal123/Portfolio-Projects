import express from 'express';
import { createUser, getProfile, loginUser, logout } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/Auth/auth.js';

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

// Get my profile
router.route('/me').get(isAuthenticated, getProfile);

export default router;