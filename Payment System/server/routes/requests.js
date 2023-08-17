const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Request = require('../models/requests');

// get all request for a user
router.post('/get-all-requests-by-user', authMiddleware, async (req, res) => {
    try {
        const requests = await Request.find({
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId  }]
        })
        // }).populate('sender').populate('receiver');
        res.send({
            message: 'Requests Fetched Successfully',
            data: requests,
            success: true
        });
    } catch (error) {
        res.send({
            message: 'Requests Failed',
            data: null,
            success: false
        });
    }
});

// get request to other user
router.post('/send-requests', authMiddleware, async (req, res) => {
    try {
        const { sender, receiver, balance, description } = req.body;

        const request = new Request({
            sender,
            receiver,
            balance,
            description
        });

        await request.save();

        res.send({
            message: 'Request Sent Successfully',
            data: request,
            success: true
        });        
    } catch (error) {
        res.send({
            message: 'Request Failed',
            data: null,
            success: false
        });
    }
});

module.exports = router;