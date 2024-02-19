const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
    const event = req.body;
    console.log(event)

    try {
        await axios.post('http://localhost:4000/events', event);
        await axios.post('http://localhost:4001/events', event);
        await axios.post('http://localhost:4002/events', event);

        res.send({ status: 'OK' });
    } catch (error) {
        console.error('Error sending events:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get("/events", (req, res) => res.send({message: 'Ok'}))

app.listen(4005, () => {
    console.log('Server is running at 4005');
})