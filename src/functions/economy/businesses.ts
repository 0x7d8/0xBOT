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
export const get = async(userId: string, type?: boolean) => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) return 0

    if (!type) return data.rows[0].txtvalue
    else return Number(data.rows[0].intvalue)
}

// Set Function
export const set = async(userId: string, value: string) => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, $2, 0)`, [
            userId,
            value
        ])
    } else {
        await db.query(`update userbusinesses set txtvalue = $1 where userid = $2;`, [
            value,
            userId
        ])
    }
}

// Add Function
export const add = async(userId: string, value: number) => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, 0, $2)`, [
            userId,
            value
        ])
    } else {
        await db.query(`update userbusinesses set intvalue = intvalue + $1 where userid = $2;`, [
            value,
            userId
        ])
    }
}

// Rem Function
export const rem = async(userId: string, value: number) => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, 0, 0)`, [
            userId
        ])
    } else {
        await db.query(`update userbusinesses set intvalue = intvalue - $1 where userid = $2;`, [
            value,
            userId
        ])
    }
}

// Del Function
export const del = async(userId: string) => {
    await db.query(`delete from userbusinesses where userid = $1;`, [userId])
}