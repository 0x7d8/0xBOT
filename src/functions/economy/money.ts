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
export const get = async(userId: string) => {
	const data = await db.query(`select money from usermoney where userid = $1;`, [userId])
	if (data.rowCount !== 1) return 0

	return data.rows[0].money
}

// Set Function
export const set = async(guildId: any, userId: string, value: number) => {
	const data = await db.query(`select null from usermoney where userid = $1;`, [userId])
	if (data.rowCount !== 1) {
		await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
			userId,
			value,
			guildId
		])
	} else {
		if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
			await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId])
		}; await db.query(`update usermoney set money = $1 where userid = $2;`, [
			value,
			userId
		])
	}
}

// Add Function
export const add = async(guildId: any, userId: string, value: number) => {
	const data = await db.query(`select null from usermoney where userid = $1;`, [userId])
	if (data.rowCount !== 1) {
		await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
			userId,
			value,
			guildId
		])
	} else {
		if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
			await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId])
		}; await db.query(`update usermoney set money = money + $1 where userid = $2;`, [
			value,
			userId
		])
	}
}

// Rem Function
export const rem = async(guildId: any, userId: string, value: number) => {
	const data = await db.query(`select null from usermoney where userid = $1;`, [userId])
	if (data.rowCount !== 1) {
		await db.query(`insert into usermoney values ($1, 0, array[$2]);`, [
			userId,
			guildId
		])
	} else {
		if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
			await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId])
		}; await db.query(`update usermoney set money = money - $1 where userid = $2;`, [
			value,
			userId
		])
	}
}