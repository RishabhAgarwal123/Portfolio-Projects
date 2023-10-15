const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('Connection Error');
});

connection.on('connected', () => {
    console.log('DB connected successuflly');
});

module.exports = connection;