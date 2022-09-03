const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockbluemax: Number,
})

module.exports = mongoose.model('stockbluemax', Schema)