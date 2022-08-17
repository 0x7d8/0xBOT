const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockredmax: Number,
})

module.exports = mongoose.model('stockredmax', Schema)