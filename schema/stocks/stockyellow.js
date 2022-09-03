const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockyellow: Number,
})

module.exports = mongoose.model('stockyellow', Schema)