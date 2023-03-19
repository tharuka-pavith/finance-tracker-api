const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    "name": {
        require: true,
        type: String
    },
    "user_id": {
        require: true,
        type: String
    },
    "total_in":{
        type: Number
    },
    "total_out":{
        type: Number
    }
});

module.exports = mongoose.model('Book', bookSchema);