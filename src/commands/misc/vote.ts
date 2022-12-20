import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDMPermission(false)
		.setDescription('VOTE FOR THE BOT')
		.setDescriptionLocalizations({
			de: 'VOTE FÜR DEN BOT'
		}),

	async execute(ctx: CommandInteraction) {
		// Create Button
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('TOP.GG')
					.setURL('https://top.gg/bot/1001944224545128588/vote')
					.setStyle(ButtonStyle.Link),

				new ButtonBuilder()
					.setLabel('DBL.COM')
					.setURL('https://discordbotlist.com/bots/0xbot/upvote')
					.setStyle(ButtonStyle.Link),
			)
		
		// Create Embed
	   	let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GLOBE:1024403680503529583> » VOTE')
  		.setDescription(`» Click below to go to Vote for the Bot!`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » VOTEN')
  			.setDescription(`» Klicke unten um für den Bot zu Voten!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Send Message
		ctx.log(false, `[CMD] VOTE`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any], ephemeral: true })
	}
}