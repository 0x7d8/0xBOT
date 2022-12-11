import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('stocksell')
		.setDMPermission(false)
		.setDescription('SELL STOCKS')
		.setDescriptionLocalizations({
			de: 'VERKAUFE AKTIEN'
		})
		.addStringOption((option: any) =>
			option.setName('stock')
				.setNameLocalizations({
					de: 'aktie'
				})
				.setDescription('THE STOCK')
				.setDescriptionLocalizations({
					de: 'DIE AKTIE'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '🟢 GRÜNE AKTIE', value: 'green' },
					{ name: '🔵 BLAUE AKTIE', value: 'blue' },
					{ name: '🟡 GELBE AKTIE', value: 'yellow' },
					{ name: '🔴 ROTE AKTIE', value: 'red' },
					{ name: '⚪ WEISSE AKTIE', value: 'white' },
					{ name: '⚫ SCHWARZE AKTIE', value: 'black' },
				))
		.addIntegerOption((option: any) =>
			option.setName('amount')
				.setNameLocalizations({
					de: 'anzahl'
				})
				.setDescription('THE AMOUNT')
				.setDescriptionLocalizations({
					de: 'DIE ANZAHL'
				})
				.setRequired(true)),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Check if Stocks are Enabled in Server
		if (!await bot.settings.get(interaction.guild.id, 'stocks')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» Stocks are disabled on this Server!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Aktien sind auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : DISABLED')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const stock = bot.getOption(interaction, 'stock') as string
		const amount = bot.getOption(interaction, 'amount') as number

		// Check if Amount is Negative
		if (amount < 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» You cant sell a negative amount of Stocks!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Du kannst keine negativen Anzahlen verkaufen!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : NEGATIVESTOCKS : ' + amount + '€')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Calculate Cost
		const cash = amount * client.stocks[stock]

		// Set Emoji
		let emoji: string
		if (stock === 'green') emoji = '🟢'
		if (stock === 'blue') emoji = '🔵'
		if (stock === 'yellow') emoji = '🟡'
		if (stock === 'red') emoji = '🔴'
		if (stock === 'white') emoji = '⚪'
		if (stock === 'black') emoji = '⚫'

		// Check for enough Stocks
		if (await bot.stocks.get(interaction.user.id, stock, 'used') < amount) {
			const missing = amount - (await bot.stocks.get(interaction.user.id, stock, 'used'))
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Stocks for that, you are missing **' + missing + '** ' + emoji + ' !')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (interaction.guildLocale) {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» Du hast dafür nicht genug Aktien, dir fehlen **' + missing + '** ' + emoji + ' !')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€ : NOTENOUGHSTOCKS')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Log Transaction
		const transaction = await bot.transactions.log({
			success: true,
			sender: {
				id: `${amount} ${stock.toUpperCase()} STOCK`,
				amount: cash,
				type: 'negative'
			}, reciever: {
				id: interaction.user.id,
				amount: cash,
				type: 'positive'
			}
		})

		// Add Money
		bot.money.add(interaction.guild.id, interaction.user.id, cash)

		// Remove Stock Amount
		bot.stocks.rem(interaction.user.id, stock, 'used', amount)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:CHART:1024398298204876941> » SELL STOCKS')
			.setDescription('» You successfully sold **' + amount + '** ' + emoji + ' for **$' + cash + '**! (**$' + client.stocks[stock] + '** per Stock)\n\nID: ' + transaction.id)
			.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CHART:1024398298204876941> » AKTIEN VERKAUFEN')
				.setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cash + '€** verkauft! (**' + client.stocks[stock] + '€** pro Aktie)\n\nID: ' + transaction.id)
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€')
		return interaction.reply({ embeds: [message], ephemeral: true })
	}
}