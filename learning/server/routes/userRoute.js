import express from 'express';
import { createUser, getProfile, loginUser, logout, updatePassword, updateProfile, updateProfilePicture } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/Auth/auth.js';

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

// Get my profile
router.route('/me').get(isAuthenticated, getProfile);
router.route('/updatepassword').put(isAuthenticated, updatePassword);
router.route('/updateprofile').put(isAuthenticated, updateProfile);
router.route('/updateprofilepicture').put(isAuthenticated, updateProfilePicture);

export default router;