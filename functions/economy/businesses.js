// Connect to Database
const config = require('../../config.json')
const pgP = require('pg').Pool
const db = new pgP({
    ost: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    port: 5432
})

// Get Function
exports.get = (userid, type) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userid])
    if (data.rowCount !== 1) { return ful(0) }
    if (!type) {
        return ful(data.rows[0].txtvalue)
    } else {
        return ful(data.rows[0].intvalue)
    }
})

// Set Function
exports.set = (userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, $2, 0)`, [
            userid,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userbusinesses set txtvalue = $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.add = (userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, 0, $2)`, [
            userid,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userbusinesses set intvalue = intvalue + $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Rem Function
exports.rem = (userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into userbusinesses values ($1, 0, 0)`, [
            userid
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userbusinesses set intvalue = intvalue - $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Del Function
exports.del = (userid) => new Promise(async ful => {
    const data = await db.query(`select * from userbusinesses where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        return ful('N-EXIST')
    } else {
        await db.query(`delete from userbusinesses where userid = $1;`, [
            userid
        ]); return ful('Y-DELETE')
    }
})