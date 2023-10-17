const mongose = require('mongoose');

const taskSchema = new mongose.Schema({
    completed: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    listId: {
        type: mongose.Types.ObjectId,
        required: true
    }
});

module.exports = mongose.model('Task', taskSchema);