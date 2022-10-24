const sleep = milliseconds => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds)
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { getAllFilesFilter } = require('./utils/getAllFiles.js')
const { EmbedBuilder } = require('@discordjs/builders')
const { Timer } = require('./utils/timer')

global.config = require('./config.json')
const chalk = require('chalk')

// Create Client
const client = new Client({
    intents: [
	    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
	    GatewayIntentBits.GuildMessages,
	    GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
    ]
})

// Login Function
const timer = new Timer()
let didload = false
const login = (client) => {
	timer.start()
	client.login(config.client.token).then(() => {
		if (config.client.quickload) {
			timer.stop()

			const ready = require('./events/ready')
			while (!didload) { sleep(500) }
			return ready.execute(client, timer.getTime())
		} else {
			timer.stop()
			
			const ready = require('./events/ready')
			return ready.execute(client, timer.getTime())
		}
	})
}; if (config.client.quickload) login(client)

// MongoDB
console.log(' ')
console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING 0xBOT ${config.version}`)
console.log(' ')
console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] CONNECTING TO MONGODB`)
const mongoose = require('mongoose')
mongoose.connect(config.mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log(`[0xBOT] ${chalk.bold('[!]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] CONNECTED TO MONGODB`))
console.log(' ')
console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING COMMANDS AND EVENTS`)

/// Useful Math Functions
// Add Percentage to Number
global.addper = (oval, pval) => {
	const percentage = ((pval/100) * oval)
	return (oval + percentage)
}

// Bot Functions
global.bot = require('./functions/bot')

// General Value
global.uapi = require("./functions/userapis")

// Deploy Commands
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

/// Register Interactions
// Load all Events
let count = 0
const eventFiles = getAllFilesFilter('./events', '.js');
for (const file of eventFiles) {
	const event = require(file)
	if (event.name.toUpperCase() !== 'START BOT' || !config.client.quickload) {
		if (event.once) { client.once(event.event, (...args) => event.execute(...args)) } else { client.on(event.event, (...args) => event.execute(...args, client)) }
		console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING EVENT ${event.name.toUpperCase()}`)
	}
}; console.log(' ')

// Load all Commands
client.commands = new Collection();
const commandFiles = getAllFilesFilter('./commands', '.js');
for (const file of commandFiles) {
	count++
	const command = require(file)
	client.commands.set(command.data.name, command)
	console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING COMMAND ${command.data.name.toUpperCase()}`)
}; console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADED ${count} COMMANDS`)
console.log(' '); count = 0
if (!config.client.quickload) sleep(2000)

// Load all Buttons
client.buttons = new Collection();
const buttonFiles = getAllFilesFilter('./buttons', '.js');
for (const file of buttonFiles) {
	count++
	const button = require(file)
	client.buttons.set(button.data.name, button)
	console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING BUTTON ${button.data.name.toUpperCase()}`)
}; console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADED ${count} BUTTONS`)
console.log(' '); count = 0
if (!config.client.quickload) sleep(2000)

// Load all Modals
client.modals = new Collection();
const modalFiles = getAllFilesFilter('./modals', '.js');
for (const file of modalFiles) {
	count++
	const modal = require(file)
	client.modals.set(modal.data.name, modal)
	console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING MODAL ${modal.data.name.toUpperCase()}`)
}; console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADED ${count} MODALS`)
console.log(' '); count = 0
if (!config.client.quickload) sleep(2000)

