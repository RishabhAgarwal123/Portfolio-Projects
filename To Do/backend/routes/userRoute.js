const express = require('express');
const router = express.Router();

const { 
    register,
    login,
    logout
} = require('../controllers/userController');

// Routes
router.route('/users/register').post(register);
router.route('/users/login').post(login);
router.route('/users/logout').get(logout);

module.exports = router;