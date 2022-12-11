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

// Get Function
export const get = async(guildId: string, setting: string) => {
	const data = await db.query(`select * from guildsettings where guildid = $1 and setting = $2;`, [guildId, setting])
	if (data.rowCount !== 1) return true

	return data.rows[0].value
}

// Set Function
export const set = async(guildId: string, setting: string, value: boolean) => {
	const data = await db.query(`select * from guildsettings where guildid = $1 and setting = $2;`, [guildId, setting])
	if (data.rowCount !== 1) {
		await db.query(`insert into guildsettings values ($1, $2, $3)`, [
			guildId,
			setting,
			value
		])
	} else {
		await db.query(`update guildsettings set value = $1 where guildid = $2 and setting = $3;`, [
			value,
			guildId,
			setting
		])
	}
}