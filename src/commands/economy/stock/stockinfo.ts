import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('stockinfo')
		.setDMPermission(false)
		.setDescription('SEE STOCK PRICES')
		.setDescriptionLocalizations({
			de: 'SEHE AKTIEN PREISE'
		}),

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
			ctx.log(false, `[CMD] STOCKINFO : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Calculate Stock Percentage
		let stockEmojis = {
			green: '',
			blue: '',
			yellow: '',
			red: '',
			white: '',
			black: ''
		}; let stockList = [
			'green',
			'blue',
			'yellow',
			'red',
			'white',
			'black'
		]; stockList.forEach((stock) => {
			if (ctx.client.stocks[stock] > ctx.client.stocks['old' + stock]) stockEmojis[stock] = '<:UP:1009502422990860350>'
			else if (ctx.client.stocks[stock] < ctx.client.stocks['old' + stock]) stockEmojis[stock] = '<:DOWN:1009502386320056330>'
			else stockEmojis[stock] = '🧐'
		})

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1055826473442873385')
					.setLabel('UPDATE')
					.setCustomId(`STOCKINFO-REFRESH-1`)
					.setStyle(ButtonStyle.Primary),

				new ButtonBuilder()
					.setEmoji('1055825023987888169')
					.setCustomId(`STOCKINFO-BACK-1`)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),

				new ButtonBuilder()
					.setEmoji('1055825050126786590')
					.setCustomId(`STOCKINFO-NEXT-1`)
					.setStyle(ButtonStyle.Secondary),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setEmoji('1055826473442873385')
						.setLabel('AKTUALISIEREN')
						.setCustomId(`STOCKINFO-REFRESH-1`)
						.setStyle(ButtonStyle.Primary),

					new ButtonBuilder()
						.setEmoji('1055825023987888169')
						.setCustomId(`STOCKINFO-BACK-1`)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),

					new ButtonBuilder()
						.setEmoji('1055825050126786590')
						.setCustomId(`STOCKINFO-NEXT-1`)
						.setStyle(ButtonStyle.Secondary),
				)
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:CHART:1024398298204876941> » THE CURRENT STOCK PRICES')
			.setDescription(`
				⏲️ New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

				» ${stockEmojis['green']} Green Stock
				\`\`\`$${ctx.client.stocks.green} (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
				» ${stockEmojis['blue']} Blue Stock
				\`\`\`$${ctx.client.stocks.blue} (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
				» ${stockEmojis['yellow']} Yellow Stock
				\`\`\`$${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CHART:1024398298204876941> » DIE AKTUELLSTEN AKTIEN PREISE')
				.setDescription(`
					⏲️ Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

					» ${stockEmojis['green']}€ Grüne Aktie
					\`\`\`${ctx.client.stocks.green} (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
					» ${stockEmojis['blue']} Blaue Aktie
					\`\`\`${ctx.client.stocks.blue}€ (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
					» ${stockEmojis['yellow']} Gelbe Aktie
					\`\`\`${ctx.client.stocks.yellow}€ (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' })
		}

		// Send Message
		ctx.log(false, `[CMD] STOCKINFO : 1 : ${ctx.client.stocks.green}€ : ${ctx.client.stocks.blue}€ : ${ctx.client.stocks.yellow}€ : ${ctx.client.stocks.red}€ : ${ctx.client.stocks.white}€ : ${ctx.client.stocks.black}€`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}