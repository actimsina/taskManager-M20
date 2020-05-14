const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    notes: [noteSchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);