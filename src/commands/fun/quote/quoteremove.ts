import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('quoteremove')
		.setDMPermission(false)
		.setDescription('REMOVE QUOTES')
		.setDescriptionLocalizations({
			de: 'ENTFERNE ZITATE'
		})
		.addIntegerOption((option: any) =>
			option.setName('amount')
				.setNameLocalizations({
					de: 'anzahl'
				})
				.setDescription('THE AMOUNT')
				.setDescriptionLocalizations({
					de: 'DIE ANZAHL'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '💰 [01] 1000€', value: 1 },
					{ name: '💰 [02] 2000€', value: 2 },
					{ name: '💰 [03] 3000€', value: 3 },
					{ name: '💰 [04] 4000€', value: 4 },
					{ name: '💰 [05] 5000€', value: 5 },
				)),

	async execute(ctx: CommandInteraction) {
		// Check if Quotes are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'quotes')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» Quotes are disabled on this Server!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Zitate sind auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] QUOTEREMOVE : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const amount = ctx.getOption('amount') as number
		const cost = amount * 1000

		// Get User Balances
		const quotes = await ctx.bot.quotes.get(ctx.interaction.user.id)
		const money = await ctx.bot.money.get(ctx.interaction.user.id)
		
		// Check if not in Minus Quotes
		if (quotes - amount < 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» You dont have that many Quotes, you only have **' + quotes + '**!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription('» Du hast garnicht so viele Zitate, du hast nur **' + quotes + '**!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : NOTENOUGHQUOTES`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Check for enough Money
		if (money < cost) {
			const missing = cost - money
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» You dont have enough Money for that, you are Missing **$' + missing + '**!')
				.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + quotes})

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription('» Du hast nicht genug Geld dafür, dir fehlen **' + missing + '€**!')
					.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + quotes})
			}
			
			// Send Message
			ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : NOTENOUGHMONEY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Check if Plural or not
		let word: string
		if (amount === 1) word = 'Quote'
		else word = 'Quotes'

		if (ctx.metadata.language === 'de') {
			if (amount == 1) word = 'Zitat'
			else word = 'Zitate'
		}
		
		// Create Embed
		const newquotes = quotes - 1
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
  		.setDescription('» You successfully removed **' + amount + '** ' + word + ' for **$' + cost + '**!')
			.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + newquotes})

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
  			.setDescription('» Du hast erfolgreich **' + amount + '** ' + word + ' für **' + cost + '€** entfernt!')
				.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + newquotes})
		}

		// Set Money and Quotes
		ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost)
		ctx.bot.quotes.rem(ctx.interaction.user.id, amount)
		
		// Send Message
		ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : ${cost}€`)
		return ctx.interaction.reply({ embeds: [message] })
	}
}