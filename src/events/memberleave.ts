import { Events, CommandInteraction } from "discord.js"

// Connect to Database
import config from "@config"
import { default as pg } from "pg"
const db = new pg.Pool({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    port: 5432,
    ssl: true
})

export default {
	name: 'MEMBER LEAVE',
	event: Events.GuildMemberRemove,
	once: false,
	async execute(interaction: CommandInteraction) {
        if (!interaction.guild) return

		await db.query(`update usermoney set guilds = array_remove(guilds, $1) where userid = $2;`, [
            interaction.guild.id,
            interaction.user.id
        ])
	}
}