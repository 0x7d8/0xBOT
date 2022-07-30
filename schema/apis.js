const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    apis: Number,
})

module.exports = mongoose.model('apis', Schema)