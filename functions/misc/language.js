// Connect to Database
const config = require('../../config.json')
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
exports.get = (name) => new Promise(async ful => {
    const data = await db.query(`select * from languages where name = $1;`, [name])
    if (data.rowCount !== 1) { return ful(true) }
    return ful(data.rows[0].language)
})

// Set Function
exports.set = (name, value) => new Promise(async ful => {
    const data = await db.query(`select * from languages where name = $1;`, [name])
    if (data.rowCount !== 1) {
        await db.query(`insert into languages values ($1, $2)`, [
            name,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update languages set value = $1 where name = $2;`, [
            value,
            name
        ]); return ful('Y-WRITE')
    }
})