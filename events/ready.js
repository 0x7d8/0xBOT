const { ActivityType } = require('discord.js')
const config = require('../config.json')
const wait = require('node:timers/promises').setTimeout
const commitCount = require('git-commit-count')
const axios = require('axios')
const chalk = require('chalk')

// Connect to Database
const pgP = require('pg').Pool
const db = new pgP({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    ssl: true,
    port: 5432
})

module.exports = {
	name: 'START BOT',
	event: 'ready',
	once: true,
	async execute(client, timed) {
		console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] STARTED AND LOGGED IN AS ${client.user.tag} (${timed}ms)`)
		console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED 0xBOT ${config.version}`)
		console.log(' ')
		console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED LOGGING OF COMMANDS AND ERRORS`)
		console.log(' ')

		// Set Music Player
		const { Player } = require('discord-player')
		global.player = new Player(client)

		// Set Status
		while (true) {
			client.user.setActivity(client.guilds.cache.size + ' Servers', { type: ActivityType.Watching })
			await wait(20000)
			const commits = await commitCount('rotvproHD/0xBOT')
			client.user.setActivity(commits + ' Commits', { type: ActivityType.Watching })
			await wait(20000)
			client.user.setActivity(await bot.stat.get('t-all', 'cmd') + ' Commands Used', { type: ActivityType.Watching })
			await wait(10000)
			client.user.setActivity(await bot.stat.get('t-all', 'btn') + ' Buttons Clicked', { type: ActivityType.Watching })
			await wait(20000)
			const rawvalues = await db.query(`select * from usermoney;`)
			let total = 0
			rawvalues.rows.forEach(element => {
				total = total + parseInt(element.money)
			}); client.user.setActivity('$' + total + ' in Circulation', { type: ActivityType.Watching })
			await wait(20000)
			try {
				const req = await axios({
					method: 'get',
					url: 'https://top.gg/api/bots/1001944224545128588',
					validateStatus: false,
					headers: {
						Authorization: config.web.keys.apikey
					}
				}); const res = req.data

				client.user.setActivity(res.monthlyPoints + ' Votes this Month', { type: ActivityType.Watching })
				await wait(20000)
			} catch (e) { }
		}
	}
}