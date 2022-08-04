const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    langs: Number,
})

module.exports = mongoose.model('langs', Schema)