import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'stock-yes'
	},

	async execute(ctx: ButtonInteraction, stock: string, userid: string, type: string, amount: number) {
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

		// Set Variables
		const balance = await ctx.bot.money.get(ctx.interaction.user.id)

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

		// Calculate Cost
		const cost = amount * ctx.client.stocks[stock]

		// Split Button with type
		if (type === 'buy') {
			// Check if User has enough Money
			if (balance < cost) {
				const missing = cost - balance

				// Create Embed
				let message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
					.setDescription(`» You dont have enough Money for that, you are missing **\$${missing}**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

				if (ctx.metadata.language === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
						.setDescription(`» Du hast nicht genug Geld dafür, dir fehlen **${missing}€**!`)
						.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
				}

				// Send Message
				ctx.log(false, `[BTN] STOCKBUY : ${stock.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`)
				return ctx.interaction.reply({ embeds: [message], ephemeral: true })
			}

			// Edit Buttons
			ctx.components.rows[0].components[0].setDisabled(true)
			ctx.components.rows[0].components[1].setDisabled(true)
			ctx.components.rows[0].components[2].setDisabled(true)
			ctx.components.rows[0].components[0].setStyle(2)
			ctx.components.rows[0].components[2].setStyle(2)

			// Log Transaction
			const transaction = await ctx.bot.transactions.log({
				success: true,
				sender: {
					id: ctx.interaction.user.id,
					amount: cost,
					type: 'negative'
				}, reciever: {
					id: `${amount}x ${stock.toUpperCase()} STOCK`,
					amount: cost,
					type: 'positive'
				}
			})

			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCKS')
				.setDescription(`
					» You successfully bought **${amount}x** **${name}** Stock for **\$${cost}**!

					ID: ${transaction.id}
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language == 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN KAUFEN')
					.setDescription(`
						» Du hast erfolgreich **${amount}x** **${name}** Aktie für **${cost}€** gekauft!

						ID: ${transaction.id}
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Add Stock Amount
			ctx.bot.stocks.add(ctx.interaction.user.id, stock, 'used', amount)

			// Remove Money
			ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost)

			// Send Message
			ctx.log(false, `[BTN] STOCKBUY : ${stock.toUpperCase()} : CONFIRM`)
			return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
		} else if (type === 'sell') {
			// Check for enough Stocks
			if (await ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'used') < amount) {
				const missing = amount - (await ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'used'))
				
				// Create Embed
				let message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
					.setDescription(`» You dont have enough Stocks for that, you are missing **${missing}** **${name} Stock${missing > 1 ? 's' : ''}**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

				if (ctx.interaction.guildLocale) {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
						.setDescription(`» Du hast dafür nicht genug Aktien, dir fehlen **${missing}** **${name} Aktie${missing > 1 ? 'n' : ''}**!`)
						.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
				}
				
				// Send Message
				ctx.log(false, `[BTN] STOCKSELL : ${stock.toUpperCase()} : ${amount} : ${balance}€ : NOTENOUGHSTOCKS`)
				return ctx.interaction.reply({ embeds: [message], ephemeral: true })
			}

			// Edit Buttons
			ctx.components.rows[0].components[0].setDisabled(true)
			ctx.components.rows[0].components[1].setDisabled(true)
			ctx.components.rows[0].components[2].setDisabled(true)
			ctx.components.rows[0].components[0].setStyle(2)
			ctx.components.rows[0].components[2].setStyle(2)

			// Log Transaction
			const transaction = await ctx.bot.transactions.log({
				success: true,
				sender: {
					id: `${amount}x ${stock.toUpperCase()} STOCK`,
					amount: cost,
					type: 'negative'
				}, reciever: {
					id: ctx.interaction.user.id,
					amount: cost,
					type: 'positive'
				}
			})

			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL STOCKS')
				.setDescription(`
					» You successfully sold **${amount}x** **${name}** Stock for **\$${cost}**!

					ID: ${transaction.id}
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXDOLLAR:1024402261784403999> » AKTIEN VERKAUFEN')
					.setDescription(`
						» Du hast erfolgreich **${amount}x** **${name}** Aktie für **${cost}€** verkauft!

						ID: ${transaction.id}
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
			}

			// Remove Stock Amount
			ctx.bot.stocks.rem(ctx.interaction.user.id, stock, 'used', amount)

			// Add Money
			ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, cost)

			// Send Message
			ctx.log(false, `[BTN] STOCKSELL : ${stock.toUpperCase()} : CONFIRM`)
			return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
		}
	}
}