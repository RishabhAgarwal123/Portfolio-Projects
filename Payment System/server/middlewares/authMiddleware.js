const jwt = require('jsonwebtoken');

// decrypt token and find userId
module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decryptToken = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decryptToken.userId;
        next();
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
}