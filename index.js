const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, clientId, mongo } = require('./config.json');
const { getAllFilesFilter } = require('./utils/getAllFiles.js');
const { version, apikey, webkey, dovotes } = require('./config.json');
const { EmbedBuilder } = require('@discordjs/builders');

// Show Logo
console.log('   ___           ____     ____    _______ ')
console.log('  / _ \         |  _ \   / __ \  |__   __|')
console.log(' | | | | __  __ | |_) | | |  | |    | |   ')
console.log(' | | | | \ \/ / |  _ <  | |  | |    | |   ')
console.log(' | |_| |  >  <  | |_) | | |__| |    | |   ')
console.log('  \___/  /_/\_\ |____/   \____/     |_|   ')
console.log('                                          ')

// MongoDB
const mongoose = require('mongoose')
mongoose.connect(mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] LOADING BOT, ' + version + '\n[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] CONNECTED TO MONGODB\n\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] LOADING COMMANDS AND EVENTS...'))

// Deploy Commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Create Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load all Events
const eventFiles = getAllFilesFilter('./events', '.js');
for (const file of eventFiles) {
	const event = require(file);
	if (event.once) {
		client.once(event.event, (...args) => event.execute(...args));
	} else {
		client.on(event.event, (...args) => event.execute(...args));
	}
	let evt = event.name.toUpperCase()
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING EVENT ${evt}`);
}

console.log(' ')

// Load all Commands
client.commands = new Collection();

const commandFiles = getAllFilesFilter('./commands', '.js');
for (const file of commandFiles) {
	const command = require(file);
	client.commands.set(command.data.name, command);
    let cmd = command.data.name.toUpperCase()
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING COMMAND ${cmd}`);
}

console.log(' ')

// Load all Buttons
client.buttons = new Collection();

const buttonFiles = getAllFilesFilter('./buttons', '.js');
for (const file of buttonFiles) {
	const button = require(file);
	client.buttons.set(button.data.name, button);
    let btn = button.data.name.toUpperCase()
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING BUTTON ${btn}`);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.isButton()) return;

	if (interaction.isChatInputCommand()) {

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction, client);
		} catch (error) {
    		console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ERROR :')
			console.error(error);
        
    		// Create Error Embed
    		const message = new EmbedBuilder()
        		.setTitle('» FEHLER')
  				.setDescription('**»» INFO**\n» WAS?\n`Ein Fehler ist beim ausführen dieses Befehls aufgetreten.`\n\n» WIESO?\n`Dies kann an vielem liegen, der Code wird für Fehler vorm Release einer neuen Version gecheckt und es kann sein, das ein Fehler enthalten war.`\n\n» WAS TUN?\n`Nichts. Einfach warten, der Befehl wurde geloggt und sollte in der nächsten Version schon behoben werden!`\n\n**»» KONTAKT**\n» EMAIL\n`kontakt@rjansen.de`')
    			.setFooter({ text: '» ' + version });

    		// Send Message
			await interaction.reply({ embeds: [message.toJSON()], ephemeral: true });
		}

	}

	if (interaction.isButton()) {

		try {
			let sc = false

			// Special Button Cases
			if (interaction.customId.toString().substring(0, 3) == 'BEG') {
				const cache = interaction.customId.split('-');
				const [cmd, reciever, amount] = cache;
				let editedinteraction = interaction
				editedinteraction.customId = "beg"
				sc = true

				const button = client.buttons.get(editedinteraction.customId);
				await button.execute(editedinteraction, client, reciever, amount);
			}
			if (interaction.customId.toString().substring(0, 3) == 'RPS') {
				const cache = interaction.customId.split('-');
				const [cmd, selection, bet] = cache;
				let editedinteraction = interaction
				if (selection == '1') { editedinteraction.customId = "rps-rock" }
				if (selection == '2') { editedinteraction.customId = "rps-paper" }
				if (selection == '3') { editedinteraction.customId = "rps-scissor" }

				if (selection == 'YES') { editedinteraction.customId = "rps-yes" }
				if (selection == 'NO') { editedinteraction.customId = "rps-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId);
				await button.execute(editedinteraction, client, bet);
			}


			// Other Button Cases
			if (sc == false) {
				const button = client.buttons.get(interaction.customId);
				if (!button) return;

				await button.execute(interaction, client);
			}

			return;
		} catch (error) {
			console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] ERROR :')
			console.error(error);
        
    		// Create Error Embed
    		const message = new EmbedBuilder()
        		.setTitle('» FEHLER')
  				.setDescription('**»» INFO**\n» WAS?\n`Ein Fehler ist beim ausführen dieses Buttons aufgetreten.`\n\n» WIESO?\n`Dies kann an vielem liegen, der Code wird für Fehler vorm Release einer neuen Version gecheckt und es kann sein, das ein Fehler enthalten war.`\n\n» WAS TUN?\n`Nichts. Einfach warten, der Button wurde geloggt und sollte in der nächsten Version schon behoben werden!`\n\n**»» KONTAKT**\n» EMAIL\n`kontakt@rjansen.de`')
    			.setFooter({ text: '» ' + version });

    		// Send Message
			await interaction.reply({ embeds: [message.toJSON()], ephemeral: true });
		}

	}

});

// MongoDB Basic Economy Functions
global.cmds = require("./functions/cmds")
global.bals = require("./functions/economy")
global.quts = require("./functions/quotes")
global.apis = require("./functions/apis")


// MongoDB Advanced Economy Functions
global.sgrn = require("./functions/stocks/green")
global.sblu = require("./functions/stocks/blue")
global.syll = require("./functions/stocks/yellow")
global.sred = require("./functions/stocks/red")

global.sgrnx = require("./functions/stocks/greenmax")
global.sblux = require("./functions/stocks/bluemax")
global.syllx = require("./functions/stocks/yellowmax")
global.sredx = require("./functions/stocks/redmax")


// MongoDB Experimental Economy Functions
global.Lb1o = require("./functions/business/1/owner")
global.Lb1e = require("./functions/business/1/earning")
global.Lb1u = require("./functions/business/1/upgrade")
global.Lb1t = require("./functions/business/1/timedunix")

// Deploy Commands
const commands = [];

for (const file of commandFiles) {
	const command = require(file);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(
	Routes.applicationCommands(clientId),
	{ body: commands },
);

console.log('\n[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] COMMANDS REGISTERED\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] LOGGING IN')

// Login
client.login(token);

// Top.gg Stats
if (apikey != 'none') {
	const { AutoPoster } = require('topgg-autoposter')

	const ap = AutoPoster(apikey, client)

	ap.on('posted', () => {
		console.log('\n\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] TOP.GG STATS POSTED\n')
	})
}

// Top.gg Voting
let user, random, message
if (dovotes != 'no') {
	const Topgg = require("@top-gg/sdk")
	const express = require("express")

	const app = express()
	const webhook = new Topgg.Webhook(webkey)

	app.post("/dblwebhook", webhook.listener(async (vote) => {
		user = await client.users.fetch(vote.user);
		random = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

		message = new EmbedBuilder()
			.setTitle('» VOTING')
			.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)\n» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
			.setFooter({ text: '» ' + version });

		user.send({ embeds: [message.toJSON()] });
		bals.add(user, random)

		console.log('\n\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] VOTED : ' + user + ' : ' + random + '€\n')
	}))
	app.listen(25252)
}