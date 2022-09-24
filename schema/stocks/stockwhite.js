const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockwhite: Number,
})

module.exports = mongoose.model('stockwhite', Schema)