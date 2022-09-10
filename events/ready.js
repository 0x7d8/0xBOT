const { version } = require('../config.json');

module.exports = {
	name: 'START BOT',
	event: 'ready',
	once: true,
	execute(client) {
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] STARTED AND LOGGED IN AS ${client.user.tag}!`)
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED 0xBOT ${version}`)
		console.log(' ')
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED LOGGING OF COMMANDS AND ERRORS`)
		console.log(' ')
	},
};