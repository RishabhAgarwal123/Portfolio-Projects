const express = require('express');
const { login, logout, register, profile } = require('../controller/userController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/user/login').post(login);
router.route('/user/logout').get(logout);
router.route('/user/register').post(register);
router.route('/user/me').get(isAuthenticatedUser, profile);

module.exports = router;