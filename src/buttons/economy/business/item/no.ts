import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'item-no'
	},

	async execute(ctx: ButtonInteraction, itemid: string, userid: string, type: string, amount: number) {
		// Translate to Item Names
		let name: string
		if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMAL BOMB'
		if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMB'
		if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMB'
		if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMB'
		if (ctx.metadata.language == 'de') {
			if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMALE BOMBE'
			if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE'
			if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMBE'
			if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMBE'
		}

		// Check if User is Authorized
		if (ctx.interaction.user.id !== userid) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» This choice is up to <@${userid}>!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Diese Frage ist für <@${userid}>!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] ITEMBUY : NOTSENDER`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}    

		// Edit Buttons
		{
			(ctx.interaction.message.components[0].components[0].data.disabled as boolean) = true;
			(ctx.interaction.message.components[0].components[1].data.disabled as boolean) = true;
			(ctx.interaction.message.components[0].components[1] as any).data.style = 2;
		}

		// Split Button with type
		if (type === 'buy') {
			// Create Embed
			let message: any
			if (amount === 1) {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
					.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to a **${name}**.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

				if (ctx.metadata.language === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
						.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zu einer **${name}** gesagt.`)
						.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
				}
			} else {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
					.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to **${amount}x** **${name}**.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

				if (ctx.metadata.language === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
						.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zu **${amount}x** **${name}** gesagt.`)
						.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
				}
			}

			// Send Message
			ctx.log(false, `[BTN] ITEMBUY : ${amount}x : ${itemid.toUpperCase()} : DENY`)
			return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components })
		} else if (type === 'sell') {
			
		}
	}
}