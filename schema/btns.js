const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    btns: Number,
})

module.exports = mongoose.model('btns', Schema)