import express from 'express';
import { addToPlaylist, createUser, forgetPassword, getProfile, loginUser, logout, removeFromPlaylist, resetPassword, updatePassword, updateProfile, updateProfilePicture } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/Auth/auth.js';
import singleUplaod from '../middlewares/Multer/multer.js';

const router = express.Router();

router.route('/register').post(singleUplaod, createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

// Get my profile
router.route('/me').get(isAuthenticated, getProfile);
router.route('/updatepassword').put(isAuthenticated, updatePassword);
router.route('/updateprofile').put(isAuthenticated, updateProfile);
router.route('/updateprofilepicture').put(isAuthenticated, singleUplaod, updateProfilePicture);

// Password
router.route('/forgetpassword').post(forgetPassword);
router.route('/resetpassword/:token').put(resetPassword);

// Add to playlist
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);

export default router;