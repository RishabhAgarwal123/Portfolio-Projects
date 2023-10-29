const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');

registerUser = catchAsyncError(async (req, res, next) => {
    let body = req.body;
    let newUser = await User.create(body);

    const refreshToken = await newUser.createSession();
    const accessToken = await newUser.generateAccessToken();
    console.log(refreshToken)

    res
        .header('x-refresh-token', refreshToken)
        .header('x-access-token', accessToken)
        .send
        ({
            status: 201,
            success: true,
            newUser
        })
});

// registerUser = catchAsyncError(async (req, res, next) => {
//     let body = req.body;
//     let newUser = new User(body);

//     newUser.save()
//         .then(() => {
//             return newUser.createSession();
//         })
//         .then((refreshToken) => {
//             return newUser.generateAccessToken()
//                 .then((accessToken) => {
//                     return { accessToken, refreshToken };
//                 });
//         })
//         .then((authTokens) => {
//             console.log(authTokens);
//             console.log(newUser);
//             res
//                 .header('x-refresh-token', authTokens.refreshToken)
//                 .header('x-access-token', authTokens.accessToken)
//                 .send({ status: 201, success: true, newUser });
//         })
//         .catch((error) => {
//             console.error(error); // Log the error for debugging purposes

//             if (error.code === 11000) {
//                 // Handle duplicate email error
//                 res.status(400).json({ message: 'Email address already in use' });
//             } else {
//                 res.status(400).json({ message: 'Bad Request' }); // Provide a more informative response
//             }
//         });
// });

loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);
    const refreshToken = await user.createSession();
    const accessToken = await user.generateAccessToken();

    res
        .header('x-refresh-token', refreshToken)
        .header('x-access-token', accessToken)
        .send
        ({
            status: 201,
            success: true,
            user
        })
});

getAccessToken = catchAsyncError(async (req, res, next) => {
    const accessToken = await req.userObject.generateAccessToken();
    res.header('x-access-token', accessToken).send({ status: 200, success: true, accessToken });
});

module.exports = {
    registerUser,
    loginUser,
    getAccessToken
}