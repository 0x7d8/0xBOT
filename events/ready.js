module.exports = {
	name: 'BOT STARTEN',
	event: 'ready',
	once: true,
	execute(client) {
		console.log(`[0xBOT] [!] GESTARTET UND EINGELOGGT ALS ${client.user.tag}!\n\n[0xBOT] [i] STARTE LOGGING VON BEFEHLEN UND EVENTS`);
	},
};