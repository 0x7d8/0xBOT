const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    quotes: Number,
})

module.exports = mongoose.model('quotes', Schema)