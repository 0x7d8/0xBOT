import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'stockupgrade-no'
	},

	async execute(ctx: ButtonInteraction, stock: string, userid: string, amount: number) {
		// Check if User is Authorized
		if (ctx.interaction.user.id !== userid) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» This choice is up to <@${userid}>!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Diese Frage ist für <@${userid}>!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] STOCKUPGRADE : NOTSENDER`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Emoji
		let emoji: string
		if (stock === 'green') emoji = '🟢'
		if (stock === 'blue') emoji = '🔵'
		if (stock === 'yellow') emoji = '🟡'
		if (stock === 'red') emoji = '🔴'
		if (stock === 'white') emoji = '⚪'
		if (stock === 'black') emoji = '⚫'

		// Edit Buttons
		{
			(ctx.interaction.message.components[0].components[0].data.disabled as boolean) = true;
			(ctx.interaction.message.components[0].components[1].data.disabled as boolean) = true;
			(ctx.interaction.message.components[0].components[0] as any).data.style = 2;
		}

		// Split Button with type
		const type = 'buy'
		if (type === 'buy') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCK SLOTS')
				.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to **${amount}x** ${emoji} Slots.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN SLOTS KAUFEN')
					.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zu **${amount}x** ${emoji} Slots gesagt.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[BTN] STOCKUPGRADE : ${amount}x : ${stock.toUpperCase()} : DENY`)
			return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components })
		}
	}
}