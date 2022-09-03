const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    business1upgrade: Number,
})

module.exports = mongoose.model('business1upgrade', Schema)