const mongoose = require('mongoose');

const RequestsSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    balance: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('requests', RequestsSchema);