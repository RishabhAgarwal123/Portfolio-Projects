const express = require('express');
const app = express();
app.use(express.json());

require('./config/dbConfig');
const user = require('./routes/user');

// using routes
app.use('/api/users', user);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));