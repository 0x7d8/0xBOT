const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId: String,
    cmds: Number,
})

module.exports = mongoose.model('cmds', Schema)