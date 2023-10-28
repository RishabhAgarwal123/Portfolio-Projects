const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.route('/users/register').post(registerUser);
router.route('/users/login').post(loginUser);

module.exports = router;