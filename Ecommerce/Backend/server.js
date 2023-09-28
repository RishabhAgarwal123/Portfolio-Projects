require('dotenv').config({
    path: 'Backend/config/config.env'
});
require('./config/dbConfig');
const app = require('./app');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT;

// Unhandled caught exception
process.on('uncaughtException', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to unhandled uncaught exception');
    server.close(() => process.exit(1));
});

// 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Starting server
const server = app.listen(PORT, () => {
    console.log(`Server is running at http://locahost:${PORT}`);
});

// Unhandled promise rejection
process.on('unhandledRejection', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => process.exit(1));
});