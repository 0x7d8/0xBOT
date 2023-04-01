const sleep = (milliseconds: number) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds)

import * as cron from "node-cron"
import { Events, Client, Collection, GatewayIntentBits, ButtonBuilder, ActionRowBuilder } from "discord.js"
import { getAllFilesFilter } from "@/utils/getAllFiles"
import { Timer } from "@/utils/timer"
import { PoolClient } from "pg"

import config from "@config"

// Create Client
import iClient from "@/interfaces/Client"
const client: iClient = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	]
}) as any

// Login Function
const timer = new Timer()
let didload = false

import { ApplicationCommandDataResolvable } from "discord.js"
import Command from "@/interfaces/Command"
const login = (client: Client, commandFiles: string[]) => {
	timer.start()
	client.login(config.client.token).then(async() => {
		if (config.client.quickload) {
			timer.stop()

			// Deploy Commands
			const commands: object[] = []
			await Promise.all(commandFiles.map(async(file: string) => {
				const command: Command = (await import(file)).default.default
				command.data.toJSON()

				commands.push(command.data.toJSON())
			}))

			const clientCommands = commands as ApplicationCommandDataResolvable[]
			client.application?.commands.set(clientCommands)

			// Execute Event
			const ready: any = (await import('./events/ready.js')).default.default
			while (!didload) { sleep(500) }
			return ready.execute(client, timer.getTime())
		} else {
			timer.stop()

			// Deploy Commands
			const commands: object[] = []
			await Promise.all(commandFiles.map(async(file: string) => {
				const command: Command = (await import(file)).default.default
				command.data.toJSON()

				commands.push(command.data.toJSON())
			}))

			const clientCommands = commands as ApplicationCommandDataResolvable[]
			client.application?.commands.set(clientCommands)

			// Execute Event
			const ready: any = (await import('./events/ready.js')).default.default
			return ready.execute(client, timer.getTime())
		}
	})
}

import CommandInteraction from "@/interfaces/CommandInteraction"
import ButtonInteraction from "@/interfaces/ButtonInteraction"
import ModalInteraction from "@/interfaces/ModalInteraction"

