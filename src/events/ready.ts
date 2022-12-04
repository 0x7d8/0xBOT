import { Events, ActivityType } from "discord.js"
import { setTimeout as wait } from "timers/promises"

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

import { default as commitCount } from "git-commit-count"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
export default {
	name: 'START BOT',
	event: Events.ClientReady,
	once: true,
	async execute(client: Client, timed: number) {
		const axios = (await import("axios")).default

		// Log
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] STARTED AND LOGGED IN AS ${client.user?.tag} (${timed}ms)`)
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED 0xBOT ${config.version}`)
		console.log(' ')
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED LOGGING OF COMMANDS AND ERRORS`)
		console.log(' ')

		// Set Status
		while (!+[]) {
			client.user?.setActivity(client.guilds.cache.size + ' Servers', { type: ActivityType.Watching })
			await wait(20000)

			const commits = await commitCount()
			client.user?.setActivity(commits + ' Commits', { type: ActivityType.Watching })
			await wait(20000)

			client.user?.setActivity(await bot.stat.get('t-all', 'cmd') + ' Commands Used', { type: ActivityType.Watching })
			await wait(10000)

			client.user?.setActivity(await bot.stat.get('t-all', 'btn') + ' Buttons Clicked', { type: ActivityType.Watching })
			await wait(20000)

			const rawvalues = await db.query(`select * from usermoney;`); let total = 0
			rawvalues.rows.forEach((element) => total += Number(element.money) )
			client.user?.setActivity('$' + total + ' in Circulation', { type: ActivityType.Watching })
			await wait(20000)

			const req = await axios.get('https://top.gg/api/bots/1001944224545128588', {
				headers: {
					Authorization: config.web.keys.apikey
				}
			}); const res = req.data

			client.user?.setActivity(res.monthlyPoints + ' Votes this Month', { type: ActivityType.Watching })
			await wait(20000)
		}
	}
}