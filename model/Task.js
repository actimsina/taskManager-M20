const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);