const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(
    cors({
        origin: 'http://localhost:3000', // Specify the allowed origin(s)
        methods: 'GET,POST,PUT,DELETE', // Specify the allowed HTTP methods
        credentials: true, // Allow credentials (e.g., cookies)
    })
);
app.use(express.json());
app.use(cookieParser());

// Route imports
const user = require('./routes/userRoute');
const task = require('./routes/taskRoute');

// Path
app.use('/api/v1', user);
app.use('/api/v1', task);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;