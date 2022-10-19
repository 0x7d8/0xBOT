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
exports.get = (userId, type) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) { return ful(0) }
    if (!type) {
        return ful(data.rows[0].txtvalue)
    } else {
        return ful(parseInt(data.rows[0].intvalue))
    }
})

// Set Function
exports.set = (userId, value) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, $2, 0)`, [
            userId,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userbusinesses set txtvalue = $1 where userid = $2;`, [
            value,
            userId
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.add = (userId, value) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, 0, $2)`, [
            userId,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userbusinesses set intvalue = intvalue + $1 where userid = $2;`, [
            value,
            userId
        ]); return ful('Y-WRITE')
    }
})

// Rem Function
exports.rem = (userId, value) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, 0, 0)`, [
            userId
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userbusinesses set intvalue = intvalue - $1 where userid = $2;`, [
            value,
            userId
        ]); return ful('Y-WRITE')
    }
})

// Del Function
exports.del = (userId) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        return ful('N-EXIST')
    } else {
        await db.query(`delete from userbusinesses where userid = $1;`, [
            userId
        ]); return ful('Y-DELETE')
    }
})