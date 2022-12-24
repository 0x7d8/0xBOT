import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('donate')
		.setDMPermission(false)
		.setDescription('DONATE THE BOT')
		.setDescriptionLocalizations({
			de: 'SPENDE DEM BOT'
		}),

	async execute(ctx: CommandInteraction) {
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:DONATE:1024397357988720711> » DONATE')
			.setDescription(`
				» Link
				https://donate.rjansen.de

				» QR Code
			`).setImage('https://img.rjansen.de/bot/donate.png')
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:DONATE:1024397357988720711> » SPENDEN')
				.setDescription(`
					» Link
					https://donate.rjansen.de

					» QR Code
				`).setImage('https://img.rjansen.de/bot/donate.png')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Correct Response
		ctx.log(false, `[CMD] DONATE <3`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}