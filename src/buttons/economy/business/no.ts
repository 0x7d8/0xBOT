import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'business-no'
	},

	async execute(ctx: ButtonInteraction, business: string, userid: string, type: string) {
		// Translate to Business ID
		let businessid: string
		if (business === 'market') businessid = '1'
		if (business === 'parking garage') businessid = '2'
		if (business === 'car dealership') businessid = '3'

		// Calculate Cost
		let cost: number
		if (business === 'market') cost = 150000
		if (business === 'parking garage') cost = 390000
		if (business === 'car dealership') cost = 520000

		// Translate to Business Names
		let name: string
		if (business === 'market') name = 'MARKET'
		if (business === 'parking garage') name = 'PARKING GARAGE'
		if (business === 'car dealership') name = 'CAR DEALERSHIP'
		if (ctx.metadata.language == 'de') {
			if (business === 'market') name = 'SUPERMARKT'
			if (business === 'parking garage') name = 'PARKHAUS'
			if (business === 'car dealership') name = 'AUTOHAUS'
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
			ctx.log(false, `[BTN] BUSINESSBUY : NOTSENDER`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}    

		// Edit Buttons
		ctx.components.rows[0].components[0].setDisabled(true)
		ctx.components.rows[0].components[1].setDisabled(true)
		ctx.components.rows[0].components[0].setStyle(2)

		// Split Button with type
		if (type === 'buy') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
				.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to a **${name}**.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
					.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zu einem **${name}** gesagt.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[BTN] BUSINESSBUY : ${name} : DENY`)
			return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
		} else if (type === 'sell') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » SELL BUSINESS')
				.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to selling his **${name}**.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT VERKAUFEN')
					.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zum verkaufen von seinem **${name}** gesagt.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[BTN] BUSINESSSELL : ${name} : DENY`)
			return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
		}
	}
}