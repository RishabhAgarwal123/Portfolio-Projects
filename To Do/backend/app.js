const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Route imports
const user = require('./routes/userRoute');
const task = require('./routes/taskRoute');

// Path
app.use('/api/v1', user);
app.use('/api/v1', task);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;