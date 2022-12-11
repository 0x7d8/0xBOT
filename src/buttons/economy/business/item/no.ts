import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
	data: {
		name: 'item-no'
	},

	async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, itemid: string, userid: string, type: string, amount: number) {
		// Translate to Item Names
		let name: string
		if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMAL BOMB'
		if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMB'
		if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMB'
		if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMB'
		if (lang == 'de') {
			if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMALE BOMBE'
			if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE'
			if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMBE'
			if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMBE'
		}

		// Check if User is Authorized
		if (interaction.user.id !== userid) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» This choice is up to <@' + userid + '>!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» Diese Frage ist für <@' + userid + '>!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : NOTSENDER')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}    

		// Edit Buttons
		{
			(interaction.message.components[0].components[0].data.disabled as boolean) = true;
			(interaction.message.components[0].components[1].data.disabled as boolean) = true;
			(interaction.message.components[0].components[1] as any).data.style = 2;
		}

		// Split Button with type
		if (type === 'buy') {
			// Create Embed
			let message: any
			if (amount === 1) {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
					.setDescription('» <@' + interaction.user.id + '> said **NO** to a **' + name + '**.')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

				if (lang === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
						.setDescription('» <@' + interaction.user.id + '> hat **NEIN** zu einer **' + name + '** gesagt.')
						.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
				}
			} else {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
					.setDescription('» <@' + interaction.user.id + '> said **NO** to **' + amount + 'x** **' + name + '**.')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

				if (lang === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
						.setDescription('» <@' + interaction.user.id + '> hat **NEIN** zu **' + amount + 'x** **' + name + '** gesagt.')
						.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
				}
			}

			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + amount + 'x : ' + itemid.toUpperCase() + ' : DENY')
			return interaction.update({ embeds: [message], components: interaction.message.components })
		} else if (type === 'sell') {
			
		}
	}
}