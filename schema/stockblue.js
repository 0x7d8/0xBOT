const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockblue: Number,
})

module.exports = mongoose.model('stockblue', Schema)