const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    money: Number,
})

module.exports = mongoose.model('money', Schema)