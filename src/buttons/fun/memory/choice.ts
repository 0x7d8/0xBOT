import { EmbedBuilder } from "discord.js"
import { setTimeout as wait } from "timers/promises"

// Function for Button Row Grabber
const rowGet = (button: number) => {
	let row: number, btn: number
	if (button < 21) { row = 3; btn = button-15 }
	if (button < 16) { row = 2; btn = button-10 }
	if (button < 11) { row = 1; btn = button-5 }
	if (button < 6) { row = 0; btn = button }

	const output = []
	if (btn > 0) output[0] = (btn - 1)
	else output[0] = btn
	output[1] = row

	return output
}

import ButtonInteraction from "@/interfaces/ButtonInteraction"
export default {
	data: {
		name: 'memory-choice'
	},

	async execute(ctx: ButtonInteraction, bet: number, sel: number) {
		// Get Users
		const cache = ctx.interaction.message.embeds
		const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@")
		const [ sender, reciever ] = description

		// Check if User is playing
		if (sender !== ctx.interaction.user.id && reciever !== ctx.interaction.user.id) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You arent playing!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du spielst garnicht mit!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] MEMORY : NOTPLAYING`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check Turn
		if (ctx.interaction.user.id !== ctx.bot.memory.get('TURN-' + sender)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» Its not your turn!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Es ist nicht dein Zug!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] MEMORY : NOTTURN`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Defer Reply
		await ctx.interaction.deferUpdate()

		// Translate Turn to Emoji
		let turnemoji: string
		if (ctx.bot.memory.get('TURN-' + sender) === sender) turnemoji = '🔵'
		if (ctx.bot.memory.get('TURN-' + sender) === reciever) turnemoji = '🔴'

		/// Set Variables
		let doflush = false
		// Select Field
		ctx.bot.memory.set('D_EMOJI-' + sel + '-' + sender, { id: ctx.bot.memory.get('I_EMOJI-' + sel + '-' + sender), name: 'MEMORY' })
		ctx.bot.memory.set('DISABLED-' + sel + '-' + sender, true)
		const comp = rowGet(sel)
		ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true)
		ctx.components.rows[comp[1]].components[comp[0]].setEmoji(ctx.bot.memory.get('D_EMOJI-' + sel + '-' + sender))

		// Add Field Values to Cache
		ctx.bot.memory.get('C_PLAYERSELECT-' + ctx.interaction.user.id).push(ctx.bot.memory.get('I_EMOJI-' + sel + '-' + sender))
		ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id).push(sel)

		// Count Player Interactions Up by 1
		ctx.bot.memory.set('A_PLAYERSELECT-' + ctx.interaction.user.id, (Number(ctx.bot.memory.get('A_PLAYERSELECT-' + ctx.interaction.user.id))+1))

		// Check if its the 2nd Player Interaction
		if (ctx.bot.memory.get('A_PLAYERSELECT-' + ctx.interaction.user.id) === 2) {
			// Check if Both Fields have the same Emoji
			if (ctx.bot.memory.get('C_PLAYERSELECT-' + ctx.interaction.user.id)[0] === ctx.bot.memory.get('C_PLAYERSELECT-' + ctx.interaction.user.id)[1]) {
				// Add Point
				ctx.bot.memory.set('POINTS-' + ctx.interaction.user.id, (Number(ctx.bot.memory.get('POINTS-' + ctx.interaction.user.id))+1))

				// Get Button Position
				const comp1 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0])
				const comp2 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1])

				// Color the Fields
				if (ctx.interaction.user.id === sender) {
					ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, 1)
					ctx.components.rows[comp[1]].components[comp[0]].setStyle(1)
					ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, 1)
					ctx.components.rows[comp2[1]].components[comp2[0]].setStyle(1)
				}; if (ctx.interaction.user.id === reciever) {
					ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, 4)
					ctx.components.rows[comp1[1]].components[comp1[0]].setStyle(4)
					ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, 4)
					ctx.components.rows[comp2[1]].components[comp2[0]].setStyle(4)
				}

				// Clear Cache Arrays
				ctx.bot.memory.set('A_PLAYERSELECT-' + ctx.interaction.user.id, 0)
				ctx.bot.memory.set('B_PLAYERSELECT-' + ctx.interaction.user.id, [])
				ctx.bot.memory.set('C_PLAYERSELECT-' + ctx.interaction.user.id, [])
			} else { // If they dont have the same Emoji
				// Get Button Positions
				const comp1 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0])
				const comp2 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1])

				// Clear the Fields
				ctx.components.rows[comp1[1]].components[comp1[0]].setDisabled(false)
				ctx.components.rows[comp1[1]].components[comp1[0]].setEmoji('1020411843644243998')
				ctx.components.rows[comp2[1]].components[comp2[0]].setDisabled(false)
				ctx.components.rows[comp2[1]].components[comp2[0]].setEmoji('1020411843644243998')

				ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, false)
				ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, false)

				// Turn Switcher
				if (ctx.bot.memory.get('TURN-' + sender) === sender) {
					ctx.bot.memory.set('TURN-' + sender, reciever)
					turnemoji = '🔴'
				} else {
					ctx.bot.memory.set('TURN-' + sender, sender)
					turnemoji = '🔵'
				}
			}

			// Actions that run in both Cases
			doflush = true
		}

		// Edit Buttons
		if (doflush) {
			for (let i = 0; i < 20; i++) {
				const row = Math.floor(i / 5)

				ctx.components.rows[row].components[i % 5].setDisabled(true)
				ctx.components.rows[row].components[i % 5].setEmoji(ctx.bot.memory.get('D_EMOJI-' + (i+1) + '-' + sender))
				ctx.components.rows[row].components[i % 5].setStyle(ctx.bot.memory.get('STYLE-' + (i+1) + '-' + sender))
			}
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
			.setDescription(`
				» <@${sender}> is playing Memory with <@${reciever}>!
				The Bet is **\$${bet}**
				
				🔵 » Points of <@${sender}> are **${ctx.bot.memory.get('POINTS-' + sender)}**
				🔴 » Points of <@${reciever}> are **${ctx.bot.memory.get('POINTS-' + reciever)}**
			`).setFooter({ text: '» ' + ctx.client.config.version + ' » CURRENT TURN: ' + turnemoji })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
				.setDescription(`
					» <@${sender}> spielt mit <@${reciever}> Memory!
					Die Wette ist **${bet}€**
					
					🔵 » Punkte von <@${sender}> sind **${ctx.bot.memory.get('POINTS-' + sender)}**
					🔴 » Punkte von <@${reciever}> sind **${ctx.bot.memory.get('POINTS-' + reciever)}**
				`).setFooter({ text: '» ' + ctx.client.config.version + ' » AM ZUG: ' + turnemoji })
		}

		// Send Message
		ctx.log(false, `[BTN] MEMORY : ${sel} : ${ctx.bot.memory.get('I_EMOJI-' + sel + '-' + sender)}`)
		ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true } as any)

		// Check for Special Conditions
		if (!doflush) return
		await wait(2000)

		// Remove Emojis
		ctx.bot.memory.set('D_EMOJI-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' })
		ctx.bot.memory.set('D_EMOJI-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' })
		ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, false)
		ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, false)

		// Clear Cache Arrays
		ctx.bot.memory.set('A_PLAYERSELECT-' + ctx.interaction.user.id, 0)
		ctx.bot.memory.set('B_PLAYERSELECT-' + ctx.interaction.user.id, [])
		ctx.bot.memory.set('C_PLAYERSELECT-' + ctx.interaction.user.id, [])

		// Edit Buttons
		for (let i = 0; i < 20; i++) {
			const row = Math.floor(i / 5)

			ctx.components.rows[row].components[i % 5].setDisabled(ctx.bot.memory.get('DISABLED-' + (i+1) + '-' + sender))
			ctx.components.rows[row].components[i % 5].setEmoji(ctx.bot.memory.get('D_EMOJI-' + (i+1) + '-' + sender))
			ctx.components.rows[row].components[i % 5].setStyle(ctx.bot.memory.get('STYLE-' + (i+1) + '-' + sender))
		}

		// Check if Round has ended
		if((ctx.bot.memory.get('POINTS-' + sender) + ctx.bot.memory.get('POINTS-' + reciever)) === 10) {
			// Check Who Won
			const senderpoints = ctx.bot.memory.get('POINTS-' + sender)
			const recieverpoints = ctx.bot.memory.get('POINTS-' + reciever)

			let winner = '**Noone**', rawWinner: string
			if (ctx.metadata.language === 'de') winner = '**Niemand**'
			if (senderpoints > recieverpoints) { winner = '<@' + sender + '>'; rawWinner = sender }
			else if (senderpoints < recieverpoints) { winner = '<@' + reciever + '>'; rawWinner = reciever }

			// Transfer Money
			const betwon = bet * 2; let transaction: any
			if (winner !== '**Noone**' && winner !== '**Niemand**') {
				ctx.bot.money.add(ctx.interaction.guild.id, rawWinner, betwon)

				// Log Transaction
				if (betwon > 0) transaction = await ctx.bot.transactions.log({
					success: true,
					sender: {
						id: (rawWinner === sender ? reciever : sender),
						amount: betwon,
						type: 'negative'
					}, reciever: {
						id: rawWinner,
						amount: betwon,
						type: 'positive'
					}
				})
			} else {
				ctx.bot.money.add(ctx.interaction.guild.id, sender, bet)
				ctx.bot.money.add(ctx.interaction.guild.id, reciever, bet)
			}

			// Edit Button
			ctx.components.rows[4].components[0].setDisabled(true)

			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
				.setDescription(`
					» <@${sender}> is playing Memory with <@${reciever}>!
					The Bet is **\$${bet}**
					
					🔵 » Points of <@${sender}> are **${ctx.bot.memory.get('POINTS-' + sender)}**
					🔴 » Points of <@${reciever}> are **${ctx.bot.memory.get('POINTS-' + reciever)}**
					
					<:AWARD:1024385473524793445> ${winner} has won **\$${betwon}**.${(typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''}
				`).setFooter({ text: '» ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
					.setDescription(`
						» <@${sender}> spielt mit <@${reciever}> Memory!
						Die Wette ist **${bet}€**
						
						🔵 » Punkte von <@${sender}> sind **${ctx.bot.memory.get('POINTS-' + sender)}**
						🔴 » Punkte von <@${reciever}> sind **${ctx.bot.memory.get('POINTS-' + reciever)}**
						
						<:AWARD:1024385473524793445> ${winner} hat **${betwon}€** gewonnen.${(typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''}
					`).setFooter({ text: '» ' + ctx.client.config.version })
			}

			// Delete Variables
			ctx.bot.game.delete('PLAYING-' + sender)
			ctx.bot.game.delete('PLAYING-' + reciever)

			ctx.bot.memory.delete('TURN-' + sender)
			ctx.bot.memory.delete('A_PLAYERSELECT-' + sender)
			ctx.bot.memory.delete('A_PLAYERSELECT-' + reciever)
			ctx.bot.memory.delete('POINTS-' + sender)
			ctx.bot.memory.delete('POINTS-' + reciever)

			ctx.bot.memory.delete('E_PLAYERSELECT-' + sender)
			ctx.bot.memory.delete('E_PLAYERSELECT-' + reciever)
			ctx.bot.memory.delete('B_PLAYERSELECT-' + reciever)
			ctx.bot.memory.delete('B_PLAYERSELECT-' + sender)
			ctx.bot.memory.delete('C_PLAYERSELECT-' + reciever)
			ctx.bot.memory.delete('C_PLAYERSELECT-' + sender)

			// Update Message
			return ctx.interaction.message.edit({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true } as any)
		}

		// Update Message
		return ctx.interaction.message.edit({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true } as any)
	}
}