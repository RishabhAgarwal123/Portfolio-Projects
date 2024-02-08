const express = require('express');
const { randomBytes } = require('crypto');
const app = express();

// Posts
const posts = [];

app.use(express.json());

app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body; // Destructure the title from req.body

    // Store the post using the id as the key
    // posts['id'] = id;
    // posts['title'] = title;
    posts.push({ 'id': id, 'title': title });

    res.send({
        message: 'Success'
    });
});

app.listen(4000, () => {
    console.log('Server is running at 4000')
});