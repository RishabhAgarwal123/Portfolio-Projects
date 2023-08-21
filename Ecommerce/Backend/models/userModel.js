const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        max: [30, 'Name cannot exceed 30 characters'],
        min: [4, 'Name should have atleast 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        min: [8, 'Password should contain atleast 8 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Hashing password using Bcrypt js before saving the user onto DB
UserSchema.pre('save', async function (next) {

    // To prevent password change on update of user data
    if (!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
UserSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },           // Payload: Typically includes user-related data
        process.env.JWT_SECRET_KEY, // Secret key for signing the token
        { expiresIn: process.env.JWT_EXPIRE } // Token expiration
    );
};

// Compare password
UserSchema.methods.comparePassword = async function (entertedPassword) {
    return await bcrypt.compare(entertedPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);