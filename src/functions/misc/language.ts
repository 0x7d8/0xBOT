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
export const get = async(name: string) => {
	const data = await db.query(`select * from languages where name = $1;`, [name])
	if (data.rowCount !== 1) return true

	return data.rows[0].value
}

// Set Function
export const set = async(name: string, value: string) => {
	const data = await db.query(`select * from languages where name = $1;`, [name])
	if (data.rowCount !== 1) {
		await db.query(`insert into languages values ($1, $2)`, [
			name,
			value
		])
	} else {
		await db.query(`update languages set value = $1 where name = $2;`, [
			value,
			name
		])
	}
}