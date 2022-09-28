const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    api: String,
    content: String,
})

module.exports = mongoose.model('userapis', Schema)