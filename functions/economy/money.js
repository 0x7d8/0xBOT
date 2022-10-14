// Connect to Database
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
exports.get = (userid) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userid])
    if (data.rowCount !== 1) { return ful(0) }
    return ful(parseInt(data.rows[0].money))
})

// Set Function
exports.set = (i, userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, $2, {$3})`, [
            userid,
            value,
            i.guild.id
        ]); return ful('Y-CREATE')
    } else {
        if (i != false && !data.rows[0].guilds.includes(i.guild.id)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2`, [i.guild.id, userid])
        }; await db.query(`update usermoney set money = $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.add = (i, userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, $2 , {$3})`, [
            userid,
            value,
            i.guild.id
        ]); return ful('Y-CREATE')
    } else {
        if (i != false && !data.rows[0].guilds.includes(i.guild.id)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2`, [i.guild.id, userid])
        }; await db.query(`update usermoney set money = money + $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})

// Rem Function
exports.rem = (i, userid, value) => new Promise(async ful => {
    const data = await db.query(`select * from usermoney where userid = $1;`, [userid])
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, 0)`, [
            userid
        ]); return ful('Y-CREATE')
    } else {
        if (i != false && !data.rows[0].guilds.includes(i.guild.id)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2`, [i.guild.id, userid])
        }; await db.query(`update usermoney set money = money - $1 where userid = $2;`, [
            value,
            userid
        ]); return ful('Y-WRITE')
    }
})