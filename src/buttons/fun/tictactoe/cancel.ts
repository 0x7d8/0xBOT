import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@/interfaces/ButtonInteraction"
export default {
	data: {
		name: 'ttt-cancel'
	},

	async execute(ctx: ButtonInteraction, bet: number) {
		// Get Users
		const cache = ctx.interaction.message.embeds
		const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@")
		const [ sender, reciever ] = description

		// Check if User is Authorized
		if (ctx.interaction.user.id !== reciever && ctx.interaction.user.id !== sender) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» <@${reciever}> or <@${sender}> has to decide this!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» <@${reciever}> oder <@${sender}> muss das entscheiden!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] TICTACTOE : CANCEL : NOTALLOWED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Edit Buttons
		for (let i = 0; i < 10; i++) {
			const row = Math.floor(i / 3)

			ctx.components.rows[row].components[i % 3].setDisabled(true)
		}

		// Transfer Money
		const betwon = bet * 2; let transaction: any
		ctx.bot.money.add(ctx.interaction.guild.id, (ctx.interaction.user.id === sender ? reciever : sender), betwon)

		// Log Transaction
		if (betwon > 0) transaction = await ctx.bot.transactions.log({
			success: true,
			sender: {
				id: (ctx.interaction.user.id === sender ? sender : reciever),
				amount: betwon,
				type: 'negative'
			}, reciever: {
				id: (ctx.interaction.user.id === sender ? reciever : sender),
				amount: betwon,
				type: 'positive'
			}
		})

		// Delete Variables
		ctx.bot.game.delete('PLAYING-' + sender)
		ctx.bot.game.delete('PLAYING-' + reciever)

		ctx.bot.ttt.delete('TURN-' + sender)
		ctx.bot.ttt.delete('TURN-' + reciever)

		ctx.bot.ttt.delete('FIELDS-' + sender)
		ctx.bot.ttt.delete('FIELDS-' + reciever)

		ctx.bot.ttt.delete('FIELD-1-' + sender)
		ctx.bot.ttt.delete('FIELD-2-' + sender)
		ctx.bot.ttt.delete('FIELD-3-' + sender)
		ctx.bot.ttt.delete('FIELD-4-' + sender)
		ctx.bot.ttt.delete('FIELD-5-' + sender)
		ctx.bot.ttt.delete('FIELD-6-' + sender)
		ctx.bot.ttt.delete('FIELD-7-' + sender)
		ctx.bot.ttt.delete('FIELD-8-' + sender)
		ctx.bot.ttt.delete('FIELD-9-' + sender)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
			.setDescription(`
				» <@${ctx.interaction.user.id}> cancelled the Game.
				<@${ctx.interaction.user.id === sender ? reciever : sender}> gets **$${betwon}**
				${(typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''}
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
				.setDescription(`
					» <@${ctx.interaction.user.id}> hat das Spiel abgebrochen.
					<@${ctx.interaction.user.id === sender ? reciever : sender}> kriegt **${betwon}€**
					${(typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''}
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[BTN] TICTACTOE : ${sender} : CANCEL`)
		return ctx.interaction.update({ content: '', embeds: [message], components: (ctx.components.getAPI()) })
	}
}