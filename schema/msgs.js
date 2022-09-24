const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    msgs: Number,
})

module.exports = mongoose.model('msgs', Schema)