import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('carsell')
		.setDMPermission(false)
		.setDescription('SELL YOUR CAR')
		.setDescriptionLocalizations({
			de: 'VERKAUFE DEIN AUTO'
		}),

	async execute(ctx: CommandInteraction) {
		// Check if Cars are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'cars')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» Cars are disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Autos sind auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] CAR : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const car = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value')

		// Calculate Cost
		let cost: number
		if (car === 'jeep') cost = 15000
		if (car === 'kia') cost = 75000
		if (car === 'tesla') cost = 240000
		if (car === 'porsche') cost = 490000

		// Translate to Car Names
		let name: string
		if (car === 'jeep') name = '2016 JEEP PATRIOT SPORT'
		if (car === 'kia') name = '2022 KIA SORENTO'
		if (car === 'tesla') name = 'TESLA MODEL Y'
		if (car === 'porsche') name = '2019 PORSCHE 911 GT2RS'

		// Check if User has a Car
		if (await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount') === 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You dont own a Car!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du besitzt kein Auto!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] CARSELL : DONTOWNCAR`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
					.setCustomId('CAR-SELL-YES-' + car + '-' + ctx.interaction.user.id)
					.setEmoji('1024382942153285632')
					.setStyle(ButtonStyle.Success)
					.setDisabled(false),

				new ButtonBuilder()
					.setLabel('NO')
					.setCustomId('CAR-SELL-NO-' + car + '-' + ctx.interaction.user.id)
					.setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(false),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('JA')
						.setCustomId('CAR-SELL-YES-' + car + '-' + ctx.interaction.user.id)
						.setEmoji('1024382942153285632')
						.setStyle(ButtonStyle.Success)
						.setDisabled(false),

					new ButtonBuilder()
						.setLabel('NEIN')
						.setCustomId('CAR-SELL-NO-' + car + '-' + ctx.interaction.user.id)
						.setEmoji('1024382939020152982')
						.setStyle(ButtonStyle.Danger)
						.setDisabled(false),
				)
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
			.setDescription(`» Do you want to sell your **${name}** for **$${cost / 2}**?`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
				.setDescription(`» Willst du deinen **${name}** für **${cost / 2}€** verkaufen?`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] CARSELL : ${name} : ${cost}€`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}