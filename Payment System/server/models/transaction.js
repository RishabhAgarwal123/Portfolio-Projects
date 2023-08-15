const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('transactions', TransactionSchema);