const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));

// Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

// Middleware for error
app.use(errorMiddleware)

module.exports = app;