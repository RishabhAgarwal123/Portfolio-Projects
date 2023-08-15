const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Transaction = require('../models/transaction');
const User = require('../models/user');

// transactions
router.post('/transfer-fund', authMiddleware, async (req, res) => {
    try {
        // Save transaction
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        // Debit sender's
        await User.findByIdAndUpdate(req.body.sender, {
            $inc: { balance: -req.body.balance }
        })
        // Credit receiver's
        await User.findByIdAndUpdate(req.body.receiver, {
            $inc: { balance: req.body.balance }
        })
        res.send({
            message: 'Transaction Successful',
            data: newTransaction,
            success: true
        })
    } catch (error) {
        res.send({
            message: 'Transaction Failed',
            data: error.message,
            success: false
        })
    }
});

// verify receiver account
router.post('/verify-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.receiver });
        if (user) {
            res.send({
                message: 'Account verified',
                data: user,
                success: true
            })
        } else res.send({
            message: 'Account not found',
            data: null,
            success: false
        })
    } catch (error) {
        es.send({
            message: 'Account not found',
            data: null,
            success: false
        })
    }
})

module.exports = router;