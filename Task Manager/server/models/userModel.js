const mongoose = require('mongoose');
const _ = require('lodash');
const jsonWebToken = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

// Instance Methods
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject, ['password', 'sessions']);
}

// Generate access token
userSchema.methods.generateAccessToken = function () {
    const user = this;

    return new Promise((resolve, reject) => {
        // Create JSON web token and return
        jsonWebToken.sign({
            _id: user._id.toHexString()
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            },
            (error, token) => {
                if (!error) {
                    resolve(token);
                } else {
                    reject();
                }
            })
    });
}

// Generate refresh auth token
userSchema.methods.generateRefreshToken = function () {
    // Generate a 64 bytes token
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (error, buffer) => {
            if (!error) {
                let token = buffer.toString('hex');
                return resolve(token);
            }
        });
    });
}

userSchema.methods.createSession = () => {
    let user = this;
    return user.generateAccessToken().then((refreshToken) => {
        saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        return refreshToken;
    }).catch((e) => Promise.reject(`Failed to save session to database.\n ${e}`));
}

userSchema.statics.findByIdAndToken = function (_id, token) {
    
}

let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        user.sessions.push({ 'token': refreshToken, expiresAt });

        user.save().then(() => {
            return resolve(refreshToken)
        }).catch((e) => reject(e));
    });
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}

module.exports = mongoose.model('User', userSchema);