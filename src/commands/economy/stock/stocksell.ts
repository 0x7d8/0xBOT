import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('stocksell')
		.setDMPermission(false)
		.setDescription('SELL STOCKS')
		.setDescriptionLocalizations({
			de: 'VERKAUFE AKTIEN'
		})
		.addStringOption((option) =>
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
					{ name: '🟤 BRAUNE AKTIE', value: 'brown' },
					{ name: '🟣 LILA AKTIE', value: 'purple' }
				))
		.addIntegerOption((option) =>
			option.setName('amount')
				.setNameLocalizations({
					de: 'anzahl'
				})
				.setDescription('THE AMOUNT')
				.setDescriptionLocalizations({
					de: 'DIE ANZAHL'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		const ms = (await import('pretty-ms')).default

		// Check if Stocks are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'stocks')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» Stocks are disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Aktien sind auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] STOCKSELL : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const stock = ctx.getOption('stock') as string
		const amount = ctx.getOption('amount') as number

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

		// Check if Amount is Negative
		if (amount < 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant sell a negative amount of Stocks!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst keine negativen Anzahlen verkaufen!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] STOCKSELL : NEGATIVESTOCKS : ${amount}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Calculate Cost
		const cost = amount * ctx.client.stocks[stock]

		// Check for enough Stocks
		if (await ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'used') < amount) {
			const missing = amount - (await ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'used'))
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You dont have enough Stocks for that, you are missing **${missing}** **${name}** Stock!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.interaction.guildLocale) {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du hast dafür nicht genug Aktien, dir fehlen **${missing}** **${name}** Aktie!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] STOCKSELL : ${stock.toUpperCase()} : ${amount} : ${cost}€ : NOTENOUGHSTOCKS`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('UPDATE')
					.setCustomId(`STOCK-SELL-REFRESH-${stock}-${ctx.interaction.user.id}-${amount}`)
					.setEmoji('1055826473442873385')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(false),

				new ButtonBuilder()
					.setLabel('YES')
					.setCustomId(`STOCK-SELL-YES-${stock}-${ctx.interaction.user.id}-${amount}`)
					.setEmoji('1024382935618572299')
					.setStyle(ButtonStyle.Success)
					.setDisabled(false),

				new ButtonBuilder()
					.setLabel('NO')
					.setCustomId(`STOCK-SELL-NO-${stock}-${ctx.interaction.user.id}-${amount}`)
					.setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(false),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('AKTUALISIEREN')
						.setCustomId(`STOCK-SELL-REFRESH-${stock}-${ctx.interaction.user.id}-${amount}`)
						.setEmoji('1055826473442873385')
						.setStyle(ButtonStyle.Primary)
						.setDisabled(false),

					new ButtonBuilder()
						.setLabel('JA')
						.setCustomId(`STOCK-SELL-YES-${stock}-${ctx.interaction.user.id}-${amount}`)
						.setEmoji('1024382935618572299')
						.setStyle(ButtonStyle.Success)
						.setDisabled(false),

					new ButtonBuilder()
						.setLabel('NEIN')
						.setCustomId(`STOCK-SELL-NO-${stock}-${ctx.interaction.user.id}-${amount}`)
						.setEmoji('1024382939020152982')
						.setStyle(ButtonStyle.Danger)
						.setDisabled(false),
				)
		}

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
		ctx.log(false, `[CMD] STOCKSELL : ${stock.toUpperCase()} : ${amount} : ${cost}€`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}