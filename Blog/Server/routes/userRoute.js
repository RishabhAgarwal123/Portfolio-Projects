const express = require('express');
const { login, logout, register, profile } = require('../controller/userController');
const router = express.Router();

router.route('/user/login').post(login);
router.route('/user/logout').get(logout);
router.route('/user/register').post(register);
router.route('/user/profile').get(profile);

module.exports = router;