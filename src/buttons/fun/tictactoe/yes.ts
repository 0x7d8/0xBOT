import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'ttt-yes'
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
				.setDescription(`» <@${reciever}> has to decide this!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» <@${reciever}> muss das entscheiden!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] TICTACTOE : YES : NOTALLOWED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Person is already in a Lobby
		if (ctx.bot.game.has('PLAYING-' + reciever)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You are already in a Lobby!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du bist schon in einer Lobby!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] TICTACTOE : ${reciever} : ALREADYLOBBY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Other Person is already in a Lobby
		if (ctx.bot.game.has('PLAYING-' + sender)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» <@${sender}> is already in a Lobby!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» <@${sender}> ist schon in einer Lobby!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] TICTACTOE : ${sender} : ALREADYLOBBY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check for enough Money
		if (balance < bet) {
			const missing = bet - balance
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You dont have enough Money for that, you are missing **\$${missing}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du hast dafür nicht genug Geld, dir fehlen **${missing}€**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] TICTACTOE : ${reciever} : ${bet}€ : NOTENOUGHMONEY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		if (otherbalance < bet) {
			const missing = bet - otherbalance
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» <@${sender}> doesnt have enough Money, he is Missing **\$${missing}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» <@${sender}> hat nicht genug Geld, im fehlen **${missing}€**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] TICTACTOE : ${reciever} : ${bet}€ : NOTENOUGHMONEY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Answer Timeout Function
		ctx.bot.ttt.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id)

		// Create Buttons
		let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-1-${bet}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-2-${bet}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-3-${bet}`)
					.setStyle(ButtonStyle.Secondary),
			)
		let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-4-${bet}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-5-${bet}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-6-${bet}`)
					.setStyle(ButtonStyle.Secondary),
			)
		let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-7-${bet}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-8-${bet}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1020411843644243998')
					.setCustomId(`TTT-9-${bet}`)
					.setStyle(ButtonStyle.Secondary),
			)
		let row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1024382939020152982')
					.setLabel('CANCEL')
					.setCustomId(`TTT-CANCEL-${bet}`)
					.setStyle(ButtonStyle.Danger),
			)
		if (ctx.metadata.language === 'de') {
			row4 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setEmoji('1024382939020152982')
						.setLabel('ABBRECHEN')
						.setCustomId(`TTT-CANCEL-${bet}`)
						.setStyle(ButtonStyle.Danger),
				)
		}

		// Set Variables
		ctx.bot.game.set('PLAYING-' + sender, 'TICTACTOE')
		ctx.bot.game.set('PLAYING-' + reciever, 'TICTACTOE')

		ctx.bot.ttt.set('TURN-' + sender, sender)

		ctx.bot.ttt.set('FIELDS-' + sender, [])
		ctx.bot.ttt.set('FIELDS-' + reciever, [])

		ctx.bot.ttt.set('FIELD-1-' + sender, null)
		ctx.bot.ttt.set('FIELD-2-' + sender, null)
		ctx.bot.ttt.set('FIELD-3-' + sender, null)
		ctx.bot.ttt.set('FIELD-4-' + sender, null)
		ctx.bot.ttt.set('FIELD-5-' + sender, null)
		ctx.bot.ttt.set('FIELD-6-' + sender, null)
		ctx.bot.ttt.set('FIELD-7-' + sender, null)
		ctx.bot.ttt.set('FIELD-8-' + sender, null)
		ctx.bot.ttt.set('FIELD-9-' + sender, null)

		// Transfer Money
		ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet)
		ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
			.setDescription(`
				» <@${sender}> is playing Tic Tac Toe with <@${reciever}>!
				The Bet is **\$${bet}**
				
				🔵 » <@${sender}>\n🔴 » <@${reciever}>
			`).setFooter({ text: '» ' + ctx.client.config.version + ' » CURRENT TURN: 🔵' })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
				.setDescription(`
					» <@${sender}> spielt mit <@${reciever}> Tic Tac Toe!
					Die Wette ist **${bet}€**
					
					🔵 » <@${sender}>\n🔴 » <@${reciever}>
				`).setFooter({ text: '» ' + ctx.client.config.version + ' » AM ZUG: 🔵' })
		}

		// Send Message
		ctx.log(false, `[BTN] TICTACTOE : ${sender} : ACCEPT`)
		return ctx.interaction.update({ content: '', embeds: [message], components: [row1 as any, row2 as any, row3 as any, row4 as any] })
	}
}