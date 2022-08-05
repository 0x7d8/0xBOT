const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    stockred: Number,
})

module.exports = mongoose.model('stockred', Schema)