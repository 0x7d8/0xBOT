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
export const get = async(userId: string, stock: string, type: string) => {
	const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
		userId,
		stock,
		type
	])

	if (data.rowCount !== 1 && type === 'used') return 0
	if (data.rowCount !== 1 && type === 'max') return 10
	return Number(data.rows[0].value)
}

// Set Function
export const set = async(userId: string, stock: string, type: string, value: number) => {
	const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
		userId,
		stock,
		type
	])
	if (data.rowCount !== 1) {
		await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
			userId,
			stock,
			type,
			value
		])
	} else {
		await db.query(`update userstocks set value = $1 where userid = $2 and stock = $3 and type = $4;`, [
			value,
			userId,
			stock,
			type
		])
	}
}

// Add Function
export const add = async(userId: string, stock: string, type: string, value: number) => {
	const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
		userId,
		stock,
		type
	])
	if (data.rowCount !== 1) {
		await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
			userId,
			stock,
			type,
			value
		])
		if (type === 'max') {
			await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
				userId,
				stock,
				type
			])
		}
	} else {
		await db.query(`update userstocks set value = value + $1 where userid = $2 and stock = $3 and type = $4;`, [
			value,
			userId,
			stock,
			type
		])
	}
}

// Rem Function
export const rem = async(userId: string, stock: string, type: string, value: number) => {
	const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
		userId,
		stock,
		type
	])
	if (data.rowCount !== 1) {
		await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
			userId,
			stock,
			type,
			value
		])
	} else {
		await db.query(`update userstocks set value = value - $1 where userid = $2 and stock = $3 and type = $4;`, [
			value,
			userId,
			stock,
			type
		])
		if (type === 'max') {
			await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
				userId,
				stock,
				type
			])
		}
	}
}