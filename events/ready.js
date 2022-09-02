module.exports = {
	name: 'START BOT',
	event: 'ready',
	once: true,
	execute(client) {
		console.log(`[0xBOT] [!] STARTED AND LOGGED IN AS ${client.user.tag}!\n\n[0xBOT] [i] STARTED LOGGING OF COMMANDS AND ERRORS`);
	},
};