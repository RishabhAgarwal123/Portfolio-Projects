const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Route imports
const user = require('./controllers/userController');

// Path
app.use('/api/v1', user);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;