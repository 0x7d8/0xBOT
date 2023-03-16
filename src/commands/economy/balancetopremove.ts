import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { PermissionFlagsBits } from "discord-api-types/v10"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('balancetopremove')
		.setDMPermission(false)
		.setDescription('REMOVE SOMEONE FROM BALANCE TOP')
		.setDescriptionLocalizations({
			de: 'ENTFERNE JEMANDEN VON TOP KONTOSTÄNDEN'
		})
		.addUserOption((option) =>
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

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:WALLET:1024387370793050273> » TOP BALANCE REMOVAL')
  		.setDescription(`
				» Successfully removed <@${user.id}> from your Servers Top Balance!
				If this User interacts with money again he will be on the List again.
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE ENTFERNUNG')
  			.setDescription(`
					» Erfolgreich <@${user.id}> von der Top Kontostände Liste des Servers entfernt!
					Wenn dieser Nutzer wieder mit Geld interagiert, wird er wieder auf der Liste sein.
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Remove User from Top List
		await ctx.db.query(`update usermoney set guilds = array_remove(guilds, $1) where userid = $2;`, [ctx.interaction.guild.id, user.id])

		// Send Message
		ctx.log(false, `[CMD] BALANCETOPREMOVE : ${user.id}`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true }).catch(() => {})
	}
}