const mongose = require('mongoose');

const listSchema = new mongose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

module.exports = mongose.model('List', listSchema);