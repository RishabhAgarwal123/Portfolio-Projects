const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();

// Posts
const posts = {};

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body; // Destructure the title from req.body

    // Store the post using the id as the key
    posts[id] = { id, title };

    res.send({
        message: 'Success',
        post: posts[id]
    });
});

app.listen(4000, () => {
    console.log('Server is running at 4000')
});