const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    value: String,
    integer: Number
})

module.exports = mongoose.model('businesses', Schema)