const { EmbedBuilder } = require('discord.js')

import * as bot from "../functions/bot.js"
import Client from "../interfaces/Client.js"
import { ModalSubmitInteraction, Message } from "discord.js"
export default {
	data: {
		name: 'say'
	},
	async execute(interaction: ModalSubmitInteraction, client: Client, lang: string, vote: string) {
		// Set Variables
		const title = interaction.fields.getTextInputValue('say-title')
		const content = interaction.fields.getTextInputValue('say-content')

		// Create Embed
		let message: any
		if (interaction.user.id !== '745619551865012274') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle(title)
  				.setDescription(content)
				.setFooter({ text: '» ' + client.config.version + ' » NOT OFFICIAL' });
			
			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle(title)
  					.setDescription(content)
					.setFooter({ text: '» ' + client.config.version + ' » NICHT OFFIZIELL' });
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle(title)
  				.setDescription(content)
				.setFooter({ text: '» ' + client.config.version });
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[MOD] SAY : ' + title.toUpperCase() + ' : "' + content.toUpperCase() + '"')
		return interaction.reply({ embeds: [message] })
	}
}