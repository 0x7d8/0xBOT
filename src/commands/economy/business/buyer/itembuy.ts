import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('itembuy')
		.setDMPermission(false)
		.setDescription('BUY ITEMS')
		.setDescriptionLocalizations({
			de: 'KAUFE GEGENSTÄNDE'
		})
		.addStringOption((option: any) =>
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
					{ name: '💣 NORMALE BOMBE', value: 'nbomb' },
					{ name: '💣 MEDIUM BOMBE', value: 'mbomb' },
					{ name: '💣 HYPER BOMBE', value: 'hbomb' },
					{ name: '💣 CRAZY BOMBE', value: 'cbomb' },
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
				.setRequired(false)),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Check if Items are Enabled in Server
		if (!await bot.settings.get(interaction.guild.id, 'items')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» Items are disabled on this Server!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Items sind auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEM : DISABLED')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Set Variables
		const itemid = bot.getOption(interaction, 'item') as string
		const amount = bot.getOption(interaction, 'amount') as number
		const balance = await bot.money.get(interaction.user.id)

		// Calculate Cost Multiplier
		let costmul: number
		if (!amount) costmul = 1
		else costmul = amount

		// Calculate Cost
		let cost: number
		if (await bot.businesses.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === '0' || await bot.businesses.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === 0) {
			if (itemid === 'nbomb') cost = 500*costmul
			if (itemid === 'mbomb') cost = 1000*costmul
			if (itemid === 'hbomb') cost = 5000*costmul
			if (itemid === 'cbomb') cost = 15000*costmul
		} else {
			cost = Number(await bot.businesses.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()))*costmul
		}

		// Translate to Item Names
		let name: string
		if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMAL BOMB'
		if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMB'
		if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMB'
		if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMB'
		if (lang === 'de') {
			if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMALE BOMBE'
			if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE'
			if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMBE'
			if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMBE'
		}

		// Check if User has enough Money
		if (balance < cost) {
			const missing = cost - balance
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMBUY : ' + itemid.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Calculate Processed Amount
		let pamount: number
		if (!amount) pamount = 1
		else pamount = amount

		// Check if Max Slots are used
		const oldamount = await bot.items.get(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'amount')
		if ((pamount + oldamount) > 15) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» You dont have enough Slots for that!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Du hast nicht genug Slots dafür!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
	
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : MAXSLOTS')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
					.setCustomId('ITEM-BUY-YES-' + itemid + '-' + interaction.user.id + '-' + pamount)
					.setEmoji('1024382935618572299')
					.setStyle(ButtonStyle.Success)
					.setDisabled(false),

				new ButtonBuilder()
					.setLabel('NO')
					.setCustomId('ITEM-BUY-NO-' + itemid + '-' + interaction.user.id + '-' + pamount)
					.setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(false),
			)
		if (lang === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('JA')
						.setCustomId('ITEM-BUY-YES-' + itemid + '-' + interaction.user.id + '-' + pamount)
						.setEmoji('1024382935618572299')
						.setStyle(ButtonStyle.Success)
						.setDisabled(false),

					new ButtonBuilder()
						.setLabel('NEIN')
						.setCustomId('ITEM-BUY-NO-' + itemid + '-' + interaction.user.id + '-' + pamount)
						.setEmoji('1024382939020152982')
						.setStyle(ButtonStyle.Danger)
						.setDisabled(false),
				)
		}

		// Create Embed
		let message: any
		if (amount === null || amount === 1) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
				.setDescription('» Do you want to buy a **' + name + '** for **$' + cost + '**?')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
					.setDescription('» Willst du eine **' + name + '** für **' + cost + '€** kaufen?')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
				.setDescription('» Do you want to buy **' + amount + 'x** **' + name + '** for **$' + cost + '**?')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
					.setDescription('» Willst du **' + amount + 'x** **' + name + '** für **' + cost + '€** kaufen?')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMBUY : ' + amount + 'x : ' + itemid.toUpperCase() + ' : ' + cost + '€')
		return interaction.reply({ embeds: [message], components: [row as any] })
	}
}