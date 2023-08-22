const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logOut } = require('../controllers/userController');

// Route
router.route('/users/register').post(registerUser);
router.route('/users/login').post(loginUser);
router.route('/users/logout').get(logOut)

module.exports = router;