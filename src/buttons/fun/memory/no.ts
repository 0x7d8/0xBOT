import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
	data: {
		name: 'memory-no'
	},

	async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string) {
		// Get Users
		const cache = interaction.message.embeds
		const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@")
		const [ sender, reciever ] = description

		// Check if User is Authorized
		if (interaction.user.id !== reciever && interaction.user.id !== sender) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» <@' + reciever + '> or <@' + sender + '> has to decide this!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» <@' + reciever + '> oder <@' + sender + '> muss das entscheiden!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : NO : NOTALLOWED')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Answer Timeout Function
		bot.memory.delete('TIMEOUT-' + sender + '-' + interaction.message.id)

		// Edit Buttons
		{
			(interaction.message.components[0].components[0].data.disabled as boolean) = true;
			(interaction.message.components[0].components[1].data.disabled as boolean) = true;
			(interaction.message.components[0].components[0] as any).data.style = 2;
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
			.setDescription('» <@' + interaction.user.id + '> said **NO**.')
			.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
				.setDescription('» <@' + interaction.user.id + '> hat **NEIN** gesagt.')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + sender + ' : DENY')
		return interaction.update({ content: '', embeds: [message], components: interaction.message.components })
	}
}