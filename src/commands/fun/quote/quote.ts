import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import ms from "ms"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('QUOTE SOMETHING')
		.setDescriptionLocalizations({
			de: 'ZITIERE ETWAS'
		})
		.setDMPermission(false)
		.addStringOption((option: any) =>
			option.setName('quote')
				.setNameLocalizations({
					de: 'zitat'
				})
				.setDescription('THE QUOTE')
				.setDescriptionLocalizations({
					de: 'DAS ZITAT'
				})
				.setRequired(true))
		.addUserOption((option: any) =>
			option.setName('author')
				.setNameLocalizations({
					de: 'autor'
				})
				.setDescription('THE AUTHOR')
				.setDescriptionLocalizations({
					de: 'DER AUTOR'
				})
				.setRequired(false)),

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
			ctx.log(false, `[CMD] QUOTE : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const quote = ctx.getOption('quote') as string
		const author = ctx.interaction.options.getUser("author")
	 
		// Cooldown
		if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, 'quote')).onCooldown) {
			// Set Variables
			const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, 'quote')).remaining
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» You still have a Cooldown of **' + ms(timeLeft) + '**!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription('» Du hast leider noch einen Cooldown von **' + ms(timeLeft) + '**!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] QUOTE : ONCOOLDOWN : ${ms(timeLeft)}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Check if there is a author specified
		let message: any
		if (!author || ctx.interaction.user.id === author.id) {
			const amount = await ctx.bot.quotes.get(ctx.interaction.user.id) + 1
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:QUOTES:1024406448127623228> » A WISE QUOTE')
  			.setDescription('» "' + quote + '" ~<@' + ctx.interaction.user.id + '>')
				.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + amount})

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:QUOTES:1024406448127623228> » EIN WEISES ZITAT')
  				.setDescription('» "' + quote + '" ~<@' + ctx.interaction.user.id + '>')
					.setFooter({ text: '» ' + ctx.client.config.version + ' » ZITATE: ' + amount})
			}
			
			ctx.log(false, `[CMD] QUOTE : ${quote.toUpperCase()}`)
		} else {
			const amount = await ctx.bot.quotes.get(author.toString().replace(/\D/g, '')) + 1
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:QUOTES:1024406448127623228> » A QUOTE')
  			.setDescription('» "' + quote + '" ~<@' + author + '>')
				.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + amount})

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:QUOTES:1024406448127623228> » EIN ZITAT')
  				.setDescription('» "' + quote + '" ~<@' + author + '>')
					.setFooter({ text: '» ' + ctx.client.config.version + ' » ZITATE: ' + amount})
			}
			
			ctx.log(false, `[CMD] QUOTE : ${quote.toUpperCase()} : ${author.id}`)
			ctx.bot.quotes.add(author.toString().replace(/\D/g, ''), 1)
		}
		
		// Set Cooldown
		ctx.bot.cooldown.set(ctx.interaction.user.id, 'quote', 1*60*1000)

		// Send Message
		return ctx.interaction.reply({ embeds: [message] })
	}
}