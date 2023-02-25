import { default as axios } from "axios"

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

export interface SetRequest {
	user: {
		id: string
		name: string
		tag: string
		email: string
		avatar: string | null
	}

	tokens: {
		access: string
		refresh: string
	}

	auth: string
}

export interface GetResponse {
	id: string
	name: string
	avatar: string
	tag: string
	email: string
	tokens: {
		access: string
		refresh: string
	}
}

export const users = {
	set: async(json: SetRequest) => {
		const data = await db.query(`select * from userlogins where id = $1;`, [json.user.id])

		if (data.rowCount !== 1) {
			await db.query(`insert into userlogins values ($1, $2, $3, $4, $5, $6, $7, $8)`, [
				json.user.id,
				json.user.name,
				json.user.tag,
				json.user.email,
				json.user.avatar,
				json.auth,
				json.tokens.access,
				json.tokens.refresh
			])
		} else {
			await db.query(`update userlogins set name = $2, tag = $3, email = $4, avatar = $5, authtoken = $6, accesstoken = $7, refreshtoken = $8 where id = $1;`, [
				json.user.id,
				json.user.name,
				json.user.tag,
				json.user.email,
				json.user.avatar,
				json.auth,
				json.tokens.access,
				json.tokens.refresh
			])
		}
	},

	get: async(authToken: string): Promise<GetResponse> => {
		const data = await db.query(`select * from userlogins where authtoken = $1;`, [authToken])
		if (data.rowCount !== 1) return {
			id: null,
			name: null,
			tag: null,
			avatar: null,
			email: null,
			tokens: {
				access: null,
				refresh: null
			}
		}

		return {
			id: data.rows[0].id,
			name: data.rows[0].name,
			tag: data.rows[0].tag,
			avatar: data.rows[0].avatar,
			email: data.rows[0].email,
			tokens: {
				access: data.rows[0].accesstoken,
				refresh: data.rows[0].refreshtoken
			}
		}
	},

	rem: async(userId: string) => {
		await db.query(`delete from userlogins where id = $1;`, [userId])
	}
}

export const checkAuth = async(authToken: string, guildId: string) => {
	// Get Infos
	const userInfos = await users.get(authToken)
	if (!userInfos.id) return false

	// Check for Session
	const dbuser = await db.query(`select * from usersessions where userid = $1 and token = $2 and tokentype = $3;`, [
		userInfos.id,
		userInfos.tokens.access,
		'Bearer'
	]); if (dbuser.rowCount === 0 || dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
		// Clear Rows
		if (dbuser.rowCount > 0 && dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
			await db.query(`delete from usersessions where userid = $1 and token = $2;`, [
				userInfos.id,
				userInfos.tokens.access
			])
		}

		try {
			const guild = await client.guilds.fetch(guildId)
			const user = await guild.members.fetch(userInfos.id)
			if (user.permissions.has(PermissionsBitField.Flags.Administrator)) {
				await db.query(`insert into usersessions values ($1, $2, $3, $4);`, [
					userInfos.id,
					userInfos.tokens.access,
					'Bearer',
					(Math.floor(+new Date() / 1000))+150
				]); return true
			} else return false
		} catch(e) { return false }
	} else {
		try {
			const guild = await client.guilds.fetch(guildId)
			const user = await guild.members.fetch(userInfos.id)
			if (user.permissions.has(PermissionsBitField.Flags.Administrator)) { return true }
		} catch(e) { return false }
	}
}