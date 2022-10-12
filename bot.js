const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { getAllFilesFilter } = require('./utils/getAllFiles.js')
const { EmbedBuilder } = require('@discordjs/builders')

const config = require('./config.json')
const chalk = require('chalk')
const fs = require("fs")

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

/// MongoDB Functions
// General Value
global.stkp = require("./functions/stockprices")
global.uapi = require("./functions/userapis")
global.lang = require("./functions/langs")
global.gopt = require("./functions/gopts")

// Stocks
global.sgrn = require("./functions/stocks/green")
global.sblu = require("./functions/stocks/blue")
global.syll = require("./functions/stocks/yellow")
global.sred = require("./functions/stocks/red")
global.swhi = require("./functions/stocks/white")
global.sblk = require("./functions/stocks/black")

global.sgrnx = require("./functions/stocks/greenmax")
global.sblux = require("./functions/stocks/bluemax")
global.syllx = require("./functions/stocks/yellowmax")
global.sredx = require("./functions/stocks/redmax")

// Deploy Commands
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

// Create Client
const client = new Client({
    intents: [
	    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
	    GatewayIntentBits.GuildMessages,
	    GatewayIntentBits.MessageContent
    ]
})

/// Register Interactions
// Load all Events
const eventFiles = getAllFilesFilter('./events', '.js');
for (const file of eventFiles) {
	const event = require(file)
	if (event.once) { client.once(event.event, (...args) => event.execute(...args)) } else { client.on(event.event, (...args) => event.execute(...args)) }
	console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING EVENT ${event.name.toUpperCase()}`)
}; console.log(' ')

// Load all Commands
client.commands = new Collection();
const commandFiles = getAllFilesFilter('./commands', '.js');
for (const file of commandFiles) {
	const command = require(file)
	client.commands.set(command.data.name, command)
	console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING COMMAND ${command.data.name.toUpperCase()}`)
}; console.log(' ')

// Load all Buttons
client.buttons = new Collection();
const buttonFiles = getAllFilesFilter('./buttons', '.js');
for (const file of buttonFiles) {
	const button = require(file)
	client.buttons.set(button.data.name, button)
	console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADING BUTTON ${button.data.name.toUpperCase()}`)
}; console.log(' ')

console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED COMMANDS AND EVENTS`)

