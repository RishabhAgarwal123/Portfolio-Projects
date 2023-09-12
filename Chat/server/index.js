const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const ws = require('ws');
const { User } = require('./models/User');
const { Message } = require('./models/Message');
const fs = require('fs');
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
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const getUserFromToken = async (req) => {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (error, user) => {
                if (error) throw error;
                resolve(user);
            })
        } else reject('No user in token');
    });
}

app.get('/messages/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await getUserFromToken(req);
        const ourUserId = user.userId;
        const messages = await Message.find({
            sender: {
                $in: [userId, ourUserId]
            },
            recipient: {
                $in: [userId, ourUserId]
            }
        }).sort({ createedAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        throw error;
    }
});

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

app.get('/people', async (req, res) => {
    const users = await User.find({}, {
        '_id': 1,
        username: 1
    });
    res.status(200).json(users);
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

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

app.post('/logout', async (req, res) => {
    res.cookie('token', '', { sameSite: 'none', secure: true }).status(200).json('Logout');
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

const server = app.listen(PORT, () => {
    console.log(`Server is running at http://locahost:${PORT}`);
});

const wss = new ws.WebSocketServer({ server });
wss.on('connection', (connection, req) => {

    const notify = () => {
        const clients = [...wss.clients];
        clients.forEach((client) => {
            client.send(JSON.stringify({
                online: [...wss.clients].map((cli) => ({ userId: cli.userId, username: cli.username }))
            }));
        });
    }

    connection.isAlive = true;
    connection.timer = setInterval(() => {
        connection.ping();
        connection.deathTimer = setTimeout(() => {
            connection.isAlive = false;
            clearInterval(connection.timer);
            connection.terminate();
            notify();
        }, 1000);
    }, 5000);

    connection.on('pong', () => {
        clearTimeout(connection.deathTimer);
    });

    // Getting username and user id from cookie
    const cookie = req.headers.cookie;
    if (cookie) {
        const tokenCookie = cookie.split(';').find(str => str.startsWith('token='));
        if (tokenCookie) {
            const token = tokenCookie.split('=')[1];
            if (token) {
                jwt.verify(token, jwtSecret, {}, (error, user) => {
                    if (error) throw error;
                    const { userId, username } = user;
                    connection.userId = userId;
                    connection.username = username;
                })
            } 
        }
    }

    connection.on('message', async (message) => {
        const newMessage = JSON.parse(message.toString());
        const { recipient, text, file } = newMessage;
        let filename = null;
        if (file) {
            const parts = file.name.split('.');
            const extension = parts[parts.length - 1];
            filename = Date.now() + '.' + extension;
            const path = __dirname + '/uploads/' + filename;
            const buffer = new Buffer(file.data?.split(',')[1], 'base64');
            fs.writeFile(path, buffer, () => {
            })
        }

        if (recipient && (text || file)) {
            const messageDoc = await Message.create({
                sender: connection.userId,
                recipient: recipient,
                text: text,
                file: file ? filename : null
            });
            [...wss.clients]
                .filter(client => client.userId === recipient)
                .forEach(client => client.send(JSON.stringify({
                    text,
                    sender: connection.userId,
                    recipient: recipient,
                    file: file ? filename : null,
                    _id: messageDoc._id
                })
                )
            );
        }
    });

    // Notify eveeryone about online people when someone connects
    notify();
});