// Creating token
const sendToken = (user, status, res) => {
    const token = user.getJWTToken();

    res.cookie('cookie', token, {
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true
    });

    res.send({
        success: true,
        user: user,
        token: token
    });
};

module.exports = sendToken;