console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED COMMANDS AND EVENTS`)

// Interaction Handler
client.on('interactionCreate', async(interaction) => {
	if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return

	// Write to UserDB
	bot.userdb.add(interaction.user)

	// Get Guild Language
	const guildlang = await bot.language.get(interaction.guild.id)

	// Get Vote Status
	let votet = 'VOTED'
	const lastVote = await bot.votes.get(interaction.user.id + '-T')
	if (lastVote < (Date.now() - 24*60*60*1000)) { votet = 'NOT VOTED' }
	if (lastVote === 0) { votet = 'NOT VOTED -> /VOTE' }
	if (guildlang === 'de') {
		votet = 'GEVOTED'
		if (lastVote < (Date.now() - 24*60*60*1000)) { votet = 'NICHT GEVOTET' }
		if (lastVote === 0) { votet = 'NICHT GEVOTED -> /VOTE' }
	}
	
	// Set User Language
	if (interaction.locale === 'de') {
		bot.language.set(interaction.user.id, 'de')
	} else {
		bot.language.set(interaction.user.id, 'en')
	}

	// Handle Commands
	if (interaction.isChatInputCommand()) {
		// Stats
		bot.stats('cmd', interaction.user.id, interaction.guild.id)

		// Check if Command Exists
		const command = client.commands.get(interaction.commandName)
		if (!command) return

		// Execute Command
		try {
			await command.execute(interaction, client, guildlang, votet)
		} catch (e) {
			try {
    			await bot.error(interaction, e, 'cmd', guildlang, votet)
			} catch (e) { }
		}

	}

	// Handle Modals
	if (interaction.isModalSubmit()) {
		try {
			// Stats
			bot.stats('mod', interaction.user.id, interaction.guild.id)

			let sc = false

			// Special Button Cases
			const args = interaction.customId.split('-')
			if (args[0] === 'API') {
				let editedinteraction = interaction
				editedinteraction.customId = "api"
				sc = true

				const modal = client.modals.get(editedinteraction.customId)
				await modal.execute(editedinteraction, client, guildlang, votet, args[1], args[2].toLowerCase())
			}

			// Other Button Cases
			if (!sc) {
				const modal = client.modals.get(interaction.customId)
				if (!modal) return

				await modal.execute(interaction, client, guildlang, votet)
			}

			return
		} catch (e) {
			try {
    			await bot.error(interaction, e, 'mod', guildlang, votet)
			} catch (e) { }
		}
	}

	// Handle Buttons
	if (interaction.isButton()) {
		// Stats
		bot.stats('btn', interaction.user.id, interaction.guild.id)

		// Execute Button
		try {
			let sc = false

			// Special Button Cases
			const args = interaction.customId.split('-')
			if (args[0] === 'BEG') {
				let editedinteraction = interaction
				editedinteraction.customId = "beg"
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[1], args[2], args[3], args[4])
			}; if (args[0] === 'RPS') {
				let choice
				let editedinteraction = interaction
				if (args[1] === '1') { editedinteraction.customId = "rps-choice"; choice = 'ROCK' }
				if (args[1] === '2') { editedinteraction.customId = "rps-choice"; choice = 'PAPER' }
				if (args[1] === '3') { editedinteraction.customId = "rps-choice"; choice = 'SCISSORS' }

				if (args[1] === 'YES') { editedinteraction.customId = "rps-yes" }
				if (args[1] === 'NO') { editedinteraction.customId = "rps-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[2], choice)
			}; if (args[0] === 'MEMORY') {
				let editedinteraction = interaction
				editedinteraction.customId = "memory-choice"

				if (args[1] === 'YES') { editedinteraction.customId = "memory-yes" }
				if (args[1] === 'NO') { editedinteraction.customId = "memory-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[2], args[1])
			}; if (args[0] === 'TTT') {
				let editedinteraction = interaction
				editedinteraction.customId = "ttt-choice"

				if (args[1] === 'YES') { editedinteraction.customId = "ttt-yes" }
				if (args[1] === 'NO') { editedinteraction.customId = "ttt-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[2], args[1])
			}; if (args[0] === 'STOCKNEXT') {
				let editedinteraction = interaction

				editedinteraction.customId = "stocknext"
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[1])
			}; if (args[0] === 'BUSINESS') {
				let editedinteraction = interaction

				if (args[2] === 'YES') { editedinteraction.customId = "business-yes" }
				if (args[2] === 'NO') { editedinteraction.customId = "business-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase())
			}; if (args[0] === 'CAR') {
				let editedinteraction = interaction

				if (args[2] === 'YES') { editedinteraction.customId = "car-yes" }
				if (args[2] === 'NO') { editedinteraction.customId = "car-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase())
			}; if (args[0] === 'ITEM') {
				let editedinteraction = interaction

				if (args[2] === 'YES') { editedinteraction.customId = "item-yes" }
				if (args[2] === 'NO') { editedinteraction.customId = "item-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase(), args[5])
			}; if (args[0] === 'STOCKUPGRADE') {
				let editedinteraction = interaction

				if (args[2] === 'YES') { editedinteraction.customId = "stockupgrade-yes" }
				if (args[2] === 'NO') { editedinteraction.customId = "stockupgrade-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[5])
			}; if (args[0] === 'BOMB') {
				let editedinteraction = interaction

				editedinteraction.customId = 'item-bomb'
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[1], args[2], args[3], args[4], args[5], args[6])
			}; if (args[0] === 'COUNT') {
				let editedinteraction = interaction

				editedinteraction.customId = 'count'
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[1].toLowerCase())
			}


			// Other Button Cases
			if (!sc) {
				const button = client.buttons.get(interaction.customId)
				if (!button) return

				await button.execute(interaction, client, guildlang, votet)
			}

			return
		} catch (e) {
			try {
				await bot.error(interaction, e, 'btn', guildlang, votet)
			} catch (e) { }
		}

	}

})

// Deploy Commands
const commands = []
for (const file of commandFiles) {
	const command = require(file)
	commands.push(command.data.toJSON())
}; const rest = new REST({ version: '9' }).setToken(config.client.token)
rest.put(
	Routes.applicationCommands(config.client.id),
	{ body: commands },
)

console.log(' ')
console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOGGING IN...`)

if (!config.client.quickload) { login(client) } else { didload = true }

// Top.gg Stats
if (config.web.stats) {
	const { AutoPoster } = require('topgg-autoposter')
	const ap = AutoPoster(config.web.keys.apikey, client)

	ap.on('posted', () => {
		console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] TOP.GG STATS POSTED')
	})
}

