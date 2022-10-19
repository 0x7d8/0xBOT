const chalk = require('chalk')

// PostgreSQL Functions
exports.stat = require('./stats')
exports.apis = require('./misc/apis')
exports.items = require('./economy/items')
exports.votes = require('./misc/votes')
exports.money = require('./economy/money')
exports.quotes = require('./misc/quotes')
exports.stocks = require('./economy/stocks')
exports.settings = require('./misc/settings')
exports.language = require('./misc/language')
exports.businesses = require('./economy/businesses')

exports.random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Log Function
exports.log = (type, uid, gid, msg) => {
    if (!type) {
        console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`)
    } else {
        console.log(`[0xBOT] ${chalk.bold('[!]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`)
    }
}

// Stat Function
exports.stats = (type, uid, gid) => {
    // Count to Global Commands
	bot.stat.add('t-all', type, 1)
        
	// Count Guild Commands and User
	bot.stat.add('g-' + gid, type, 1)
	bot.stat.add('u-' + uid, type, 1)
}

// Game Caches
exports.bomb = new Map()
exports.game = new Map()
exports.memory = new Map()
exports.rps = new Map()
exports.ttt = new Map()