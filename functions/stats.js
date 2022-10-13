// Connect to Database
const config = require('../config.json')
const pgP = require('pg').Pool
const db = new pgP({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    ssl: true,
    port: 5432
})

// Get Function
exports.get = (name, type) => new Promise(async ful => {
    const data = await db.query(`select * from stats where name = $1 and type = $2;`, [name, type])
    if (data.rowCount !== 1) { return ful(0) }
    return ful(data.rows[0].value)
})

// Set Function
exports.set = (name, type, value) => new Promise(async ful => {
    const data = await db.query(`select * from stats where name = $1 and type = $2;`, [name, type])
    if (data.rowCount !== 1) {
        await db.query(`insert into stats values ($1, $2, $3)`, [
            name,
            type,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update stats set value = $1 where name = $2 and type = $3;`, [
            value,
            name,
            type
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.add = (name, type, value) => new Promise(async ful => {
    const data = await db.query(`select * from stats where name = $1 and type = $2;`, [name, type])
    if (data.rowCount !== 1) {
        await db.query(`insert into stats values ($1, $2, $3)`, [
            name,
            type,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update stats set value = value + $1 where name = $2 and type = $3;`, [
            value,
            name,
            type
        ]); return ful('Y-WRITE')
    }
})