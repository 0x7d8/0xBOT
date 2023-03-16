import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@/interfaces/ButtonInteraction"
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
				ctx.components.rows[0].components[1].setDisabled(true)
				await ctx.interaction.message.edit({ components: (ctx.components.getAPI()) })
			} else {
				ctx.components.rows[0].components[1].setDisabled(false)
				await ctx.interaction.message.edit({ components: (ctx.components.getAPI()) })
			}
		}

		// Count Number
		if (type === 'plus') number++
		else number--

		// Create Embeds
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:INFINITE:1024406060380979300> » COUNTING')
			.setDescription(`
				» Current Number
				\`\`\`${number}\`\`\`
			`).setFooter({ text: '» ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
				.setDescription(`
					» Aktuelle Nummer
					\`\`\`${number}\`\`\`
				`).setFooter({ text: '» ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[BTN] COUNT : ${number}`)
		return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
	}
}