// Bot Functions
import * as bot from "@/functions/bot"
client.config = config
export const start = (db: PoolClient) => {
	/// Register External Files
	// Get Files
	const fileList = [
		{
			"name": 'EVENTS',
			"events": true,
			"files": getAllFilesFilter('./events', '.js')
		},
		{
			"name": 'COMMANDS',
			"events": false,
			"files": getAllFilesFilter('./commands', '.js')
		},
		{
			"name": 'BUTTONS',
			"events": false,
			"files": getAllFilesFilter('./buttons', '.js')
		},
		{
			"name": 'MODALS',
			"events": false,
			"files": getAllFilesFilter('./modals', '.js')
		}
	] as { name: string, events: boolean, files: string[] }[]

	// Login Quickload
	if (config.client.quickload) login(client, getAllFilesFilter('./commands', '.js'))

	// Load Files
	Promise.all(fileList.map(async(list) => {
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOADED ${list.files.length} ${list.name}`)

		if (!list.events) {
			client[list.name.toLowerCase()] = new Collection()
			await Promise.all(list.files.map(async(file) => {
				const content = (await import(file)).default.default

				client[list.name.toLowerCase()].set(content.data.name, content)
			}))
		} else {
			await Promise.all(list.files.map(async(file) => {
				const content = (await import(file)).default.default
				if (config.client.quickload && content.name.toLowerCase() === 'start bot') return

				if (content.once) client.once(content.event, (...args) => content.execute(...args))
				else client.on(content.event, (...args) => content.execute(...args, client))
			}))
		}
	}))

	console.log(' ')
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED COMMANDS AND EVENTS`)

	// Interaction Handler
	client.on(Events.InteractionCreate, async(interaction) => {
		if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return
		if (!interaction.guild) return

		// Write to UserDB
		bot.userdb.add({
			"avatar": (!!interaction.user.avatar) ? interaction.user.avatar : '',
			"discriminator": interaction.user.discriminator,
			"username": interaction.user.username,
			"id": interaction.user.id
		})

		// Get Guild Language
		const guildlang = await bot.language.get(interaction.guild.id)

		// Get Vote Status
		let votet = 'VOTED', votev = true
		const lastVote = await bot.votes.get(interaction.user.id + '-T')
		if (lastVote < (Date.now() - 24*60*60*1000)) { votet = 'NOT VOTED'; votev = false }
		if (lastVote === 0) { votet = 'NOT VOTED -> /VOTE'; votev = false }
		if (guildlang === 'de') {
			votet = 'GEVOTED'
			if (lastVote < (Date.now() - 24*60*60*1000)) votet = 'NICHT GEVOTET'
			if (lastVote === 0) votet = 'NICHT GEVOTED -> /VOTE'
		}
		
		// Set User Language
		if (interaction.locale === 'de') bot.language.set(interaction.user.id, 'de')
		else bot.language.set(interaction.user.id, 'en')

		// Handle Commands
		if (interaction.isChatInputCommand()) {
			// Stats
			bot.stats('cmd', interaction.user.id, interaction.guild.id)

			const command = client.commands.get(interaction.commandName)
			if (!command) return

			// Generate Context
			const ctx: CommandInteraction = {
				"interaction": interaction,

				"db": db,
				"bot": bot,
				"client": client,
				"getOption": (option) => {
					if (!interaction.options.get(option)) return null
					else return (interaction.options.get(option).value as string | number)
				}, "log": (type, text) => {
					if (!type) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`)
					else console.log(`[0xBOT] [!] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`)
				},

				"metadata": {
					"vote": {
						"text": votet,
						"time": lastVote,
						"valid": votev
					},

					"language": guildlang
				}
			}

			// Execute Command
			try {
				await command.execute(ctx)
			} catch (e) {
				try {
					await bot.error(interaction as any, client, e, 'cmd', guildlang, votet)
				} catch (e) { }
			}

		}

		// Handle Modals
		if (interaction.isModalSubmit()) {
			try {
				// Stats
				bot.stats('mod', interaction.user.id, interaction.guild.id)

				let sc = false

				// Generate Context
				const ctx: ModalInteraction = {
					"interaction": interaction,

					"db": db,
					"bot": bot,
					"client": client,
					"log": (type: boolean, text: string) => {
						if (!type) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`)
						else console.log(`[0xBOT] [!] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`)
					},

					"metadata": {
						"vote": {
							"text": votet,
							"time": lastVote,
							"valid": votev
						},

						"language": guildlang
					}
				}

				// Other Modal Cases
				if (!sc) {
					const modal = client.modals.get(interaction.customId)
					if (!modal) return

					await modal.execute(ctx)
				}

				return
			} catch (e) {
				try {
					await bot.error(interaction as any, client, e, 'mod', guildlang, votet)
				} catch (e) { }
			}
		}

		// Handle Buttons
		if (interaction.isButton()) {
			// Stats
			bot.stats('btn', interaction.user.id, interaction.guild.id)

			// Generate Button Rows
			const componentRows = []
			let rowIndex = 0
			interaction.message.components.forEach((row) => {
				componentRows[rowIndex] = { "components": [] }
				let componentIndex = 0
				row.components.forEach((component) => {
					componentRows[rowIndex].components[componentIndex++] = ButtonBuilder.from(component.data as any)
				}); rowIndex++
			})

			// Generate Context
			const ctx: ButtonInteraction = {
				"interaction": interaction,

				"db": db,
				"bot": bot,
				"client": client,
				"log": (type: boolean, text: string) => {
					if (!type) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`)
					else console.log(`[0xBOT] [!] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`)
				},

				"metadata": {
					"vote": {
						"text": votet,
						"time": lastVote,
						"valid": votev
					},

					"language": guildlang
				},

				"components": {
					"rows": componentRows,
					"getAPI": () => {
						const output = []
						let rowIndex = 0
						componentRows.forEach((row: { components: ButtonBuilder[] }) => {
							output[rowIndex++] = new ActionRowBuilder()
								.addComponents(...row.components)
						}); return output
					}
				}
			}

			// Execute Button
			try {
				let sc = false

				// Special Button Cases
				const args = interaction.customId.split('-')
				if (args[0] === 'BEG') {
					sc = true

					const button = client.buttons.get('beg')
					await button.execute(ctx, args[1], Number(args[2]), args[3], args[4])
				}; if (args[0] === 'RPS') {
					let choice: string
					let buttonId = "rps-choice"

					if (args[1] === '1') choice = "ROCK"
					if (args[1] === '2') choice = "PAPER"
					if (args[1] === '3') choice = "SCISSORS"

					if (args[1] === 'CANCEL') buttonId = "rps-cancel"
					if (args[1] === 'YES') buttonId = "rps-yes"
					if (args[1] === 'NO') buttonId = "rps-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, Number(args[2]), choice)
				}; if (args[0] === 'MEMORY') {
					let buttonId = "memory-choice"

					if (args[1] === 'CANCEL') buttonId = "memory-cancel"
					if (args[1] === 'YES') buttonId = "memory-yes"
					if (args[1] === 'NO') buttonId = "memory-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, Number(args[2]), Number(args[1]))
				}; if (args[0] === 'TTT') {
					let buttonId = "ttt-choice"

					if (args[1] === 'CANCEL') buttonId = "ttt-cancel"
					if (args[1] === 'YES') buttonId = "ttt-yes"
					if (args[1] === 'NO') buttonId = "ttt-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, Number(args[2]), Number(args[1]))
				}; if (args[0] === 'BUSINESS') {
					let buttonId: string

					if (args[2] === 'YES') buttonId = "business-yes"
					if (args[2] === 'NO') buttonId = "business-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, args[3], args[4], args[1].toLowerCase())
				}; if (args[0] === 'CAR') {
					let buttonId: string

					if (args[2] === 'YES') buttonId = "car-yes"
					if (args[2] === 'NO') buttonId = "car-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, args[3], args[4], args[1].toLowerCase())
				}; if (args[0] === 'ITEM') {
					let buttonId: string

					if (args[2] === 'YES') buttonId = "item-yes"
					if (args[2] === 'NO') buttonId = "item-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, args[3], args[4], args[1].toLowerCase(), Number(args[5]))
				}; if (args[0] === 'STOCKUPGRADE') {
					let buttonId: string

					if (args[2] === 'YES') buttonId = "stockupgrade-yes"
					if (args[2] === 'NO') buttonId = "stockupgrade-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, args[3], args[4], Number(args[5]))
				}; if (args[0] === 'BOMB') {
					sc = true

					const button = client.buttons.get('item-bomb')
					await button.execute(ctx, args[1], args[2], args[3], args[4], args[5], args[6])
				}; if (args[0] === 'COUNT') {
					sc = true

					const button = client.buttons.get('count')
					await button.execute(ctx, args[1].toLowerCase())
				}; if (args[0] === 'POLL') {
					sc = true

					const button = client.buttons.get('poll')
					await button.execute(ctx, args[1].toLowerCase())
				}; if (args[0] === 'COOLDOWNS') {
					sc = true

					const button = client.buttons.get('cooldowns')
					await button.execute(ctx, args[1], (args[2] === 'TRUE'))
				}; if (args[0] === 'COMMITS') {
					sc = true

					let button: any
					if (args[1] === 'REFRESH') button = client.buttons.get('commits-refresh')
					else button = client.buttons.get('commits-page')
					await button.execute(ctx, Number(args[2]), Number(args[3]), args[1].toLowerCase())
				}; if (args[0] === 'STATS') {
					sc = true

					let button: any
					if (args[1] === 'REFRESH') button = client.buttons.get('stats-refresh')
					else button = client.buttons.get('stats-page')
					await button.execute(ctx, args[2], Number(args[3]), (args[4] === 'TRUE'), args[1].toLowerCase())
				}; if (args[0] === 'STOCKS') {
					sc = true

					let button: any
					if (args[1] === 'REFRESH') button = client.buttons.get('stocks-refresh')
					else button = client.buttons.get('stocks-page')
					await button.execute(ctx, args[2], Number(args[3]), (args[4] === 'TRUE'), args[1].toLowerCase())
				}; if (args[0] === 'STOCKINFO') {
					sc = true

					let button: any
					if (args[1] === 'REFRESH') button = client.buttons.get('stockinfo-refresh')
					else button = client.buttons.get('stockinfo-page')
					await button.execute(ctx, Number(args[2]), args[1].toLowerCase())
				}; if (args[0] === 'STOCK') {
					let buttonId: string

					if (args[2] === 'REFRESH') buttonId = "stock-refresh"
					if (args[2] === 'YES') buttonId = "stock-yes"
					if (args[2] === 'NO') buttonId = "stock-no"
					sc = true

					const button = client.buttons.get(buttonId)
					await button.execute(ctx, args[3], args[4], args[1].toLowerCase(), Number(args[5]))
				}


				// Other Button Cases
				if (!sc) {
					const button = client.buttons.get(interaction.customId)
					if (!button) return

					await button.execute(ctx)
				}

				return
			} catch (e) {
				try {
					await bot.error(interaction as any, client, e, 'btn', guildlang, votet)
				} catch (e) { }
			}

		}

	})

	console.log(' ')
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOGGING IN...`)

	if (!config.client.quickload) login(client, getAllFilesFilter('./commands', '.js'))
	else didload = true

	/// Cronjobs
	// Stock Prices
	client.stocks = {
		green: 0,
		blue: 0,
		yellow: 0,
		red: 0,
		black: 0,
		white: 0,
		brown: 0,
		purple: 0
	}; const dostocks = () => {
		// Green Stock
		client.stocks.oldgreen = client.stocks.green
		client.stocks.green = (
			Math.floor(Math.random()
			* (30 - 25 + 1)) + 25)
			* (Math.floor(Math.random()
			* (20 - 15 + 1)) + 15)
			+ (Math.floor(Math.random()
			* (400 - 350 + 1))
			+ 350
		)

		// Blue Stock
		client.stocks.oldblue = client.stocks.blue
		client.stocks.blue = (
			Math.floor(Math.random()
			* (70 - 45 + 1)) + 45)
			* (Math.floor(Math.random()
			* (40 - 30 + 1)) + 30)
			- (Math.floor(Math.random()
			* (200 - 100 + 1))
			+ 100
		)

		// Yellow Stock
		client.stocks.oldyellow = client.stocks.yellow
		client.stocks.yellow = (
			Math.floor(Math.random()
			* (90 - 65 + 1)) + 65)
			* (Math.floor(Math.random()
			* (60 - 50 + 1)) + 50)
			+ (Math.floor(Math.random()
			* (200 - 100 + 1))
			+ 100
		)

		// Red Stock
		client.stocks.oldred = client.stocks.red
		client.stocks.red = (
			Math.floor(Math.random()
			* (120 - 105 + 1)) + 105)
			* (Math.floor(Math.random()
			* (80 - 70 + 1)) + 70)
			+ (Math.floor(Math.random()
			* (400 - 100 + 1))
			+ 100
		)

		// White Stock
		client.stocks.oldwhite = client.stocks.white
		client.stocks.white = (
			Math.floor(Math.random()
			* (150 - 130 + 1)) + 130)
			* (Math.floor(Math.random()
			* (120 - 100 + 1)) + 100)
			+ (Math.floor(Math.random()
			* (600 - 100 + 1))
			+ 100
		)

		// Black Stock
		client.stocks.oldblack = client.stocks.black
		client.stocks.black = (
			Math.floor(Math.random()
			* (250 - 200 + 1)) + 200)
			* (Math.floor(Math.random()
			* (170 - 150 + 1)) + 150)
			+ (Math.floor(Math.random()
			* (800 - 200 + 1))
			+ 200
		)

		// Brown Stock
		client.stocks.oldbrown = client.stocks.brown
		client.stocks.brown = (
			Math.floor(Math.random()
			* (270 - 200 + 1)) + 300)
			* (Math.floor(Math.random()
			* (200 - 150 + 1)) + 250)
			+ (Math.floor(Math.random()
			* (1000 - 200 + 1))
			+ 200
		)

		// Purple Stock
		client.stocks.oldpurple = client.stocks.purple
		client.stocks.purple = (
			Math.floor(Math.random()
			* (290 - 200 + 1)) + 350)
			* (Math.floor(Math.random()
			* (220 - 150 + 1)) + 300)
			+ (Math.floor(Math.random()
			* (1200 - 200 + 1))
			+ 200
		)
	}; dostocks()
	cron.schedule('* * * * *', async() => {
		dostocks()

		// Unix Time
		client.stocks.refresh = Math.floor(+new Date() / 1000)+60
	})

	// Cooldown Removal
	cron.schedule('*/10 * * * *', async() => {
		await db.query(`delete from usercooldowns where expires / 1000 < extract(epoch from now());`)
	})
}