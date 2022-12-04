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
export const get = async(userId: string, type: any) => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userId])
    if (data.rowCount !== 1) return 0

    if (type === null) return data.rows[0]
    else if (type === 'value') return data.rows[0].value
    else return parseInt(data.rows[0].amount)
}

// Set Function
export const set = async(userId: string, value: string, amount: number) => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, $2, $3)`, [
            userId,
            value,
            amount
        ])
    } else {
        if (!value) {
            await db.query(`update useritems set amount = $1 where userid = $2;`, [
                amount,
                userId
            ])
        } else {
            await db.query(`update useritems set value = $1 and amount = $2 where userid = $3;`, [
                value,
                amount,
                userId
            ])
        }
    }
}

// Add Function
export const add = async(userId: string, amount: number) => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, 0, $2)`, [
            userId,
            amount
        ])
    } else {
        await db.query(`update useritems set amount = amount + $1 where userid = $2;`, [
            amount,
            userId
        ])
    }
}

// Add Function
export const rem = async(userId: string, amount: number) => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, 0, 0)`, [
            userId
        ])
    } else {
        await db.query(`update useritems set amount = amount - $1 where userid = $2;`, [
            amount,
            userId
        ])
    }
}

// Del Function
export const del = async(userId: string) => {
    await db.query(`delete from useritems where userId = $1;`, [userId])
}