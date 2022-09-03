const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockgreenmax: Number,
})

module.exports = mongoose.model('stockgreenmax', Schema)