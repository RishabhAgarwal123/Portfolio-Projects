const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/authMiddleware');
const { 
    register,
    login,
    logout
} = require('../controllers/userController');
const { logOut } = require('../../../Ecommerce/Backend/controllers/userController');

// Routes
router.route('/users/register').post(register);
router.route('/users/login').post(login);
router.route('/users/logout').get(logout);