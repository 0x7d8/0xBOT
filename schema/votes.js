const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    votes: Number,
})

module.exports = mongoose.model('votes', Schema)