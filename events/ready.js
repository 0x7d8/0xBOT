module.exports = {
	name: 'START BOT',
	event: 'ready',
	once: true,
	execute(client) {
		console.log(`[0xBOT] [!] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] STARTED AND LOGGED IN AS ${client.user.tag}!\n\n[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] STARTED LOGGING OF COMMANDS AND ERRORS`);
	},
};