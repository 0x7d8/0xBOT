import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('businesssell')
		.setDMPermission(false)
		.setDescription('SELL YOUR BUSINESS')
		.setDescriptionLocalizations({
			de: 'VERKAUFE DEIN GESCHÄFT'
		}),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Check if Businesses are Enabled in Server
		if (!await bot.settings.get(interaction.guild.id, 'businesses')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» Businesses are disabled on this Server!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const business = await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS')

		// Calculate Cost
		let cost: number
		if (business === 'market') cost = 150000
		if (business === 'parking garage') cost = 390000
		if (business === 'car dealership') cost = 520000

		// Translate to Business Names
		let name: string
		if (business === 'market') name = 'MARKET'
		if (business === 'parking garage') name = 'PARKING GARAGE'
		if (business === 'car dealership') name = 'CAR DEALERSHIP'
		if (lang === 'de') {
			if (business === 'market') name = 'SUPERMARKT'
			if (business === 'parking garage') name = 'PARKHAUS'
			if (business === 'car dealership') name = 'AUTOHAUS'
		}

		// Check if User has a Business
		if (await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS') === 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont own a Business!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» Du besitzt kein Geschäft!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSSELL : DONTOWNBUSINESS')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
					.setCustomId('BUSINESS-SELL-YES-' + business + '-' + interaction.user.id)
					.setEmoji('1024382942153285632')
					.setStyle(ButtonStyle.Success)
					.setDisabled(false),

				new ButtonBuilder()
					.setLabel('NO')
					.setCustomId('BUSINESS-SELL-NO-' + business + '-' + interaction.user.id)
					.setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(false),
			)
		if (lang === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('JA')
						.setCustomId('BUSINESS-SELL-YES-' + business + '-' + interaction.user.id)
						.setEmoji('1024382942153285632')
						.setStyle(ButtonStyle.Success)
						.setDisabled(false),

					new ButtonBuilder()
						.setLabel('NEIN')
						.setCustomId('BUSINESS-SELL-NO-' + business + '-' + interaction.user.id)
						.setEmoji('1024382939020152982')
						.setStyle(ButtonStyle.Danger)
						.setDisabled(false),
				)
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL BUSINESS')
			.setDescription('» Do you want to sell your **' + name + '** for **$' + (cost/2) + '**?')
			.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXDOLLAR:1024402261784403999> » GESCHÄFT VERKAUFEN')
				.setDescription('» Willst du dein **' + name + '** für **' + (cost/2) + '€** verkaufen?')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSSELL : ' + name + ' : ' + cost + '€')
		return interaction.reply({ embeds: [message], components: [row as any] })
	}
}