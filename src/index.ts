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
import { default as axios } from "axios"
import config from "@config"

import WebserverInterface from "@interfaces/Webserver.js"
import * as webserver from "rjweb-server"

// Create Client
import { Client, GatewayIntentBits } from "discord.js"
const client = new Client({ intents: [
	GatewayIntentBits.Guilds
] }); client.login(config.client.token)

import * as apiFunctions from "@functions/api.js"
import * as botFunctions from "@functions/bot.js"
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
	const websiteRoutes = new webserver.routeList()

	websiteRoutes.static('/', './dashboard/dist', {
		preload: true,
		remHTML: true,
		addTypes: true
	})

	websiteRoutes.event('notfound', async(ctr: WebserverInterface) => {
		return ctr.printFile('./dashboard/dist/index.html')
	}); websiteRoutes.event('request', async(ctr: WebserverInterface) => {
		if (!ctr.headers.get('user-agent').startsWith('Uptime-Kuma')) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [WEB] [${ctr.url.method.toUpperCase()}] ${ctr.url.pathname}`)
	})

	if (config.web.dashboard) {
		await webserver.start({
			bind: '0.0.0.0',
			routes: websiteRoutes,
			port: config.web.ports.dashboard
		}).then((res) => {
			console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED DASHBOARD ON PORT ${res.port}`)
		})
	}

	// API
	const rateLimits = new Map()
	const apiRoutes = new webserver.routeList()

	apiRoutes.load('./apis')

	apiRoutes.event('notfound', async(ctr: WebserverInterface) => {
		return ctr.status(404).print({
			"success": false,
			"message": 'NOT FOUND'
		})
	}); apiRoutes.event('request', async(ctr: WebserverInterface) => {
		ctr.setCustom('api', apiFunctions)
		ctr.setCustom('bot', botFunctions)
		ctr.setCustom('config', config)
		ctr.setCustom('client', client)
		ctr.setCustom('db', db as any)

		if (!ctr.headers.get('user-agent').startsWith('Uptime-Kuma')) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [API] [${ctr.url.method}] ${ctr.url.pathname}`)
	}); apiRoutes.event('error', async(ctr: WebserverInterface<any, true>) => {
		console.log(ctr.error.stack)
		return ctr.status(500).print({
			"success": false,
			"message": 'SERVER ERROR'
		})
	})

	if (config.web.api) {
		await webserver.start({
			bind: '0.0.0.0',
			cors: true,
			proxy: true,
			routes: apiRoutes,
			port: config.web.ports.api,
			rateLimits: {
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