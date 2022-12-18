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
export const get = async(userId: string, name: string) => {
	const data = await db.query(`select expires from usercooldowns where userid = $1 and name = $2;`, [userId, name])
	if (data.rowCount !== 1) return {
		onCooldown: false,
		remaining: 0
	}

	if (Number(data.rows[0].expires) - Date.now() < 0) {
		await db.query(`delete from usercooldowns where name = $1;`, [name])
		return {
			onCooldown: false,
			remaining: 0
		}
	}

	return {
		onCooldown: true,
		remaining: Number(data.rows[0].expires) - Date.now()
	}
}

// Set Function
export const set = async(userId: string, name: string, duration: number) => {
	const expires = Date.now() + duration

	await db.query(`insert into usercooldowns values ($1, $2, $3)`, [
		name,
		userId,
		expires
	])
}