// Top.gg Voting
if (config.web.votes) {
	const Topgg = require("@top-gg/sdk")
	const express = require("express")

	const app = express()
	const webhook = new Topgg.Webhook(config.web.keys.webkey)

	app.post("/dblwebhook", webhook.listener(async(vote) => {
		if(!vote) { return false }
		if(!vote.user) { return false }

		const random = Math.floor(Math.random() * (15000 - 7500 + 1)) + 7500

		// Calculate Extra
		let extra
		if (parseInt(await bot.votes.get(vote.user + '-A')+1) % 10 === 0) {
			extra = (parseInt(await bot.votes.get(vote.user + '-A')+1) * 10000)/2
		}

		// Create Embeds
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('» VOTING')
			.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)\n» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
			.setFooter({ text: '» ' + config.version });
		if (await bot.language.get(vote.user, 'user') === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» VOTING')
				.setDescription('» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
				.setFooter({ text: '» ' + config.version });
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» VOTING')
				.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)')
				.setFooter({ text: '» ' + config.version });
		}; let messagebonus = new EmbedBuilder().setColor(0x37009B)
			.setTitle('» VOTING')
			.setDescription('» Thanks for Voting **' + (parseInt(await bot.votes.get(vote.user + '-A'))+1) + '** times!\nAs A Gift I give you extra **$' + extra + '**!')
			.setFooter({ text: '» ' + config.version });
		if (await bot.language.get(vote.user, 'user') === 'de') {
			messagebonus = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» VOTING')
				.setDescription('» Danke, dass du **' + (parseInt(await bot.votes.get(vote.user + '-A'))+1) + '** mal gevotet hast!\nAls Geschenk gebe ich dir extra **' + extra + '€**!')
				.setFooter({ text: '» ' + config.version });
		}

		// Add Money
		await bot.money.add(false, vote.user, parseInt(random))
		console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] VOTED : ' + vote.user + ' : ' + random + '€')

		// Send Message
		client.users.send(vote.user, { embeds: [message] })

		// Count to Stats
		if (parseInt(await bot.votes.get(vote.user + '-A')+1) % 10 === 0) {
			bot.money.add(false, vote.user, parseInt(extra))
			client.users.send(vote.user, { embeds: [messagebonus] })
		}; bot.votes.add(vote.user + '-A', 1)
		bot.votes.set(vote.user + '-T', Date.now())
	})); app.listen(config.web.ports.votes)
}

/// Cronjobs
// Stock Prices
const cron = require('node-cron')
global.stocks = {}
const dostocks = async() => {
	// Green Stock
	stocks.oldgreen = stocks.green
    stocks.green = (
		Math.floor(Math.random()
		* (30 - 25 + 1)) + 25)
		* (Math.floor(Math.random()
		* (20 - 15 + 1)) + 15)
		+ (Math.floor(Math.random()
		* (400 - 350 + 1))
		+ 350
	)

	// Blue Stock
	stocks.oldblue = stocks.blue
    stocks.blue = (
		Math.floor(Math.random()
		* (70 - 45 + 1)) + 45)
		* (Math.floor(Math.random()
		* (40 - 30 + 1)) + 30)
		- (Math.floor(Math.random()
		* (200 - 100 + 1))
		+ 100
	)

	// Yellow Stock
	stocks.oldyellow = stocks.yellow
    stocks.yellow = (
		Math.floor(Math.random()
		* (90 - 65 + 1)) + 65)
		* (Math.floor(Math.random()
		* (60 - 50 + 1)) + 50)
		+ (Math.floor(Math.random()
		* (200 - 100 + 1))
		+ 100
	)

	// Red Stock
	stocks.oldred = stocks.red
    stocks.red = (
		Math.floor(Math.random()
		* (120 - 105 + 1)) + 105)
		* (Math.floor(Math.random()
		* (80 - 70 + 1)) + 70)
		+ (Math.floor(Math.random()
		* (400 - 100 + 1))
		+ 100
	)

	// White Stock
	stocks.oldwhite = stocks.white
    stocks.white = (
		Math.floor(Math.random()
		* (150 - 130 + 1)) + 130)
		* (Math.floor(Math.random()
		* (120 - 100 + 1)) + 100)
		+ (Math.floor(Math.random()
		* (600 - 100 + 1))
		+ 100
	)

	// Black Stock
	stocks.oldblack = stocks.black
    stocks.black = (
		Math.floor(Math.random()
		* (250 - 200 + 1)) + 200)
		* (Math.floor(Math.random()
		* (170 - 150 + 1)) + 150)
		+ (Math.floor(Math.random()
		* (800 - 200 + 1))
		+ 200
	)
}; dostocks()
cron.schedule('* * * * *', async() => {
	dostocks()

	// Unix Time
	stocks.refresh = Math.floor(+new Date() / 1000)+60
})