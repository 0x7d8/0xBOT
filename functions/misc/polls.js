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
exports.get = (messageId, userId) => new Promise(async ful => {
    const data = await db.query(`select * from userpolls where messageid = $1 and userid = $2;`, [messageId, userId])
    if (data.rowCount !== 1) { return ful('') }
    return ful(data.rows[0].vote)
})

// Set Function
exports.set = (messageId, userId, value) => new Promise(async ful => {
    const data = await db.query(`select * from userpolls where messageid = $1 and userid = $2;`, [messageId, userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into userpolls values ($1, $2, $3)`, [
            messageId,
            userId,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userpolls set vote = $1 where messageId = $2 and userId = $3;`, [
            value,
            messageId,
            userId
        ]); return ful('Y-WRITE')
    }
})

// Del Function
exports.del = (messageId, userId) => new Promise(async ful => {
    await db.query(`delete from userpolls where messageid = $1 and userid = $2;`, [messageId, userId])
})