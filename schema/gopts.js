const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    gopts: Number,
})

module.exports = mongoose.model('gopts', Schema)