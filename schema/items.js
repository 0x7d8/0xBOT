const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    value: String,
    amount: Number,
})

module.exports = mongoose.model('items', Schema)