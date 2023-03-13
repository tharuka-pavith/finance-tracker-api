const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    "date": {
        require: true,
        type: Date
    },
    "amount": {
        require: true,
        type: Number
    },
    "remark": {
        type: String
    },
    "type": {
        require: true,
        type: Boolean
    },
});

module.exports = mongoose.model('Entry', entrySchema);