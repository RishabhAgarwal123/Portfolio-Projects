const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    res.status(200).send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const { comment } = req.body;
    const comments = commentsByPostId[postId] || [];

    comments.push({ id: commentId, comment: comment });

    commentsByPostId[postId] = comments;

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log(`Server is running at 4001`);
})