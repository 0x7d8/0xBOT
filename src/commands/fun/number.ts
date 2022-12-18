import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('number')
		.setDMPermission(false)
		.setDescription('GENERATE A NUMBER')
		.setDescriptionLocalizations({
			de: 'GENERIERE EINE NUMMER'
		})
		.addIntegerOption((option: any) =>
			option.setName('min')
				.setDescription('THE MIN AMOUNT')
				.setDescriptionLocalizations({
					de: 'DAS MINIMUM'
				})
				.setRequired(true))
		.addIntegerOption((option: any) =>
			option.setName('max')
				.setDescription('THE MAX AMOUNT')
				.setDescriptionLocalizations({
					de: 'DAS MAXIMUM'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const min = ctx.getOption('min') as number
		const max = ctx.getOption('max') as number
		const res = ctx.bot.random(min, max)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GEAR:1024404241701417011> » RANDOM NUMBER')
  		.setDescription('» Between **' + min + '** and **' + max + '** I choose **' + res + '**!')
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » ZUFÄLLIGE NUMMER')
  			.setDescription('» Zwischen **' + min + '** und **' + max + '** wähle ich **' + res + '**!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] NUMBER : ${min} : ${max} : ${res}`)
		return ctx.interaction.reply({ embeds: [message] })
	}
}