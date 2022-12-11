import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDMPermission(false)
		.setDescription('THE BOT PING')
		.setDescriptionLocalizations({
			de: 'DER BOT PING'
		}),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Set Variables
		const ping = client.ws.ping

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
				.setDescription('» The Bot Ping is **' + ping + 'ms**!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
				.setDescription('» Der Ping vom Bot ist **' + ping + 'ms**!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		// Send Correct Response
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PING : ' + ping + 'ms')
		return interaction.reply({ embeds: [message], ephemeral: true })
	}
}