const app = require('./app');
const dotenv = require('dotenv');
require('./config/dbConfig');

const PORT = process.env.PORT || 6000;

// Unhandled caught exception
process.on('uncaughtException', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to unhandled uncaught exception');
    server.close(() => process.exit(1));
});

// Config
dotenv.config({
    path: 'Backend/config/config.env'
})

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