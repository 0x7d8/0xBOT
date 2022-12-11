import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('donate')
		.setDMPermission(false)
		.setDescription('DONATE THE BOT')
		.setDescriptionLocalizations({
			de: 'SPENDE DEM BOT'
		}),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:DONATE:1024397357988720711> » DONATE')
			.setDescription('**»» DONATE**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
			.setImage("https://img.rjansen.de/bot/donate.png")
			.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:DONATE:1024397357988720711> » SPENDEN')
				.setDescription('**»» SPENDEN**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
				.setImage("https://img.rjansen.de/bot/donate.png")
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		// Send Correct Response
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] DONATE <3')
		return interaction.reply({ embeds: [message], ephemeral: true })
	}
}