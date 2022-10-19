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
exports.get = (guildid, setting) => new Promise(async ful => {
    const data = await db.query(`select * from guildsettings where guildid = $1 and setting = $2;`, [guildid, setting])
    if (data.rowCount !== 1) { return ful(true) }
    return ful(!!+data.rows[0].value)
})

// Set Function
exports.set = (guildid, setting, value) => new Promise(async ful => {
    const data = await db.query(`select * from guildsettings where guildid = $1 and setting = $2;`, [guildid, setting])
    if (data.rowCount !== 1) {
        await db.query(`insert into guildsettings values ($1, $2, $3)`, [
            guildid,
            setting,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update guildsettings set value = $1 where guildid = $2 and setting = $3;`, [
            value,
            guildid,
            setting
        ]); return ful('Y-WRITE')
    }
})