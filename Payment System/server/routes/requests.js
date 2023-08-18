const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Request = require('../models/requests');
const User = require('../models/user');
const Transaction = require('../models/transaction');

// get all request for a user
router.post('/get-all-requests-by-user', authMiddleware, async (req, res) => {
    try {
        const requests = await Request.find({
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId  }]
        })
        // .populate('sender').populate('receiver');
        res.send({
            message: 'Requests Fetched Successfully',
            data: requests,
            success: true
        });
    } catch (error) {
        res.send({
            message: 'Requests Failed',
            data: error,
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
            data: error,
            success: false
        });
    }
});

// update status 
router.post('/update-request-status', authMiddleware, async (req, res) => {
    try {
        if (req.body.status === 'Accepted') {

            const transaction = new Transaction({
                sender: req.body.receiver,
                receiver: req.body.sender,
                balance: req.body.balance,
                reference: req.body.description,
                status: 'success'
            });
            await transaction.save();

            await User.findByIdAndUpdate(req.body.sender, {
                $inc: { balance: req.body.balance }
            });

            await User.findByIdAndUpdate(req.body.receiver, {
                $inc: { balance: -req.body.balance }
            });
        }
        await Request.findByIdAndUpdate(req.body._id, {
            status: req.body.status
        });
        res.send({
            message: 'Request status updated successfully',
            data: null,
            success: true
        })
    } catch (error) {
        res.send({
            message: 'Request status failed',
            data: error,
            success: false
        })
    }
});

module.exports = router;