// Interaction Handler
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.isButton()) return

	// Get Guild Language
	let guildlang = "en"
	const glang = await lang.get(interaction.guild.id)
	if (parseInt(glang) == 0) {
		if (interaction.guildLocale == "de") {
			await lang.add(interaction.guild.id, 1)
		} else { await lang.add(interaction.guild.id, 2) }
	}; if (parseInt(glang) == 1) { guildlang = "de" }

	// Get Vote Status
	let votet = 'VOTED'
	const lastVote = await bot.votes.get(interaction.user.id + '-T')
	if (!lastVote) { votet = 'NOT VOTED -> /VOTE' }
	if (lastVote < (Date.now() - 24*60*60*1000)) { vote = 'NOT VOTED' }
	if (guildlang === 'de') {
		votet = 'GEVOTED'
		if (!lastVote) { votet = 'NICHT GEVOTED -> /VOTE' }
		if (lastVote < (Date.now() - 24*60*60*1000)) { votet = 'NICHT GEVOTET' }
	}
	
	// Set Language
	const clang = await lang.get(interaction.user.id)
	if (parseInt(clang) == 0) { lang.add(interaction.user.id, 1) }
	if (interaction.locale == "de") {
		if (parseInt(clang) == 2) { lang.rem(interaction.user.id, 1) }
	} else {
		if (parseInt(clang) == 1) { lang.add(interaction.user.id, 1) }
	}

	// Handle Commands
	if (interaction.isChatInputCommand()) {
		// Stats
		bot.stats('cmd', interaction.user.id, interaction.guild.id)

		// Check if Command Exists
		const command = client.commands.get(interaction.commandName)
		if (!command) return;

		// Execute Command
		try {
			await command.execute(interaction, client, guildlang, votet)
		} catch (e) {
			try {
    			// Generate Error Code
				const generator = require('generate-password')
				const errorid = generator.generate({
					length: 8,
					numbers: true,
					uppercase: true,
					symbols: false,
				})

				// Check if Log Folder exists
				const dir = 'logs'
        		if (!fs.existsSync(dir)) {
            		fs.mkdirSync(dir)
        		}

				// Log Error
				console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [CMD] ERROR : ' + errorid + ' :')
				console.error(e)
				const date_ob = new Date()
				const day = ("0" + date_ob.getDate()).slice(-2)
				const month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
				const year = date_ob.getFullYear()
				fs.appendFileSync('logs/e' + day + '-' + month + '-' + year + '.log', '[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [CMD] ERROR : ' + errorid + ' :\n')
				fs.appendFileSync('logs/e' + day + '-' + month + '-' + year + '.log', e.stack + '\n\n')
        
    			// Create Error Embed
    			let message = new EmbedBuilder()
        			.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  					.setDescription('» <:ERROR:1020414987291861022> An Error has occured while executing this Command.\nThe Error has been logged and will be fixed soon!')
    				.setFooter({ text: '» ' + votet + ' » ' + config.version + ' » ERROR: ' + errorid });
				if (guildlang == 'de') {
					message = new EmbedBuilder()
        				.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  						.setDescription('» <:ERROR:1020414987291861022> Ein Fehler ist beim ausführen dieses Befehls aufgetreten.\nDer Fehler wurde geloggt und wird bald behoben!')
    					.setFooter({ text: '» ' + votet + ' » ' + config.version + ' » FEHLER: ' + errorid });
				}

    			// Send Message
				await interaction.reply({ embeds: [message], ephemeral: true })
			} catch (e) { return }
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
			if (args[0] == 'BEG') {
				let editedinteraction = interaction
				editedinteraction.customId = "beg"
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[1], args[2], args[3], args[4])
			}; if (args[0] == 'RPS') {
				let choice
				let editedinteraction = interaction
				if (args[1] == '1') { editedinteraction.customId = "rps-choice"; choice = 'ROCK' }
				if (args[1] == '2') { editedinteraction.customId = "rps-choice"; choice = 'PAPER' }
				if (args[1] == '3') { editedinteraction.customId = "rps-choice"; choice = 'SCISSORS' }

				if (args[1] == 'YES') { editedinteraction.customId = "rps-yes" }
				if (args[1] == 'NO') { editedinteraction.customId = "rps-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[2], choice)
			}; if (args[0] == 'MEMORY') {
				let editedinteraction = interaction
				editedinteraction.customId = "memory-choice"

				if (args[1] == 'YES') { editedinteraction.customId = "memory-yes" }
				if (args[1] == 'NO') { editedinteraction.customId = "memory-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[2], args[1])
			}; if (args[0] == 'TTT') {
				let editedinteraction = interaction
				editedinteraction.customId = "ttt-choice"

				if (args[1] == 'YES') { editedinteraction.customId = "ttt-yes" }
				if (args[1] == 'NO') { editedinteraction.customId = "ttt-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[2], args[1])
			}; if (args[0] == 'stock') {
				let editedinteraction = interaction

				editedinteraction.customId = "stock-next"
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[2])
			}; if (args[0] == 'BUSINESS') {
				let editedinteraction = interaction

				if (args[2] == 'YES') { editedinteraction.customId = "business-yes" }
				if (args[2] == 'NO') { editedinteraction.customId = "business-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase())
			}; if (args[0] == 'CAR') {
				let editedinteraction = interaction

				if (args[2] == 'YES') { editedinteraction.customId = "car-yes" }
				if (args[2] == 'NO') { editedinteraction.customId = "car-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase())
			}; if (args[0] == 'ITEM') {
				let editedinteraction = interaction

				if (args[2] == 'YES') { editedinteraction.customId = "item-yes" }
				if (args[2] == 'NO') { editedinteraction.customId = "item-no" }
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase(), args[5])
			}; if (args[0] == 'BOMB') {
				let editedinteraction = interaction

				editedinteraction.customId = 'item-bomb'
				sc = true

				const button = client.buttons.get(editedinteraction.customId)
				await button.execute(editedinteraction, client, guildlang, votet, args[1], args[2], args[3], args[4], args[5], args[6])
			}; if (args[0] == 'COUNT') {
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
				// Generate Error Code
				const generator = require('generate-password')
				const errorid = generator.generate({
					length: 8,
					numbers: true,
					uppercase: true,
					symbols: false,
				})

				// Check if Log Folder exists
				const dir = 'logs'
        		if (!fs.existsSync(dir)) {
            		fs.mkdirSync(dir)
        		}

				// Log Error
				console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [BTN] ERROR : ' + errorid + ' :')
				console.error(e)
				const date_ob = new Date()
				const day = ("0" + date_ob.getDate()).slice(-2)
				const month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
				const year = date_ob.getFullYear()
				fs.appendFileSync('logs/e' + day + '-' + month + '-' + year + '.log', '[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [BTN] ERROR : ' + errorid + ' :\n')
				fs.appendFileSync('logs/e' + day + '-' + month + '-' + year + '.log', e.stack + '\n\n')
        
    			// Create Error Embed
    			let message = new EmbedBuilder()
        			.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  					.setDescription('» <:ERROR:1020414987291861022> An Error has occured while executing this Button.\nThe Error has been logged and will be fixed soon!')
    				.setFooter({ text: '» ' + votet + ' » ' + config.version + ' » ERROR: ' + errorid });
				if (guildlang == 'de') {
					message = new EmbedBuilder()
        				.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  						.setDescription('» <:ERROR:1020414987291861022> Ein Fehler ist beim ausführen dieses Buttons aufgetreten.\nDer Fehler wurde geloggt und wird bald behoben!')
    					.setFooter({ text: '» ' + votet + ' » ' + config.version + ' » FEHLER: ' + errorid });
				}

    			// Send Message
				await interaction.reply({ embeds: [message], ephemeral: true })
			} catch (e) { return }
		}

	}

})

