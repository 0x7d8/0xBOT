import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDMPermission(false)
		.setDescription('MAKE A POLL')
		.setDescriptionLocalizations({
			de: 'MACHE EINE UMFRAGE'
		})
		.addStringOption((option) =>
			option.setName('text')
				.setDescription('THE TEXT')
				.setDescriptionLocalizations({
					de: 'DER TEXT'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const question = ctx.getOption('text') as string

		// Create Buttons
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1044959793317691513')
					.setLabel('0 [0%]')
					.setCustomId('POLL-YES')
					.setStyle(ButtonStyle.Success),

				new ButtonBuilder()
					.setEmoji('1044959826914070568')
					.setLabel('0 [0%]')
					.setCustomId('POLL-NO')
					.setStyle(ButtonStyle.Danger),
			)

		// Create Embed
	  let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:POLL:1024391847092703365> » POLL')
  		.setDescription(`
				» Question
				\`\`\`${question}\`\`\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:POLL:1024391847092703365> » ABSTIMMUNG')
  			.setDescription(`
					» Frage
					\`\`\`${question}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Send Message
		ctx.log(false, `[CMD] POLL : ${question.toUpperCase()}`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}