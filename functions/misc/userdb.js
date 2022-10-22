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

// Login
const bot = require('../bot')
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
	    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
	    GatewayIntentBits.GuildMessages,
	    GatewayIntentBits.MessageContent
    ]
}); client.login(config.client.token)

// Get Function
exports.get = (userId) => new Promise(async ful => {
    const data = await db.query(`select * from userinfos where userid = $1;`, [userId])

    if (isNaN(userId.slice(-1))) return ful({
        userid: userId,
        username: "unknown",
        usertag: "unknown",
        avatar: "unknown"
    })

    if (data.rowCount !== 1) {
        const user = await client.users.fetch(userId).catch((e) => { return ful('N-FETCHABLE') } )
        bot.userdb.add(user)
        return ful({
            userid: user.id,
            username: user.username,
            usertag: user.discriminator,
            avatar: user.avatar
        })
    }

    return ful({
        userid: data.rows[0].userid,
        username: data.rows[0].username,
        usertag: data.rows[0].discriminator,
        avatar: data.rows[0].avatar
    })
})

// Add Function
exports.add = (json) => new Promise(async ful => {
    const data = await db.query(`select * from userinfos where userid = $1;`, [json.id])

    if (data.rowCount !== 1) {
        await db.query(`insert into userinfos values ($1, $2, $3, $4)`, [
            json.id,
            json.username,
            json.discriminator,
            json.avatar
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userinfos set username = $1, discriminator = $2, avatar = $3 where userid = $4;`, [
            json.username,
            json.discriminator,
            json.avatar,
            json.id
        ]); return ful('Y-WRITE')
    }
})