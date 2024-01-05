import express from 'express';
import { addToPlaylist, createUser, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getProfile, loginUser, logout, removeFromPlaylist, resetPassword, updatePassword, updateProfile, updateProfilePicture, updateRole } from '../controllers/userController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/Auth/auth.js';
import singleUplaod from '../middlewares/Multer/multer.js';

const router = express.Router();

router.route('/register').post(singleUplaod, createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

// Get my profile
router.route('/me').get(isAuthenticated, getProfile);
router.route('/me').delete(isAuthenticated, deleteMyProfile);
router.route('/updatepassword').put(isAuthenticated, updatePassword);
router.route('/updateprofile').put(isAuthenticated, updateProfile);
router.route('/updateprofilepicture').put(isAuthenticated, singleUplaod, updateProfilePicture);

// Password
router.route('/forgetpassword').post(forgetPassword);
router.route('/resetpassword/:token').put(resetPassword);

// Add to playlist
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);
router.route("/admin/users/:id").put(isAuthenticated, authorizeAdmin, updateRole);
router.route("/admin/users/:id").delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;