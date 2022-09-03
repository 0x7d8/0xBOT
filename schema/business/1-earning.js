const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    business1earning: Number,
})

module.exports = mongoose.model('business1earning', Schema)