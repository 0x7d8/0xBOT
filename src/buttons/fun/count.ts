import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'count'
	},

	async execute(ctx: ButtonInteraction, type: string) {
		// Get Count
		const cache = ctx.interaction.message.embeds
		let number = Number(cache[0].description.toString().match(/\d+/g) as any)

		// Check if Number is Negative
		if (typeof ctx.interaction.message.components[0].components[1] !== 'undefined') {
			if (number === 1) {
				(ctx.interaction.message.components[0].components[1].data.disabled as boolean) = true
				await ctx.interaction.message.edit({ components: ctx.interaction.message.components })
			} else {
				(ctx.interaction.message.components[0].components[1].data.disabled as boolean) = false
				await ctx.interaction.message.edit({ components: ctx.interaction.message.components })
			}
		}

		// Count Number
		if (type === 'plus') number++
		else number--

		// Create Embeds
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:INFINITE:1024406060380979300> » COUNTING')
			.setDescription('» Lets Count! Current Number: **' + number + '**')
			.setFooter({ text: '» ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
				.setDescription('» Komm Zählen! Aktuelle Nummer: **' + number + '**')
				.setFooter({ text: '» ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[BTN] COUNT : ${number}`)
		return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components })
	}
}