const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorization } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserDetail,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require('../controllers/userController');

// Route
router.route('/users/register').post(registerUser);
router.route('/users/login').post(loginUser);
router.route('/users/logout').get(logOut);

router.route('/users/password/forgot').post(forgotPassword);
router.route('/users/password/reset/:token').put(resetPassword);

// User Details
router.route('/users/me').get(isAuthenticatedUser, getUserDetail);
router.route('/users/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/users/profile').put(isAuthenticatedUser, updateProfile);

// ADMIN
router.route('/admin/users/').get(isAuthenticatedUser, authorization('admin'), getAllUsers);
router.route('/admin/users/:id').get(isAuthenticatedUser, authorization('admin'), getSingleUser);
router.route('/admin/users/:id').put(isAuthenticatedUser, authorization('admin'), updateUserRole);
router.route('/admin/users/:id').delete(isAuthenticatedUser, authorization('admin'), deleteUser);

module.exports = router;