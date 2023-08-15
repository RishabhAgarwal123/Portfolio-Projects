const express = require('express');
const app = express();
app.use(express.json());

require('./config/dbConfig');
const user = require('./routes/user');
const transaction = require('./routes/transaction');

// using routes
app.use('/api/users', user);
app.use('/api/transaction', transaction);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));