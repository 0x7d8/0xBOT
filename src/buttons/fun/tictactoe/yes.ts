import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
	data: {
		name: 'ttt-yes'
	},

	async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, bet: number) {
		// Get Users
		const cache = interaction.message.embeds
		const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@")
		const [ sender, reciever ] = description

		// Set Variables
		const balance = await bot.money.get(reciever)
		const otherbalance = await bot.money.get(sender)

		// Check if User is Authorized
		if (interaction.user.id !== reciever) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» <@' + reciever + '> has to decide this!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» <@' + reciever + '> muss das entscheiden!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : YES : NOTALLOWED')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Person is already in a Lobby
		if (bot.game.has('PLAYING-' + reciever)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» You are already in a Lobby!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Du bist schon in einer Lobby!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever + ' : ALREADYLOBBY')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Other Person is already in a Lobby
		if (bot.game.has('PLAYING-' + sender)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» <@' + sender + '> is already in a Lobby!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» <@' + sender + '> ist schon in einer Lobby!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sender + ' : ALREADYLOBBY')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check for enough Money
		if (balance < bet) {
			const missing = bet - balance
			
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
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}
		if (otherbalance < bet) {
			const missing = bet - otherbalance
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» <@' + sender + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» <@' + sender + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Answer Timeout Function
		bot.ttt.delete('TIMEOUT-' + sender + '-' + interaction.message.id)

		// Create Buttons
		let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-1-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-2-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-3-' + bet)
					.setStyle(ButtonStyle.Secondary),
			)
		let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-4-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-5-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-6-' + bet)
					.setStyle(ButtonStyle.Secondary),
			)
		let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-7-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-8-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId('TTT-9-' + bet)
					.setStyle(ButtonStyle.Secondary),
			)

		// Set Variables
		bot.game.set('PLAYING-' + sender, 'TICTACTOE')
		bot.game.set('PLAYING-' + reciever, 'TICTACTOE')

		bot.ttt.set('TURN-' + sender, sender)

		bot.ttt.set('FIELDS-' + sender, [])
		bot.ttt.set('FIELDS-' + reciever, [])

		bot.ttt.set('FIELD-1-' + sender, null)
		bot.ttt.set('FIELD-2-' + sender, null)
		bot.ttt.set('FIELD-3-' + sender, null)
		bot.ttt.set('FIELD-4-' + sender, null)
		bot.ttt.set('FIELD-5-' + sender, null)
		bot.ttt.set('FIELD-6-' + sender, null)
		bot.ttt.set('FIELD-7-' + sender, null)
		bot.ttt.set('FIELD-8-' + sender, null)
		bot.ttt.set('FIELD-9-' + sender, null)

		// Transfer Money
		bot.money.rem(interaction.guild.id, sender, bet)
		bot.money.rem(interaction.guild.id, reciever, bet)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
			.setDescription('» <@' + sender + '> is playing Tic Tac Toe with <@' + reciever + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>')
			.setFooter({ text: '» ' + client.config.version + ' » CURRENT TURN: 🔵' })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
				.setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>')
				.setFooter({ text: '» ' + client.config.version + ' » AM ZUG: 🔵' })
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sender + ' : ACCEPT')
		return interaction.update({ content: '', embeds: [message], components: [row1 as any, row2 as any, row3 as any] })
	}
}