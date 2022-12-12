import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDMPermission(false)
		.setDescription('VOTE FOR THE BOT')
		.setDescriptionLocalizations({
			de: 'VOTE FÜR DEN BOT'
		}),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Create Button
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('TOP.GG')
					.setURL('https://top.gg/bot/1001944224545128588/vote')
					.setStyle(ButtonStyle.Link),

				new ButtonBuilder()
					.setLabel('DBL.EU')
					.setURL('https://discord-botlist.eu/vote/1001944224545128588')
					.setStyle(ButtonStyle.Link),
			)
		
		// Create Embed
	   	let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GLOBE:1024403680503529583> » VOTE')
  			.setDescription('» Click below to go to Vote for the Bot!')
			.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » VOTEN')
  				.setDescription('» Klicke unten um für den Bot zu voten!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}
		
		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTE')
		return interaction.reply({ embeds: [message], components: [row as any], ephemeral: true })
	}
}