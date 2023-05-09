const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const User = require('../models/user');

// register user account
router.post('/register', async (req, res) => {
    try {
        // check for duplicate user
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                message: 'User already exists',
                success: false,
                status: 409
            })
        }

        // hash password
        const getSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, getSalt);
        req.body.password = hashedPassword;

        // save user
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: 'User created successfully',
            data: null,
            success: true,
            status: 200
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            status: 500
        });
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        // console.log(user)
        if (!user) {
            return res.send({
                message: 'User does not exists',
                success: false
            })
        }

        // check is password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.send({
                message: 'Invalid Password',
                success: false
            })
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: '1d' });
        res.send({
            message: 'User logged in successfully',
            data: token,
            success: true
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
});

// get user
router.post('/get-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        user.password = '';
        res.send({
            message: 'User found successfully',
            success: true,
            data: user,
            status: 200
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router