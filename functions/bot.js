const chalk = require('chalk')

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
    if (type == 'cmd') {
        // Count to Global Commands
		cmds.add('t-all', 1)
        
		// Count Guild Commands and User
		cmds.add('g-' + gid, 1)
		cmds.add('u-' + uid, 1)
    }
    if (type == 'btn') {
        // Count to Global Commands
		btns.add('t-all', 1)
        
		// Count Guild Commands and User
		btns.add('g-' + gid, 1)
		btns.add('u-' + uid, 1)
    }
}

// Game Caches
exports.bomb = new Map()
exports.game = new Map()
exports.memory = new Map()
exports.rps = new Map()
exports.ttt = new Map()