// Message Handler
client.on('messageCreate', async message => {
	// Message & Character Counter
	if (!message.author.bot) {
		bot.stat.add('u-' + message.author.id + '-TOTAL-A', 'msg', 1)
		bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-A', 'msg', 1)
		bot.stat.add('u-' + message.author.id + '-TOTAL-C', 'msg', message.content.length)
		bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-C', 'msg', message.content.length)
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

console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] INTERACTIONS REGISTERED`)
console.log(' ')
console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOGGING IN`)

// Login
client.login(config.client.token)

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

	app.post("/dblwebhook", webhook.listener(async vote => {
		if(!vote) { return false }
		if(!vote.user) { return false }

		const user = await client.users.fetch(vote.user)
		const random = Math.floor(Math.random() * (15000 - 7500 + 1)) + 7500

		// Calculate Extra
		let extra
		if (parseInt(await votef.get(vote.user + '-A')+1) % 10 === 0) {
			extra = (parseInt(await votef.get(vote.user + '-A')+1) * 10000)/2
		}

		// Create Embeds
		let message = new EmbedBuilder()
			.setTitle('» VOTING')
			.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)\n» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
			.setFooter({ text: '» ' + config.version });
		if (await lang.get(vote.user) == 1) {
			message = new EmbedBuilder()
				.setTitle('» VOTING')
				.setDescription('» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
				.setFooter({ text: '» ' + config.version });
		} else {
			message = new EmbedBuilder()
				.setTitle('» VOTING')
				.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)')
				.setFooter({ text: '» ' + config.version });
		}; let messagebonus = new EmbedBuilder()
			.setTitle('» VOTING')
			.setDescription('» Thanks for Voting **' + (parseInt(await bot.votes.get(vote.user + '-A'))+1) + '** times!\nAs A Gift I give you extra **$' + extra + '**!')
			.setFooter({ text: '» ' + config.version });
		if (await lang.get(vote.user) == 1) {
			messagebonus = new EmbedBuilder()
				.setTitle('» VOTING')
				.setDescription('» Danke, dass du **' + (parseInt(await bot.votes.get(vote.user + '-A'))+1) + '** mal gevotet hast!\nAls Geschenk gebe ich dir extra **' + extra + '€**!')
				.setFooter({ text: '» ' + config.version });
		}

		// Add Money
		await bot.money.add(interaction, vote.user, parseInt(random))
		console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] VOTED : ' + user + ' : ' + random + '€')

		// Send Message
		user.send({ embeds: [message] })

		// Count to Stats
		if (parseInt(await bot.votes.get(vote.user + '-A')+1) % 10 === 0) {
			bot.money.add(interaction, vote.user, parseInt(extra))
			user.send({ embeds: [messagebonus.toJSON()] })
		}; bot.votes.add(vote.user + '-A', 1)
		bot.votes.set(vote.user + '-T', Date.now())
	}))
	app.listen(config.web.ports.votes)
}