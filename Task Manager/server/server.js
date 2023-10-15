require('dotenv').config({
    path: 'Server/config/config.env'
});
require('./dbConfig');
const app = require('./app');
const PORT = process.env.PORT;

// Unhandled caught exception
process.on('uncaughtException', error => {
    console.log(`Error: ${error.message}`);
});

// Starting server
const server = app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});

// Unhandled primise rejection
process.on('unhandledRejection', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => process.exit(1));
});