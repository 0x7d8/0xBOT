import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { PermissionFlagsBits } from "discord-api-types/v10"

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

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('balancetopremove')
		.setDMPermission(false)
		.setDescription('REMOVE SOMEONE FROM BALANCE TOP')
		.setDescriptionLocalizations({
			de: 'ENTFERNE JEMANDEN VON TOP KONTOSTÄNDEN'
		})
		.addUserOption((option: any) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Set Variables
		const user = interaction.options.getUser("user")
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:WALLET:1024387370793050273> » TOP BALANCE REMOVAL')
  			.setDescription(`» Successfully removed <@${user.id}> from your Servers Top Balance!\nIf this User interacts with money again he will be on the List again.`)
			.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE ENTFERNUNG')
  				.setDescription(`» Erfolgreich <@${user.id}> von der Top Kontostände Liste des Servers entfernt!\nWenn dieser Nutzer wieder mit Geld interagiert, wird er wieder auf der Liste sein.`)
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		await db.query(`update usermoney set guilds = array_remove(guilds, $1) where userid = $2;`, [interaction.guild.id, user.id])

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCETOPREMOVE : ' + user.id)
		return interaction.reply({ embeds: [message], ephemeral: true }).catch(() => {})
	}
}