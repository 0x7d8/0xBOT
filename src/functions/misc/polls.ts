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
export const get = async(messageId: string, userId: string) => {
    const data = await db.query(`select * from userpolls where messageid = $1 and userid = $2;`, [messageId, userId])
    if (data.rowCount !== 1) return ''

    return data.rows[0].vote
}

// Set Function
export const set = async(messageId: string, userId: string, value: boolean) => {
    const data = await db.query(`select * from userpolls where messageid = $1 and userid = $2;`, [messageId, userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userpolls values ($1, $2, $3)`, [
            messageId,
            userId,
            value
        ])
    } else {
        await db.query(`update userpolls set vote = $1 where messageId = $2 and userId = $3;`, [
            value,
            messageId,
            userId
        ])
    }
}

// Del Function
export const del = async(messageId: string, userId: string) => {
    await db.query(`delete from userpolls where messageid = $1 and userid = $2;`, [messageId, userId])
}