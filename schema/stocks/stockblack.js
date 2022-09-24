const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockblack: Number,
})

module.exports = mongoose.model('stockblack', Schema)