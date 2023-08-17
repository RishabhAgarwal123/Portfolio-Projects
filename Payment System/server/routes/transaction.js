const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const stripe = require('stripe')(process.env.stripe_key);
const { v4: uuid} = require('uuid');

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
router.post('/verify-account', authMiddleware, async (req, res) => {
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
        res.send({
            message: 'Account not found',
            data: null,
            success: false
        })
    }
});

// Get all transactions for all users
router.post('/get-all-transactions-by-user', authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { sender: req.body.userId },
                { receiver: req.body.userId }
            ]
        }).sort({ createdAt: -1 });
        res.send({
            message: 'Transaction Details',
            data: transactions,
            success: true
        })
    } catch (error) {
        res.send({
            message: 'Failed to load transactions',
            data: null,
            success: false
        })
    }
});

// Deposit funds using stripe
router.post('/deposit-funds', authMiddleware, async (req, res) => {
    try {
        // Create customer
        const { id: token, balance, email } = req.body;
        const customer = await stripe.customers.create({
            email: email,
            source: token
        });
        // Create charge
        const charge = await stripe.charges.create({
            balance: balance,
            currency: 'usd',
            customer: customer.id,
            receipt_email: email,
            description: 'Deposit to wallet'
        }, {
            idempotencykey: uuid()
        });
        // save transaction
        if (charge.status === 'succeeded') {
            const newTransaction = new Transaction({
                sender: req.body.sender,
                receiver: req.body.receiver,
                balance: balance,
                type: 'Deposit',
                reference: 'Stripe deposit',
                status: 'success'
            });
            await newTransaction.save();

            // increase the user's balance
            await User.findByIdAndUpdate(req.body.userId, {
                $inc: { balance: balance }
            });

            res.send({
                message: 'Transaction successful',
                data: newTransaction,
                success: true
            });
        } else {
            res.send({
                message: 'Transaction failed',
                data: charge,
                success: false
            });
        }
    } catch (error) {
        res.send({
            message: 'Transaction failed',
            data: null,
            success: false
        });
    }
});

module.exports = router;