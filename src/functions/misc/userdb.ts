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

// Login
import * as bot from "@functions/bot.js"
import { Client, GatewayIntentBits } from "discord.js"
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
}); client.login(config.client.token)

// Get Function
export const get = async(userId: string) => {
	const data = await db.query(`select * from userinfos where userid = $1;`, [userId])

	if (!bot.isNumber(userId)) return {
		userid: userId,
		username: "unknown",
		usertag: "unknown",
		avatar: "unknown"
	}

	if (data.rowCount !== 1) {
		let cont = true
		const user: any = await client.users.fetch(userId).catch(() => { cont = false })

		if (cont) {
			bot.userdb.add(user)

			return {
				userid: user.id,
				username: user.username,
				usertag: user.discriminator,
				avatar: user.avatar
			}
		} else return
	}

	return {
		userid: data.rows[0].userid,
		username: data.rows[0].username,
		usertag: data.rows[0].discriminator,
		avatar: data.rows[0].avatar
	}
}

interface add {
	id: string
	username: string
	discriminator: string
	avatar: string
}

// Add Function
export const add = async(json: add) => {
	const data = await db.query(`select null from userinfos where userid = $1;`, [json.id])
	if (data.rowCount !== 1) {
		await db.query(`insert into userinfos values ($1, $2, $3, $4)`, [
			json.id,
			json.username,
			json.discriminator,
			json.avatar
		])
	} else {
		await db.query(`update userinfos set username = $1, discriminator = $2, avatar = $3 where userid = $4;`, [
			json.username,
			json.discriminator,
			json.avatar,
			json.id
		])
	}
}