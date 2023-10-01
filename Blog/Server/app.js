const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const user = require('./routes/userRoute');
const errorMiddleware = require('./middleware/Error');

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1",
        "http://104.142.122.231",
    ],
    credentials: true,
    exposedHeaders: ["Set-cookie"]
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/', user);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;