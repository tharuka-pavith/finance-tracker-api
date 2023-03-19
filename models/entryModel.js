const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    "book_id": {
        require: true,
        type: String
    },
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
        type: Boolean // true for cash in
    }
});

module.exports = mongoose.model('Entry', entrySchema);