const app = require('./app');
const dotenv = require('dotenv');

const PORT = process.env.PORT;

// Config
dotenv.config({
    path: 'Backend/config/config.env'
})

app.listen(PORT, () => {
    console.log(`Server is running at http://locahost:${PORT}`);
});