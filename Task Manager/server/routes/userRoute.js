const express = require('express');
const { registerUser, loginUser, getAccessToken } = require('../controllers/userController');
const { verifySession } = require('../middlewares/sessionMiddleware');
const router = express.Router();

router.route('/users/register').post(registerUser);
router.route('/users/login').post(loginUser);
router.route('/users/me/access-token').get(verifySession, getAccessToken);

module.exports = router;