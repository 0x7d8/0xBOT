const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    value: String,
})

module.exports = mongoose.model('businesses', Schema)