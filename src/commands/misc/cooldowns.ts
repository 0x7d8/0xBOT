import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import ms from "ms"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('cooldowns')
		.setDescription('VIEW COOLDOWNS')
		.setDescriptionLocalizations({
			de: 'SCHAUE COOLDOWNS AN'
		})
		.setDMPermission(false)
		.addUserOption((option: any) =>
			option.setName('user')
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const user = ctx.interaction.options.getUser("user")

		// Get Results
		let embedDesc = '', userobj: typeof ctx.interaction.user
		if (!user) userobj = ctx.interaction.user
		else userobj = user
		const rawvalues = await ctx.db.query(`select name, expires from usercooldowns where userid = $1 and expires / 1000 > extract(epoch from now());`, [userobj.id])

		for (const element of rawvalues.rows) {
			embedDesc += `» ${element.name.toUpperCase()}\n**${ms(Number(element.expires) - Date.now())}**\n`
		}; if (embedDesc === '') { embedDesc = 'Nothing Found.'; if (ctx.metadata.language === 'de') { embedDesc = 'Nichts Gefunden.' } }
		
		// Create Embeds
		let message: any
		if (!user) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BAG:1024389219558367292> » COOLDOWNS')
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BAG:1024389219558367292> » COOLDOWNS')
					.setDescription(embedDesc)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BAG:1024389219558367292> » COOLDOWNS OF ' + user.username)
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BAG:1024389219558367292> » COOLDOWNS VON ' + user.username)
					.setDescription(embedDesc)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Send Message
		ctx.log(false, `[CMD] COOLDOWNS : ${userobj.id}`)
		return ctx.interaction.reply({ embeds: [message] })
	}
}