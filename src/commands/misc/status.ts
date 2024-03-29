import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDMPermission(false)
		.setDescription('GO TO THE STATUS PAGE')
		.setDescriptionLocalizations({
			de: 'GEHE ZUR STATUS SEITE'
		}),

	async execute(ctx: CommandInteraction) {
		// Create Button
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('GO')
					.setURL('https://status.0xbot.de')
					.setStyle(ButtonStyle.Link),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('LOS')
						.setURL('https://status.0xbot.de')
						.setStyle(ButtonStyle.Link),
				)
		}
		
		// Create Embed
	  let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GLOBE:1024403680503529583> » STATUS')
  		.setDescription(`» Click below to go to the Status Page!`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » STATUS')
  			.setDescription(`» Klicke unten um zur Status Seite zu gehen!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Send Message
		ctx.log(false, `[CMD] STATUS`)
		await ctx.interaction.reply({ embeds: [message], components: [row as any], ephemeral: true })
	}
}