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

// Create Client
import { PermissionsBitField } from "discord.js"
import { Client, GatewayIntentBits } from "discord.js"
const client = new Client({ intents: [
	GatewayIntentBits.Guilds
] }); client.login(config.client.token)

export const checkSession = async(accessToken: string, tokenType: string, userid: string, guildid: string) => {
	const axios = (await import('axios')).default
	const dbuser = await db.query(`select * from usersessions where userid = $1 and token = $2 and tokentype = $3;`, [
		userid,
		accessToken,
		tokenType
	]); if (dbuser.rowCount === 0 || dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
		// Clear Rows
		if (dbuser.rowCount > 0 && dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
			await db.query(`delete from usersessions where userid = $1 and token = $2;`, [
				userid,
				accessToken
			])
		}

		try {
			const req = await axios.get('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${tokenType} ${accessToken}`
				}
			}); const res = req.data
			if (res.id !== userid) return false

			const guild = await client.guilds.fetch(guildid)
			const user = await guild.members.fetch(userid)
			if (user.permissions.has(PermissionsBitField.Flags.Administrator)) {
				await db.query(`insert into usersessions values ($1, $2, $3, $4);`, [
					userid,
					accessToken,
					tokenType,
					(Math.floor(+new Date() / 1000))+150
				]); return true
			} else return false
		} catch(e) { return false }
	} else {
		try {
			const guild = await client.guilds.fetch(guildid)
			const user = await guild.members.fetch(userid)
			if (user.permissions.has(PermissionsBitField.Flags.Administrator)) { return true }
		} catch(e) { return false }
	}
}

const mailcache = new Map()
export const checkEmail = async(accessToken: string, tokenType: string, userid: string, email: string) => {
	const axios = (await import('axios')).default

	const dbuser = mailcache.get(userid+email)
	if (typeof dbuser === 'undefined') {
		try {
			const req = await axios.get('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${tokenType} ${accessToken}`
				}
			}); const res = req.data
			if (res.id !== userid) return false
			if (res.email !== email) return false

			mailcache.set(userid+email, true)
			return true
		} catch(e) { return false }
	} else return true
}