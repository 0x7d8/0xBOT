import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('carprice')
		.setDMPermission(false)
		.setDescription('SET CAR PRICES')
		.setDescriptionLocalizations({
			de: 'SETZE AUTO PREISE'
		})
		.addStringOption((option) =>
			option.setName('car')
				.setNameLocalizations({
					de: 'auto'
				})
				.setDescription('THE CAR')
				.setDescriptionLocalizations({
					de: 'DAS AUTO'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '🟢 [5000€-15000€] 2016 JEEP PATRIOT SPORT', value: 'jeep' },
					{ name: '🔵 [50000€-90000€] 2022 KIA SORENTO', value: 'kia' },
					{ name: '🟡 [140000€-200000€] AUDI R8 COUPE V10', value: 'audi' },
					{ name: '🟠 [220000€-260000€] TESLA MODEL Y', value: 'tesla' },
					{ name: '🔴 [400000€-500000€] 2019 PORSCHE 911 GT2RS', value: 'porsche' },
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
		const car = ctx.getOption('car') as string
		const newprice = ctx.getOption('price') as number

		// Check if User owns Business
		if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-OWNER') !== ctx.interaction.user.id) {
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
			ctx.log(false, `[CMD] CARPRICE : NOTOWNER`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Price is valid
		let doscream = false
		if (car === 'jeep' && !ctx.bot.inRange(newprice, 5000, 15000)) doscream = true
		if (car === 'kia' && !ctx.bot.inRange(newprice, 50000, 90000)) doscream = true
		if (car === 'audi' && !ctx.bot.inRange(newprice, 140000, 200000)) doscream = true
		if (car === 'tesla' && !ctx.bot.inRange(newprice, 220000, 260000)) doscream = true
		if (car === 'porsche' && !ctx.bot.inRange(newprice, 400000, 500000)) doscream = true
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
			ctx.log(false, `[CMD] CARPRICE : ${newprice} : NOTLIMIT`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Adjust Prices
		ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase(), newprice.toString())

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:PARTITION:1024399126403747970> » CAR PRICES')
			.setDescription(`» Successfully set the price to **$${newprice}**.`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:PARTITION:1024399126403747970> » AUTO PREISE')
				.setDescription(`» Erfolgreich den Preis auf **${newprice}€** gesetzt.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] CARPRICE : ${car.toUpperCase()} : ${newprice}€`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}