import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('mcver')
		.setDMPermission(false)
		.setDescription('GENERATE A MINECRAFT VERSION')
		.setDescriptionLocalizations({
			de: 'GENERIERE EINE MINECRAFT VERSION'
		}),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const result = ctx.bot.random(1, 20)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:CUBE:1024404832452350032> » RANDOM MINECRAFT VERSION')
  		.setDescription('» I would choose **1.' + result + '**!')
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CUBE:1024404832452350032> » ZUFÄLLIGE MINECRAFT VERSION')
  			.setDescription('» Ich würde **1.' + result + '** nehmen!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] MCVER : 1.${result}`)
		return ctx.interaction.reply({ embeds: [message] })
	}
}