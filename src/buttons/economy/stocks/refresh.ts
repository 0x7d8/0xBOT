import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@/interfaces/ButtonInteraction"
export default {
	data: {
		name: 'stock-refresh'
	},

	async execute(ctx: ButtonInteraction, stock: string, userid: string, type: string, amount: number) {
		const ms = (await import('pretty-ms')).default

		// Translate to Stock Names
		let name: string
		if (stock === 'green') name = '🟢 GREEN'
		if (stock === 'blue') name = '🔵 BLUE'
		if (stock === 'yellow') name = '🟡 YELLOW'
		if (stock === 'red') name = '🔴 RED'
		if (stock === 'white') name = '⚪ WHITE'
		if (stock === 'black') name = '⚫ BLACK'
		if (stock === 'brown') name = '🟤 BROWN'
		if (stock === 'purple') name = '🟣 PURPLE'
		if (ctx.metadata.language === 'de') {
			if (stock === 'green') name = '🟢 GRÜNE'
			if (stock === 'blue') name = '🔵 BLAUE'
			if (stock === 'yellow') name = '🟡 GELBE'
			if (stock === 'red') name = '🔴 ROTE'
			if (stock === 'white') name = '⚪ WEIßE'
			if (stock === 'black') name = '⚫ SCHWARZE'
			if (stock === 'brown') name = '🟤 BRAUNE'
			if (stock === 'purple') name = '🟣 LILA'
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
			ctx.log(false, `[BTN] STOCK : NOTSENDER`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}    

		// Edit Buttons
		ctx.components.rows[0].components[0].setDisabled(true)
		ctx.components.rows[0].components[1].setDisabled(true)
		ctx.components.rows[0].components[2].setDisabled(true)
		ctx.components.rows[0].components[0].setStyle(2)
		ctx.components.rows[0].components[1].setStyle(2)

		// Calculate Cost
		const cost = amount * ctx.client.stocks[stock]

		// Split Button with type
		if (type === 'buy') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCKS')
				.setDescription(`
					⏲️ New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

					» Do you want to buy **${amount}x** **${name}** Stock for **$${cost}**?
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN KAUFEN')
					.setDescription(`
						⏲️ Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

						» Willst du **${amount}x** **${name}** Aktie für **${cost}€** kaufen?
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] STOCKBUY : REFRESH : ${stock.toUpperCase()} : ${amount} : ${cost}€`)
			return ctx.interaction.update({ embeds: [message] })
		} else if (type === 'sell') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » SELL STOCKS')
				.setDescription(`
					⏲️ New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

					» Do you want to sell **${amount}x** **${name}** Stock for **$${cost}**?
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN VERKAUFEN')
					.setDescription(`
						⏲️ Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

						» Willst du **${amount}x** **${name}** Aktie für **${cost}€** verkaufen?
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] STOCKSELL : REFRESH : ${stock.toUpperCase()} : ${amount} : ${cost}€`)
			return ctx.interaction.update({ embeds: [message] })
		}
	}
}