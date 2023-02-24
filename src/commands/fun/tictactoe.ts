import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setDescription('PLAY TICTACTOE')
		.setDescriptionLocalizations({
			de: 'SPIELE TICTACTOE'
		})
		.setDMPermission(false)
		.addUserOption((option) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(true))
		.addIntegerOption((option) =>
			option.setName('bet')
				.setNameLocalizations({
					de: 'wette'
				})
				.setDescription('THE AMOUNT OF MONEY')
				.setDescriptionLocalizations({
					de: 'DIE ANZAHL VON GELD'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		let bet = ctx.getOption('bet') as number

		const money = await ctx.bot.money.get(ctx.interaction.user.id)
		const othermoney = await ctx.bot.money.get(user.id)

		// Check if Target is Bot
		if (user.bot) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant play Tic Tac Toe with a Bot!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst Tic Tac Toe nicht mit einem Bot spielen!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : BOT`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Sender is already in a Lobby
		if (ctx.bot.game.has('PLAYING-' + ctx.interaction.user.id)) {
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
			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : ALREADYLOBBY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Reciever is already in a Lobby
		if (ctx.bot.game.has('PLAYING-' + user.id)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» <@${user.id}> is already in a Lobby!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» <@${user.id}> ist schon in einer Lobby!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : ALREADYLOBBY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Bet is Negative
		if (bet < 0 && bet !== null) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant bet negative Money!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst kein negatives Geld wetten!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : NEGATIVEMONEY : ${bet}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if User is Author
		if (ctx.interaction.user.id === user.id) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant play Tic Tac Toe with yourself?`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst Tic Tac Toe nicht mit dir selber spielen?`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : ${bet}€ : SAMEPERSON`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check for Enough Money
		if (money < bet && bet !== null) {
			const missing = bet - money

			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You dont have enough Money for that, you are missing **\$${missing}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du hast nicht genug Geld dafür, dir fehlen **${missing}€**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : NOTENOUGHMONEY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		if (othermoney < bet && bet !== null) {
			const missing = bet - othermoney

			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» <@${user.id}> doesnt have enough Money for that, he is Missing **\$${missing}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» <@${user.id}> hat dafür nicht genug Geld, im fehlen **${missing}€**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : NOTENOUGHMONEY`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Create Buttons
		if (!bet) bet = 0
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
					.setCustomId('TTT-YES-' + bet)
					.setEmoji('1024382942153285632')
					.setStyle(ButtonStyle.Success),

				new ButtonBuilder()
					.setLabel('NO')
					.setCustomId('TTT-NO-' + bet)
					.setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('JA')
						.setCustomId('TTT-YES-' + bet)
						.setEmoji('1024382942153285632')
						.setStyle(ButtonStyle.Success),

					new ButtonBuilder()
						.setLabel('NEIN')
						.setCustomId('TTT-NO-' + bet)
						.setEmoji('1024382939020152982')
						.setStyle(ButtonStyle.Danger),
				)
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
			.setDescription(`
				» <@${ctx.interaction.user.id}> challenges you, <@${user.id}> to a battle of Tic Tac Toe! The Bet is **\$${bet}**.
				Do you accept?
				
				» This Request expires <t:${Math.floor(+new Date() / 1000) + 29}:R>
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
				.setDescription(`
					» <@${ctx.interaction.user.id}> fordert dich, <@${user.id}> zu einem Spiel von Tic Tac Toe heraus! Die Wette ist **${bet}€**.
					Akzeptierst du?
					
					» Diese Anfrage wird ungültig <t:${Math.floor(+new Date() / 1000) + 29}:R>
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] TICTACTOE : ${user.id} : ${bet}€`)
		const msg = await ctx.interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row as any], fetchReply: true })

		// Init Timeout Function
		ctx.bot.ttt.set('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id, true)

		const expiration = async () => {
			// Check if Message wasnt already answered
			if (!ctx.bot.ttt.has('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id)) return
			ctx.bot.ttt.delete('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id)

			// Edit Buttons
			{
				(msg.components[0].components[0].data.disabled as boolean) = true;
				(msg.components[0].components[1].data.disabled as boolean) = true;
				(msg.components[0].components[0] as any).data.style = 2;
				(msg.components[0].components[1] as any).data.style = 2;
			}

			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
				.setDescription(`» The Request expired.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
					.setDescription(`» Die Anfrage ist abgelaufen.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			ctx.log(false, `[CMD] TICTACTOE : ${user.id} : EXPIRED`)
			ctx.interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch(() => { })
		}

		setTimeout(() => expiration(), 27000)
	}
}