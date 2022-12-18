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
export const get = async(name: string, type: string) => {
	const data = await db.query(`select value from stats where name = $1 and type = $2;`, [name, type])
	if (data.rowCount !== 1) return 0

	return data.rows[0].value
}

// Set Function
export const set = async(name: string, type: string, value: number) => {
	const data = await db.query(`select null from stats where name = $1 and type = $2;`, [name, type])
	if (data.rowCount !== 1) {
		await db.query(`insert into stats values ($1, $2, $3)`, [
			name,
			type,
			value
		])
	} else {
		await db.query(`update stats set value = $1 where name = $2 and type = $3;`, [
			value,
			name,
			type
		])
	}
}

// Add Function
export const add = async(name: string, type: string, value: number) => {
	const data = await db.query(`select null from stats where name = $1 and type = $2;`, [name, type])
	if (data.rowCount !== 1) {
		await db.query(`insert into stats values ($1, $2, $3)`, [
			name,
			type,
			value
		])
	} else {
		await db.query(`update stats set value = value + $1 where name = $2 and type = $3;`, [
			value,
			name,
			type
		])
	}
}