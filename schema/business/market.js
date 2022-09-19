const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    market: String,
})

module.exports = mongoose.model('market', Schema)