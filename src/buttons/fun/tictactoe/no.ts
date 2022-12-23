import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'ttt-no'
	},

	async execute(ctx: ButtonInteraction) {
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
			ctx.log(false, `[BTN] TICTACTOE : NO : NOTALLOWED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Answer Timeout Function
		ctx.bot.ttt.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id) 

		// Edit Buttons
		ctx.components.rows[0].components[0].setDisabled(true)
		ctx.components.rows[0].components[1].setDisabled(true)
		ctx.components.rows[0].components[0].setStyle(2)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
			.setDescription(`» <@${ctx.interaction.user.id}> said **NO**.`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
				.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** gesagt.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[BTN] TICTACTOE : ${sender} : DENY`)
		return ctx.interaction.update({ content: '', embeds: [message], components: (ctx.components.getAPI()) })
	}
}