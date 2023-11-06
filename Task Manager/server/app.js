const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errorMiddleware');
const listRoute = require('./routes/listRoute');
const taskRoute = require('./routes/taskRoute');
const userRoute = require('./routes/userRoute');

const corsOptions = {
    origin: [
        "http://localhost:4200",
        "http://127.0.0.1",
        "http://104.142.122.231"
    ],
    credentials: true,
    exposeHeaders: ['Set-cookie']
};

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token, _id'
    )
    next();
})

// Using routes
app.use('/api/v1', listRoute);
app.use('/api/v1', taskRoute);
app.use('/api/v1', userRoute);

// Error middlewares
app.use(errorMiddleware);

module.exports = app;