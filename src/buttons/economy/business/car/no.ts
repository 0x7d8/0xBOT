import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@/interfaces/ButtonInteraction"
export default {
	data: {
		name: 'car-no'
	},

	async execute(ctx: ButtonInteraction, car: string, userid: string, type: string) {
		// Translate to Car Names
		let name: string
		if (car === 'jeep') name = '2016 JEEP PATRIOT SPORT'
		if (car === 'kia') name = '2022 KIA SORENTO'
		if (car === 'audi') name = 'AUDI R8 COUPE V10'
		if (car === 'tesla') name = 'TESLA MODEL Y'
		if (car === 'porsche') name = '2019 PORSCHE 911 GT2RS'

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
			ctx.log(false, `[BTN] CAR : NOTSENDER`)
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
				.setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
				.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to a **${name}**.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
					.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zu einem **${name}** gesagt.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[BTN] CARBUY : ${name} : DENY`)
			return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
		} else if (type === 'sell') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
				.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to selling his **${name}**.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
					.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zum verkaufen von seinem **${name}** gesagt.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[BTN] CARSELL : ${name} : DENY`)
			return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
		}
	}
}