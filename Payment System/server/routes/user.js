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

        // User is verified
        if (!user.isVerified) {
            return res.send({
                success: false,
                message: 'User is not verified'
            });
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
});

router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send({
            message: 'Users List',
            data: users,
            success: true
        });
    } catch (error) {
        res.send({
            success: false,
            data: null,
            message: error.message
        })
    }
});

// update-user-verification-status
router.post('/update-user-verification-status', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.selectedUser, {
            isVerified: req.body.isVerified
        });
        res.send({
            message: 'Status updated successfully',
            data: user,
            success: true 
        });
    } catch (error) {
        res.send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// update user
router.post('/update-user', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body._id, {
            $set: { 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
            }
        });
        res.send({
            data: updatedUser,
            message: 'User updated successfully',
            success: true
        })
    } catch (error) {
        res.send({
            message: error.message,
            data: null,
            success: false
        })
    }
});

module.exports = router