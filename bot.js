const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, clientId, mongo } = require('./config.json');
const { getAllFilesFilter } = require('./utils/getAllFiles.js');
const { version, apikey, webkey, dovotes } = require('./config.json');
const { EmbedBuilder } = require('@discordjs/builders');

// MongoDB
console.log(' ')
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [STA] $$$$$ LOADING 0xBOT ' + version)
console.log(' ')
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] CONNECTING TO MONGODB')
const mongoose = require('mongoose')
mongoose.connect(mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] CONNECTED TO MONGODB'))
console.log(' ')
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [STA] $$$$$ LOADING COMMANDS AND EVENTS')

// MongoDB Functions
global.cmds = require("./functions/cmds")
global.btns = require("./functions/btns")
global.bals = require("./functions/economy")
global.quts = require("./functions/quotes")
global.apis = require("./functions/apis")
global.lang = require("./functions/langs")


global.sgrn = require("./functions/stocks/green")
global.sblu = require("./functions/stocks/blue")
global.syll = require("./functions/stocks/yellow")
global.sred = require("./functions/stocks/red")

global.sgrnx = require("./functions/stocks/greenmax")
global.sblux = require("./functions/stocks/bluemax")
global.syllx = require("./functions/stocks/yellowmax")
global.sredx = require("./functions/stocks/redmax")


global.Lb1o = require("./functions/business/1/owner")
global.Lb1e = require("./functions/business/1/earning")
global.Lb1u = require("./functions/business/1/upgrade")
global.Lb1t = require("./functions/business/1/timedunix")

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

console.log(' ')
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [END] $$$$$ LOADED COMMANDS AND EVENTS')

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.isButton()) return;

	const clang = await lang.get(interaction.user.id)
	if (parseInt(clang) == 0) { lang.add(interaction.user.id, 1) }
	if (interaction.locale == "de") {
		if (parseInt(clang) == 2) {
			lang.rem(interaction.user.id, 1)
		}
	} else {
		if (parseInt(clang) == 1) {
			lang.add(interaction.user.id, 1)
		}
	}

	if (interaction.isChatInputCommand()) {
		// Count to Global Commands
		cmds.add('t-all', 1)
        
		// Count Guild Commands and User
		cmds.add('g-' + interaction.guild.id, 1)
		cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)

		// Check if Command Exists
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		// Execute Command
		try {
			await command.execute(interaction, client);
		} catch (error) {
			try {
    			console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ERROR :')
				console.error(error);
        
    			// Create Error Embed
    			const message = new EmbedBuilder()
        			.setTitle('» FEHLER')
  					.setDescription('**»» INFO**\n» WAS?\n`Ein Fehler ist beim ausführen dieses Befehls aufgetreten.`\n\n» WIESO?\n`Dies kann an vielem liegen, der Code wird für Fehler vorm Release einer neuen Version gecheckt und es kann sein, das ein Fehler enthalten war.`\n\n» WAS TUN?\n`Nichts. Einfach warten, der Befehl wurde geloggt und sollte in der nächsten Version schon behoben werden!`\n\n**»» KONTAKT**\n» EMAIL\n`kontakt@rjansen.de`')
    				.setFooter({ text: '» ' + version });

    			// Send Message
				await await interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
			} catch (error) {
				return
			}
		}

	}

	if (interaction.isButton()) {
		// Count to Global Buttons
		btns.add('t-all', 1)
        
		// Count Guild Buttons and User
		btns.add('g-' + interaction.guild.id, 1)
		btns.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)

		// Execute Button
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
			if (interaction.customId.toString().substring(0, 6) == 'MEMORY') {
				const cache = interaction.customId.split('-');
				const [cmd, selection, bet] = cache;
				let editedinteraction = interaction
				editedinteraction.customId = "memory-choice"

				if (selection == 'YES') { editedinteraction.customId = "memory-yes" }
				if (selection == 'NO') { editedinteraction.customId = "memory-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId);
				await button.execute(editedinteraction, client, bet, selection);
			}
			if (interaction.customId.toString().substring(0, 3) == 'TTT') {
				const cache = interaction.customId.split('-');
				const [cmd, selection, bet] = cache;
				let editedinteraction = interaction
				editedinteraction.customId = "ttt-choice"

				if (selection == 'YES') { editedinteraction.customId = "ttt-yes" }
				if (selection == 'NO') { editedinteraction.customId = "ttt-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId);
				await button.execute(editedinteraction, client, bet, selection);
			}


			// Other Button Cases
			if (sc == false) {
				const button = client.buttons.get(interaction.customId);
				if (!button) return;

				await button.execute(interaction, client);
			}

			return;
		} catch (error) {
			try {
				console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] ERROR :')
				console.error(error);
        
    			// Create Error Embed
    			const message = new EmbedBuilder()
        			.setTitle('» FEHLER')
  					.setDescription('**»» INFO**\n» WAS?\n`Ein Fehler ist beim ausführen dieses Buttons aufgetreten.`\n\n» WIESO?\n`Dies kann an vielem liegen, der Code wird für Fehler vorm Release einer neuen Version gecheckt und es kann sein, das ein Fehler enthalten war.`\n\n» WAS TUN?\n`Nichts. Einfach warten, der Button wurde geloggt und sollte in der nächsten Version schon behoben werden!`\n\n**»» KONTAKT**\n» EMAIL\n`kontakt@rjansen.de`')
    				.setFooter({ text: '» ' + version });

    			// Send Message
				await interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
			} catch (error) {
				return
			}
		}

	}

});

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

console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] INTERACTIONS REGISTERED')
console.log(' ')
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] LOGGING IN')

// Login
client.login(token)

// Top.gg Stats
if (apikey != 'none') {
	const { AutoPoster } = require('topgg-autoposter')

	const ap = AutoPoster(apikey, client)

	ap.on('posted', () => {
		console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] TOP.GG STATS POSTED')
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

		if (await lang.get(vote.user) == 1) {
			message = new EmbedBuilder()
				.setTitle('» VOTING')
				.setDescription('» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
				.setFooter({ text: '» ' + version });
		} else {
			message = new EmbedBuilder()
				.setTitle('» VOTING')
				.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)')
				.setFooter({ text: '» ' + version });
		}

		await user.send({ embeds: [message.toJSON()] });
		await bals.add(vote.user, parseInt(random))

		console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] VOTED : ' + user + ' : ' + random + '€')
	}))
	app.listen(25252)
}