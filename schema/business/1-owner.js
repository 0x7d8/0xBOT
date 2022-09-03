const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    business1owner: Number,
})

module.exports = mongoose.model('business1owner', Schema)