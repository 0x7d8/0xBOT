const { GuildMemberRemove } = require('discord.js').Events

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

module.exports = {
	name: 'MEMBER LEAVE',
	event: GuildMemberRemove,
	once: false,
	async execute(interaction) {
		await db.query(`update usermoney set guilds = array_remove(guilds, $1) where userid = $2;`, [
            interaction.guild.id,
            interaction.user.id
        ])
	}
}