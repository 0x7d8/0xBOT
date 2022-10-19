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
exports.get = (userId) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userId])
    if (data.rowCount !== 1) { return ful(0) }
    return ful(parseInt(data.rows[0].money))
})

// Set Function
exports.set = (guildId, userId, value) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
            userId,
            value,
            guildId
        ]); return ful('Y-CREATE')
    } else {
        if (guildId != false && !data.rows[0].guilds.includes(guildId)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId])
        }; await db.query(`update usermoney set money = $1 where userid = $2;`, [
            value,
            userId
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.add = (guildId, userId, value) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
            userId,
            value,
            guildId
        ]); return ful('Y-CREATE')
    } else {
        if (guildId != false && !data.rows[0].guilds.includes(guildId)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId])
        }; await db.query(`update usermoney set money = money + $1 where userid = $2;`, [
            value,
            userId
        ]); return ful('Y-WRITE')
    }
})

// Rem Function
exports.rem = (guildId, userId, value) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userId])
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, 0, array[$2]);`, [
            userId,
            guildId
        ]); return ful('Y-CREATE')
    } else {
        if (guildId != false && !data.rows[0].guilds.includes(guildId)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId])
        }; await db.query(`update usermoney set money = money - $1 where userid = $2;`, [
            value,
            userId
        ]); return ful('Y-WRITE')
    }
})