const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockgreen: Number,
})

module.exports = mongoose.model('stockgreen', Schema)