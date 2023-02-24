import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('stocks')
		.setDMPermission(false)
		.setDescription('SEE STOCKS')
		.setDescriptionLocalizations({
			de: 'SEHE AKTIEN'
		})
		.addUserOption((option) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
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
			ctx.log(false, `[CMD] STOCKS : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		
		// Set User Object
		let userobj: typeof ctx.interaction.user
		if (!user) userobj = ctx.interaction.user
		else userobj = user

		// Get Stocks
		const stocks = {
			"green": (await ctx.bot.stocks.get(userobj.id, 'green', 'used')),
			"greenMax": (await ctx.bot.stocks.get(userobj.id, 'green', 'max')),
			"blue": (await ctx.bot.stocks.get(userobj.id, 'blue', 'used')),
			"blueMax": (await ctx.bot.stocks.get(userobj.id, 'blue', 'max')),
			"yellow": (await ctx.bot.stocks.get(userobj.id, 'yellow', 'used')),
			"yellowMax": (await ctx.bot.stocks.get(userobj.id, 'yellow', 'max')),
			"red": (await ctx.bot.stocks.get(userobj.id, 'red', 'used')),
			"redMax": (await ctx.bot.stocks.get(userobj.id, 'red', 'max')),
			"white": (await ctx.bot.stocks.get(userobj.id, 'white', 'used')),
			"whiteMax": (await ctx.bot.stocks.get(userobj.id, 'white', 'max')),
			"black": (await ctx.bot.stocks.get(userobj.id, 'black', 'used')),
			"blackMax": (await ctx.bot.stocks.get(userobj.id, 'black', 'max')),
			"brown": (await ctx.bot.stocks.get(userobj.id, 'brown', 'used')),
			"brownMax": (await ctx.bot.stocks.get(userobj.id, 'brown', 'max')),
			"purple": (await ctx.bot.stocks.get(userobj.id, 'purple', 'used')),
			"purpleMax": (await ctx.bot.stocks.get(userobj.id, 'purple', 'max')),
		}

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1055826473442873385')
					.setLabel('UPDATE')
					.setCustomId(`STOCKS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`)
					.setStyle(ButtonStyle.Primary),

				new ButtonBuilder()
					.setEmoji('1055825023987888169')
					.setCustomId(`STOCKS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),

				new ButtonBuilder()
					.setEmoji('1055825050126786590')
					.setCustomId(`STOCKS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
					.setStyle(ButtonStyle.Secondary),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setEmoji('1055826473442873385')
						.setLabel('AKTUALISIEREN')
						.setCustomId(`STOCKS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`)
						.setStyle(ButtonStyle.Primary),

					new ButtonBuilder()
						.setEmoji('1055825023987888169')
						.setCustomId(`STOCKS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),

					new ButtonBuilder()
						.setEmoji('1055825050126786590')
						.setCustomId(`STOCKS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
						.setStyle(ButtonStyle.Secondary),
				)
		}

		// Create Embed
		let message: any
		if (ctx.interaction.user.id === '69') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CHART:1024398298204876941> » YOUR BOUGHT STOCKS')
				.setDescription(`
					» 🟢 Green Stock
					\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
					» 🔵 Blue Stock
					\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
					» 🟡 Yellow Stock
					\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
					» 🔴 Red Stock
					\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CHART:1024398298204876941> » DEINE LISTE VON AKTIEN IM BESITZ')
					.setDescription(`
						» 🟢 Grüne Aktie
						\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
						» 🔵 Blaue Aktie
						\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
						» 🟡 Gelbe Aktie
						\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
						» 🔴 Rote Aktie
						\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CHART:1024398298204876941> » THE BOUGHT STOCKS OF ' + userobj.username.toUpperCase())
				.setDescription(`
					» 🟢 Green Stock
					\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
					» 🔵 Blue Stock
					\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
					» 🟡 Yellow Stock
					\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
					» 🔴 Red Stock
					\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CHART:1024398298204876941> » DIE LISTE VON AKTIEN IM BESITZ VON ' + userobj.username.toUpperCase())
					.setDescription(`
						» 🟢 Grüne Aktie
						\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
						» 🔵 Blaue Aktie
						\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
						» 🟡 Gelbe Aktie
						\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
						» 🔴 Rote Aktie
						\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' })
			}
		}

		// Send Message
		ctx.log(false, `[CMD] STOCKS :${!user ? '' : ` ${user.id} :`} ${stocks.green} : ${stocks.blue} : ${stocks.yellow} : ${stocks.red} : ${stocks.white} : ${stocks.black} : ${stocks.brown} : ${stocks.purple}`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}