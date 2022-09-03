const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    business1timedunix: Number,
})

module.exports = mongoose.model('business1timedunix', Schema)