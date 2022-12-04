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
    const data = await db.query(`select * from userapis where userid = $1;`, [userId])
    if (data.rowCount !== 1) return 0

    return parseInt(data.rows[0].apis)
}

// Set Function
export const set = async(userId: string, value: number) => {
    const data = await db.query(`select * from userapis where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userapis values ($1, $2)`, [
            userId,
            value
        ])
    } else {
        await db.query(`update userapis set apis = $1 where userid = $2;`, [
            value,
            userId
        ])
    }
}

// Add Function
export const add = async(userId: string, value: number) => {
    const data = await db.query(`select * from userapis where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userapis values ($1, $2)`, [
            userId,
            value
        ])
    } else {
        await db.query(`update userapis set apis = apis + $1 where userid = $2;`, [
            value,
            userId
        ])
    }
}

// Rem Function
export const rem = async(userId: string, value: number) => {
    const data = await db.query(`select * from userapis where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userapis values ($1, 0)`, [
            userId
        ])
    } else {
        await db.query(`update userapis set apis = apis - $1 where userid = $2;`, [
            value,
            userId
        ])
    }
}