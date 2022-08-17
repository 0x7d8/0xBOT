const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockyellowmax: Number,
})

module.exports = mongoose.model('stockyellowmax', Schema)