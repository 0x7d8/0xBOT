import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('roulette')
		.setDMPermission(false)
		.setDescription('PLAY ROULETTE')
		.setDescriptionLocalizations({
			de: 'SPIELE ROULETTE'
		})
		.addStringOption((option: any) =>
			option.setName('color')
				.setNameLocalizations({
					de: 'farbe'
				})
				.setDescription('THE COLOR')
				.setDescriptionLocalizations({
					de: 'DIE FARBE'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '🟢 [x4] GRÜN', value: 'grün' },
					{ name: '⚫ [x2] SCHWARZ', value: 'schwarz' },
					{ name: '🔴 [x2] ROT', value: 'rot' },
				))
		.addIntegerOption((option: any) =>
			option.setName('bet')
				.setNameLocalizations({
					de: 'wette'
				})
				.setDescription('THE BET')
				.setDescriptionLocalizations({
					de: 'DIE WETTE'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Check if RNG Games are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'luckgames')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» Luck Games are disabled on this Server!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Glücksspiele sind auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ROULETTE : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const farbe = ctx.getOption('color') as string
		const wette = ctx.getOption('bet') as number
		const money = await ctx.bot.money.get(ctx.interaction.user.id)
		const random = ctx.bot.random(1, 21)

		// Check if Balance is Minus
		if (wette < 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» You cant play with negative Money!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Du kannst keine negativen Einsätze spielen!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ROULETTE : NEGATIVEMONEY : ${wette}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Calculate Color
		let color: string
		if (random == 1) color = 'grün'
		if (random >= 2) color = 'schwarz'
		if (random >= 11) color = 'rot'
		
		// Calculate Status
		let status: string, transaction: any
		if (color === farbe) { status = 'WON'; // Log Transaction
			transaction = await ctx.bot.transactions.log({
				success: true,
				sender: {
					id: 'CASINO',
					amount: wette,
					type: 'negative'
				}, reciever: {
					id: ctx.interaction.user.id,
					amount: wette,
					type: 'positive'
				}
			})
		}; if (color !== farbe) { status = 'LOST'; // Log Transaction
			transaction = await ctx.bot.transactions.log({
				success: true,
				sender: {
					id: ctx.interaction.user.id,
					amount: wette,
					type: 'negative'
				}, reciever: {
					id: 'CASINO',
					amount: wette,
					type: 'positive'
				}
			})
		}

		if (ctx.metadata.language === 'de') {
			if (color === farbe) status = 'GEWONNEN'
			if (color !== farbe) status = 'VERLOREN'
		}
		
		// Check for enough Money
		if (money >= wette) {
			// Check for Max Amount
			if (wette > 15000) {
				// Create Embed
				let message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant bet that much! **$15000** is the Maximum.')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

				if (ctx.metadata.language === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» Du kannst nicht soviel Wetten! **15000€** ist das Maximum.')
						.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
				}
				
				// Send Message
				ctx.log(false, `[CMD] ROULETTE : TOOMUCHMONEY : ${wette}€`)
				return ctx.interaction.reply({ embeds: [message], ephemeral: true })
			}
			
			// Set Money
			let resultmul: number
			if (color === farbe && color === 'grün') resultmul = 4
			if (color === farbe && color !== 'grün') resultmul = 2
			if (color !== farbe) resultmul = 0

			const result = wette * resultmul
			const resultadd = result - wette

			let resultdis: number
			if (result == 0) resultdis = wette
			else resultdis = result

			let colordis: string
			if (farbe === 'grün') colordis = 'green'
			if (farbe === 'rot') colordis = 'red'
			if (farbe === 'schwarz') colordis = 'black'
		
			// Create Embed
	  		let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CLOVER:1024388649418235925> » ROULETTE')
  			.setDescription(`
					» You bet **$${wette}** on **${colordis.toUpperCase()}** and **${status}** **$${resultdis}**!
					${status === 'LOST' ? `The Color was **${color.toUpperCase()}**\n` : ''}
					ID: ${transaction.id}
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CLOVER:1024388649418235925> » ROULETTE')
  				.setDescription(`
						» Du hast **${wette}€** auf **${farbe.toUpperCase()}** gesetzt und **${resultdis}€** **${status}**!
						${status === 'VERLOREN' ? `Die Farbe war **${color.toUpperCase()}**\n` : ''}
						ID: ${transaction.id}
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Set Money
			if (color !== farbe) ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, wette)
			if (color === farbe) ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, resultadd)
			
			// Send Message
			ctx.log(false, `[CMD] ROULETTE : ${farbe.toUpperCase()} [W:${color.toUpperCase()}] : ${status} : ${resultdis}€`)
			return ctx.interaction.reply({ embeds: [message] })
		} else {
			const missing = wette - money
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ROULETTE : NOTENOUGHMONEY : ${missing}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
	}
}