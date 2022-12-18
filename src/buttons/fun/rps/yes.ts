import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'rps-yes'
	},

	async execute(ctx: ButtonInteraction, bet: number) {
		// Get Users
		const cache = ctx.interaction.message.embeds
		const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@")
		const [ sender, reciever ] = description

		// Set Variables
		const balance = await ctx.bot.money.get(reciever)
		const otherbalance = await ctx.bot.money.get(sender)

		// Check if User is Authorized
		if (ctx.interaction.user.id !== reciever) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» <@' + reciever + '> has to decide this!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» <@' + reciever + '> muss das entscheiden!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] RPS : YES : NOTALLOWED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Person is already in a Lobby
		if (ctx.bot.game.has('PLAYING-' + reciever)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» You are already in a Lobby!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Du bist schon in einer Lobby!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] RPS : ' + reciever + ' : ALREADYLOBBY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Other Person is already in a Lobby
		if (ctx.bot.game.has('PLAYING-' + sender)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» <@' + sender + '> is already in a Lobby!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» <@' + sender + '> ist schon in einer Lobby!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] RPS : ' + sender + ' : ALREADYLOBBY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check for enough Money
		if (balance < bet) {
			const missing = bet - balance
			
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
			ctx.log(false, `[BTN] RPS : ${reciever} : ${bet}€ : NOTENOUGHMONEY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		if (otherbalance < bet) {
			const missing = bet - otherbalance
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» <@' + sender + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription('» <@' + sender + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] RPS : ${reciever} : ${bet}€ : NOTENOUGHMONEY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Answer Timeout Function
		ctx.bot.rps.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id)

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

		if (ctx.metadata.language === 'de') {
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
		ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet)
		ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
			.setDescription('» <@' + sender + '> is playing Rock Paper Scissors with <@' + reciever + '>!\nThe Bet is **$' + bet + '**')
			.setFooter({ text: '» ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
				.setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Schere Stein Papier!\nDie Wette ist **' + bet + '€**')
				.setFooter({ text: '» ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[BTN] RPS : ${sender} : ACCEPT`)
		return ctx.interaction.update({ content: '', embeds: [message], components: [row as any] })
	}
}