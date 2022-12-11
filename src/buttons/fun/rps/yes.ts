import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
	data: {
		name: 'rps-yes'
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
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : YES : NOTALLOWED')
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
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : ' + reciever + ' : ALREADYLOBBY')
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
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : ' + sender + ' : ALREADYLOBBY')
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
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY')
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
			bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Answer Timeout Function
		bot.rps.delete('TIMEOUT-' + sender + '-' + interaction.message.id)

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('🪨 ROCK')
					.setCustomId('RPS-1-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setLabel('📝 PAPER')
					.setCustomId('RPS-2-' + bet)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setLabel('✂️ SCISSORS')
					.setCustomId('RPS-3-' + bet)
					.setStyle(ButtonStyle.Secondary),
			)

		if (lang === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('✂️ SCHERE')
						.setCustomId('RPS-3-' + bet)
						.setStyle(ButtonStyle.Secondary),

					new ButtonBuilder()
						.setLabel('🪨 STEIN')
						.setCustomId('RPS-1-' + bet)
						.setStyle(ButtonStyle.Secondary),

					new ButtonBuilder()
						.setLabel('📝 PAPIER')
						.setCustomId('RPS-2-' + bet)
						.setStyle(ButtonStyle.Secondary),
			)
		}

		// Transfer Money
		bot.money.rem(interaction.guild.id, sender, bet)
		bot.money.rem(interaction.guild.id, reciever, bet)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
		.setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
		.setDescription('» <@' + sender + '> is playing Rock Paper Scissors with <@' + reciever + '>!\nThe Bet is **$' + bet + '**')
		.setFooter({ text: '» ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
				.setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Schere Stein Papier!\nDie Wette ist **' + bet + '€**')
				.setFooter({ text: '» ' + client.config.version })
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : ' + sender + ' : ACCEPT')
		return interaction.update({ content: '', embeds: [message], components: [row as any] })
	}
}