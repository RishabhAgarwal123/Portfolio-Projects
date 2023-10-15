const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errorMiddleware');
const listRoute = require('./routes/listRoute');
const taskRoute = require('./routes/taskRoute');

const corsOptions = {
    origin: [
        "http://localhost: 4200",
        "http://127.0.0.1",
        "http://104.142.122.231"
    ],
    credentials: true,
    exposeHeaders: ['Set-cookie']
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// Using routes
app.use('api/v1', listRoute);
app.use('api/v1', taskRoute);

// Error middlewares
app.use(errorMiddleware);

module.exports = app;