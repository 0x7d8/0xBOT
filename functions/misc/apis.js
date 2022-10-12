// Connect to Database
const config = require('../../config.json')
const pgP = require('pg').Pool
const db = new pgP({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    port: 5432
})

// Get Function
exports.get = (userid) => new Promise(async ful => {
    const data = await db.query(`select * from userapis where userid = $1;`, [userid])
    if (data.rowCount !== 1) { return ful(0) }
    return ful(data.rows[0].apis)
})

// Set Function
exports.set = (userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from userapis where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into userapis values ($1, $2)`, [
            userid,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userapis set quotes = $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.add = (userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from userapis where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into userapis values ($1, $2)`, [
            userid,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userapis set quotes = quotes + $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Rem Function
exports.rem = (userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from userapis where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into userapis values ($1, 0)`, [
            userid
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userapis set quotes = quotes - $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})