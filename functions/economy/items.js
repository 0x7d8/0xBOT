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
exports.get = (userid, type) => new Promise(async ful => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userid])
    if (data.rowCount !== 1) { return ful(0) }
    if (type === null) {
        return ful(data.rows[0])
    } else if (type === 'value') {
        return ful(data.rows[0].value)
    } else {
        return ful(data.rows[0].amount)
    }
})

// Set Function
exports.set = (userid, value, amount) => new Promise(async ful => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, $2, $3)`, [
            userid,
            value,
            amount
        ]); return ful('Y-CREATE')
    } else {
        if (!value) {
            await db.query(`update useritems set amount = $1 where userid = $2;`, [
                amount,
                userid
            ]); return ful('Y-WRITE')
        } else {
            await db.query(`update useritems set value = $1 and amount = $2 where userid = $3;`, [
                value,
                amount,
                userid
            ]); return ful('Y-WRITE')
        }
    }
})

// Add Function
exports.add = (userid, amount) => new Promise(async ful => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, 0, $2)`, [
            userid,
            amount
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update useritems set amount = amount + $1 where userid = $2;`, [
            amount,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.rem = (userid, amount) => new Promise(async ful => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, 0, 0)`, [
            userid
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update useritems set amount = amount - $1 where userid = $2;`, [
            amount,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Del Function
exports.del = (userid) => new Promise(async ful => {
    const data = await db.query(`select * from useritems where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        return ful('N-EXIST')
    } else {
        await db.query(`delete from useritems where userid = $1;`, [
            userid
        ]); return ful('Y-DELETE')
    }
})