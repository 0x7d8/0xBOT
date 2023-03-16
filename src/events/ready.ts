import { Events, ActivityType } from "discord.js"
import { setTimeout as wait } from "timers/promises"
import axios from "axios"
import simpleGit from "simple-git"

const git = simpleGit()

// Connect to Database
import config from "@config"
import { default as pg } from "pg"
const db = new pg.Pool({
	host: config.database.oxbot.host,
	database: config.database.oxbot.database,
	user: config.database.oxbot.username,
	password: config.database.oxbot.password,
	port: 5432,
	ssl: true
})

import * as bot from "@/functions/bot"
import Client from "@/interfaces/Client"
export default {
	name: 'START BOT',
	event: Events.ClientReady,
	once: true,

	async execute(client: Client, timed: number) {
		// Log
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] STARTED AND LOGGED IN AS ${client.user?.tag} (${timed}ms)`)
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED 0xBOT ${config.version}`)
		console.log(' ')
		const dblReq = await axios({
			method: 'POST',
			url: `https://discordbotlist.com/api/v1/bots/${config.client.id}/commands`,
			validateStatus: () => true,
			headers: {
				Authorization: config.web.keys.dbl.apikey
			}, data: client.commands.map((command) => ({ ...command.data, type: 1 }))
		}); console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${dblReq.status}] POSTED COMMANDS TO DBL`)
		console.log(' ')
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED LOGGING OF COMMANDS AND ERRORS`)
		console.log(' ')

		// Set Status
		while (!+[]) {
			client.user?.setActivity(`${client.guilds.cache.size} Servers`, { type: ActivityType.Watching })
			await wait(20000)

			client.user?.setActivity(`${(await git.log()).total} Commits`, { type: ActivityType.Watching })
			await wait(20000)

			client.user?.setActivity(`${await bot.stat.get('t-all', 'cmd')} Commands Used`, { type: ActivityType.Watching })
			await wait(10000)

			client.user?.setActivity(`${await bot.stat.get('t-all', 'btn')} Buttons Clicked`, { type: ActivityType.Watching })
			await wait(20000)

			const rawvalues = await db.query(`select * from usermoney;`); let total = 0
			rawvalues.rows.forEach((user: { money: string }) => total += Number(user.money) )
			client.user?.setActivity(`\$${total} in Circulation`, { type: ActivityType.Watching })
			await wait(20000)

			try {
				const req = await axios({
					method: 'GET',
					url: 'https://status.0xbot.de/api/status-page/heartbeat/all',
					validateStatus: false,
					headers: {}
				} as any); const res = req.data

				client.user.setActivity(`${Math.round((res.uptimeList['1_24'] * 100) * 100) / 100}% Bot Uptime`, { type: ActivityType.Watching })
				await wait(20000)
			} catch (err) { }
		}
	}
}