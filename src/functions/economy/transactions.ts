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

import * as utils from "rjutils-collection"

// Get Function
export const get = async(transactionId: string) => {
	const data = await db.query(`select * from usertransactions where id = $1;`, [transactionId])
	if (data.rowCount !== 1) return 'N-FOUND'

	return {
		id: data.rows[0].id,
		success: data.rows[0].success,
		timestamp: data.rows[0].timestamp,
		sender: {
			id: data.rows[0].senderid,
			amount: data.rows[0].senderamount,
			type: data.rows[0].sendertype
		}, reciever: {
			id: data.rows[0].recieverid,
			amount: data.rows[0].recieveramount,
			type: data.rows[0].recievertype
		}
	}
}

interface log {
	success: boolean
	sender: {
		id: string
		amount: number
		type: string
	}

	reciever: {
		id: string
		amount: number
		type: string
	}
}

// Log Function
export const log = async(json: log) => {
	const transactionId = utils.randomStr({
		length: 20,
		numbers: true,
		uppercase: true,
		lowercase: true,
		symbols: false,
		exclude: ''
	})

	if (json.sender.id === undefined) json.sender = {
		id: 'empty',
		amount: 0,
		type: 'empty'
	}; if (json.reciever.id === undefined) json.reciever = {
		id: 'empty',
		amount: 0,
		type: 'empty'
	}

	await db.query(`insert into usertransactions values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
		transactionId,
		json.sender.id,
		json.sender.amount,
		json.sender.type,
		json.reciever.id,
		json.reciever.amount,
		json.reciever.type,
		json.success,
		(Math.floor(+new Date() / 1000))
	]); return {
		success: true,
		id: transactionId
	}
}