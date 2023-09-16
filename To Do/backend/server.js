const app = require('./app');
const dotenv = require('dotenv');
require('./config/dbConfig');

const PORT = process.env.PORT || 6000;

// Creating server
const server = app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});

// Config
dotenv.config({
    path: 'To Do/config/config.env'
})

// Unhandled caught exception
process.on('uncaughtException', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down server due to unhandled caught exception');
    server.close(() => process.exit(1));
});

// Unhandled promise rejection
process.on('unhandledRejection', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => process.exit(1));
});