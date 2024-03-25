const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedulerSchema = new Schema ({
    _id: {
        type: String,
    },
    msg: {
        type: String,
        required: true
    }
})

module.exports = Scheduler = mongoose.model('scheduler', schedulerSchema);