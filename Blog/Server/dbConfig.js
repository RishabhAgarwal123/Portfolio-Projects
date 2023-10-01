const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('Connection error');
});

connection.on('connnected', () => {
    console.log('DB connected successfully');
});

module.exports = connection;