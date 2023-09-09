const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { User } = require('./models/User');
const app = express();
require('dotenv').config()
require('./dbConfig');
const PORT = process.env.PORT;
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}));

app.use(express.json());
app.use(cookieParser())

app.get('/profile', async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (error, user) => {
                if (error) throw error;
                res.json(user);
            })
        } else res.status(401).json('No Token');
    } catch (error) {
        res.status(500).json('Invalid Cookie')
        throw error;
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.find({ username });

        if (user) {
            const isValid = bcrypt.compareSync(password, user.password);
            if (isValid) {
                jwt.sign({ userId: user._id, username: username }, jwtSecret, {}, (error, token) => {
                    if (error) throw error;
                    res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                        id: user._id,
                    });
                });
            }
        }
    } catch (error) {
        res.json(error);
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const user = await User.create({
            username: username,
            password: hashedPassword
        });
        jwt.sign({ userId: user._id, username: username }, jwtSecret, {}, (error, token) => {
            if (error) throw error;
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: user._id,
            });
        });
    } catch (error) {
        res.json(error);
    }

});

app.listen(PORT, () => {
    console.log(`Server is running at http://locahost:${PORT}`);
});