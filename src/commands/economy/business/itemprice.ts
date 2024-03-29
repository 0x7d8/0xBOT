import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('itemprice')
		.setDMPermission(false)
		.setDescription('SET STORE PRICES')
		.setDescriptionLocalizations({
			de: 'SETZE SHOP PREISE'
		})
		.addStringOption((option) =>
			option.setName('item')
				.setNameLocalizations({
					de: 'gegenstand'
				})
				.setDescription('THE ITEM')
				.setDescriptionLocalizations({
					de: 'DER GEGENSTAND'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '💣 [250€-1500€] NORMALE BOMBE', value: 'nbomb' },
					{ name: '💣 [750€-5000€] MEDIUM BOMBE', value: 'mbomb' },
					{ name: '💣 [2500€-15000€] HYPER BOMBE', value: 'hbomb' },
					{ name: '💣 [7500€-20000€] CRAZY BOMBE', value: 'cbomb' },
				))
		.addIntegerOption((option) =>
			option.setName('price')
				.setNameLocalizations({
					de: 'preis'
				})
				.setDescription('THE NEW PRICE [THE FIRST VALUE IS THE PRODUCTION COST]')
				.setDescriptionLocalizations({
					de: 'DER NEUE PREIS [DIE ERSTE ZAHL IST DER PRODUKTIONS PREIS]'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Check if Businesses are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'businesses')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» Businesses are disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Geschäfte sind auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] BUSINESS : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const itemid = ctx.getOption('item') as string
		const newprice = ctx.getOption('price') as number

		// Check if User owns Business
		if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-OWNER') !== ctx.interaction.user.id) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You dont own this Business!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du besitzt dieses Geschäft nicht!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ITEMPRICE : NOTOWNER`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Price is valid
		let doscream = false
		if (itemid === 'nbomb' && !ctx.bot.inRange(newprice, 250, 1500)) doscream = true
		if (itemid === 'mbomb' && !ctx.bot.inRange(newprice, 750, 5000)) doscream = true
		if (itemid === 'hbomb' && !ctx.bot.inRange(newprice, 2500, 15000)) doscream = true
		if (itemid === 'cbomb' && !ctx.bot.inRange(newprice, 7500, 20000)) doscream = true
		if (doscream) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» Please follow the limits seen in the first step!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Bitte folge den Limits zu sehen im ersten Schritt!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ITEMPRICE : ${newprice} : NOTLIMIT`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Adjust Prices
		ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase(), newprice.toString())

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:PARTITION:1024399126403747970> » ITEM PRICES')
			.setDescription(`» Successfully set the price to **$${newprice}**.`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language == 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:PARTITION:1024399126403747970> » ITEM PREISE')
				.setDescription(`» Erfolgreich den Preis auf **${newprice}€** gesetzt.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] ITEMPRICE : ${itemid.toUpperCase()} : ${newprice}€`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}