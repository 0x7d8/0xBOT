const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    stock: String,
    value: Number,
    last_value: Number,
})

module.exports = mongoose.model('stockprices', Schema)