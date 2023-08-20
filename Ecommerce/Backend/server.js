const app = require('./app');
const dotenv = require('dotenv');
require('./config/dbConfig');

const PORT = process.env.PORT || 6000;

// Config
dotenv.config({
    path: 'Backend/config/config.env'
})

app.listen(PORT, () => {
    console.log(`Server is running at http://locahost:${PORT}`);
});