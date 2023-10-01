const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter Username'],
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
});

// Hash Passowrd
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    this.password = await this.bcrypt.hash(this.password, 10);
});

// JWT token
UserSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

// Compare password
UserSchema.methods.comparePassword = async function (entertedPassword) {
    return await bcrypt.compare(entertedPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);