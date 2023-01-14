// Module Register
import moduleAlias from "module-alias"
moduleAlias.addAlias('@interfaces', __dirname+'/interfaces')
moduleAlias.addAlias('@functions', __dirname+'/functions')
moduleAlias.addAlias('@assets', __dirname+'/assets')
moduleAlias.addAlias('@utils', __dirname+'/utils')
moduleAlias.addAlias('@config', __dirname+'/config.json')

import * as cron from "node-cron"
import { start } from "./bot.js"
import { default as pg } from "pg"
import { getAllFilesFilter } from "@utils/getAllFiles.js"
import config from "@config"

import WebserverInterface from "@interfaces/Webserver.js"
import * as webserver from "rjweb-server"

// Create Client
import { Client, GatewayIntentBits } from "discord.js"
const client = new Client({ intents: [
	GatewayIntentBits.Guilds
] }); client.login(config.client.token)

import * as bot from "@functions/bot.js"

// CLI Commands
const stdin = process.openStdin()
stdin.addListener("data", async(input) => {
	// Get Arguments
	const args = input.toString().trim().split(' ')
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] RECIEVED COMMAND [${input.toString().trim().toUpperCase()}]`)

	// ADDBAL
	if (args[0].toUpperCase() === 'ADDBAL') {
		if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] ADDED ${args[2]}€ TO ${args[1]}`)
			bot.money.add(false, args[1].toString(), Number(args[2]))
		} else {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: ADDBAL [USERID] [AMOUNT]`)
		}
	}

	// REMBAL
	if (args[0].toUpperCase() === 'REMBAL') {
		if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] REMOVED ${args[2]}€ FROM ${args[1]}`)
			bot.money.rem(false, args[1].toString(), Number(args[2]))
		} else {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: REMBAL [USERID] [AMOUNT]`)
		}
	}

	// SETBAL
	if (args[0].toUpperCase() === 'SETBAL') {
		if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] SET BALANCE OF ${args[1]} TO ${args[2]}€`)
			bot.money.set(false, args[1].toString(), Number(args[2]))
		} else {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: SETBAL [USERID] [AMOUNT]`)
		}
	}

	// EVAL
	if (args[0].toUpperCase() === 'EVAL') {
		if (typeof args[1] !== 'undefined') {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] RESULT OF EVAL:`)
			args.shift()

			try {
				console.log(await eval(args.join(' ')))
			} catch(e) {
				console.log(e)
				console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] EVAL RETURNED AN ERROR`)
			}
		} else {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: EVAL [COMMAND]`)
		}
	}
})

{(async() => {
	// Show Logo
	console.log(' ')
	console.log('  /$$$$$$            /$$$$$$$   /$$$$$$  /$$$$$$$$')
	console.log(' /$$$_  $$          | $$__  $$ /$$__  $$|__  $$__/')
	console.log('| $$$$\\ $$ /$$   /$$| $$  \\ $$| $$  \\ $$   | $$   ')
	console.log('| $$ $$ $$|  $$ /$$/| $$$$$$$ | $$  | $$   | $$   ')
	console.log('| $$\\ $$$$ \\  $$$$/ | $$__  $$| $$  | $$   | $$   ')
	console.log('| $$ \\ $$$  |$$  $$ | $$  \\ $$| $$  | $$   | $$   ')
	console.log('|  $$$$$$/ /$$/\\  $$| $$$$$$$/|  $$$$$$/   | $$   ')
	console.log(' \\______/ |__/  \\__/|_______/  \\______/    |__/   ')
	console.log(' ')
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
	console.log(' ')

	// Database Migrations
	const migrator = async(conn: pg.Pool) => {
		const migrations = getAllFilesFilter('./migrations', '.js')
		for (const file of migrations) {
			const migration = (await import(file)).default.default

			const status = await migration.migrate(conn)
			if (status) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] MIGRATED ${migration.data.name}`)
			else console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] DIDNT MIGRATE ${migration.data.name}`)
		}
	}; const db = new pg.Pool({
		host: config.database.oxbot.host,
		database: config.database.oxbot.database,
		user: config.database.oxbot.username,
		password: config.database.oxbot.password,
		ssl: true,
		port: 5432
	}); await migrator(db)

	/// Dashboard
	// Website
	const website = new webserver.routeList()

	website.static('/', './dashboard/dist', {
		preload: true,
		remHTML: true,
		addTypes: true
	})

	if (config.web.dashboard) {
		await webserver.start({
			bind: '0.0.0.0',
			urls: website,
			pages: {
				async notFound(ctr: WebserverInterface) {
					return ctr.printFile('./dashboard/dist/index.html')
				}
			}, port: config.web.ports.dashboard
		}).then((res) => {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED DASHBOARD ON PORT ${res.port}`)
		})
	}

	// API
	const rateLimits = new Map()
	const api = new webserver.routeList()

	api.load('./apis')

	if (config.web.api) {
		await webserver.start({
			bind: '0.0.0.0',
			cors: true,
			proxy: true,
			urls: api,
			pages: {
				async notFound(ctr: WebserverInterface) {
					return ctr.print({
						"success": false,
						"message": 'NOT FOUND'
					}).status(404)
				}, async reqError(ctr: WebserverInterface) {
					console.log(ctr.error.stack)
					return ctr.print({
						"success": false,
						"message": 'SERVER ERROR'
					}).status(500)
				}
			}, port: config.web.ports.api,
			events: {
				async request(ctr: WebserverInterface) {
					ctr.api = (await import('./functions/api.js')).default
					ctr.bot = (await import('./functions/bot.js')).default
					ctr.config = config
					ctr.client = client
					ctr.db = db as any
				}
			}, rateLimits: {
				enabled: true,
				message: { "success": false, "message": 'RATE LIMITED' },
				functions: rateLimits,
				list: [
					{
						path: '/auth',
						times: 10,
						timeout: 10000
					},
					{
						path: '/fetch',
						times: 5,
						timeout: 10000
					},
					{
						path: '/check',
						times: 5,
						timeout: 10000
					}
				]
			}
		}).then((res) => {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED API ON PORT ${res.port}`)
		})
	}

	// Bot Stats
	if (config.web.stats) {
		cron.schedule('0 */1 * * *', async() => {
			const axios = (await import('axios')).default

			{ // TOP.GG
				const req = await axios({
					method: 'POST',
					url: `https://top.gg/api/bots/${config.client.id}/stats`,
					validateStatus: () => true,
					headers: {
						Authorization: config.web.keys.topgg.apikey
					}, data: {
						server_count: client.guilds.cache.size
					}
				})

				if (req.status !== 200) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] FAILED TO POST TOPGG STATS`)
				else console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] POSTED TOPGG STATS`)
			}

			{ // DBL.COM
				const req = await axios({
					method: 'POST',
					url: `https://discordbotlist.com/api/v1/bots/${config.client.id}/stats`,
					validateStatus: () => true,
					headers: {
						Authorization: config.web.keys.dbl.apikey
					}, data: {
						guilds: client.guilds.cache.size
					}
				})

				if (req.status !== 200) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] FAILED TO POST DBL STATS`)
				else console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] POSTED DBL STATS`)
			}
		})
	}

	// Start Bot
	console.log(' ')
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING 0xBOT ${config.version}`)
	console.log(' ')
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING COMMANDS AND EVENTS`)
	console.log(' ')

	start(await db.connect())
}) ()}