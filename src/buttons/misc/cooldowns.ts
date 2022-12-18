import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'cooldowns'
	},

	async execute(ctx: ButtonInteraction, userId: string, userName: string) {
		const ms = (await import('pretty-ms')).default

		// Set Variables
		let userobj: any
		if (userId === ctx.interaction.user.id) {
			userobj = ctx.interaction.user
			ctx.log(false, `[BTN] COOLDOWNS`)
		} else {
			userobj = { id: userId, username: userName }
			ctx.log(false, `[BTN] COOLDOWNS : ${userId}`)
		}

		// Get Results
		let embedDesc = ''
		const rawvalues = await ctx.db.query(`select name, expires from usercooldowns where userid = $1 and expires / 1000 > extract(epoch from now());`, [userobj.id])

		for (const element of rawvalues.rows) {
			embedDesc += `» ${element.name.toUpperCase()}\n**${ms((Number(element.expires) - Date.now()), { secondsDecimalDigits: 0 })}**\n`
		}; if (embedDesc === '') { embedDesc = 'Nothing Found.'; if (ctx.metadata.language === 'de') { embedDesc = 'Nichts Gefunden.' } }

		// Create Embeds
		let message: any
		if (userId === ctx.interaction.user.id) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CLOCK:1054137880345329714> » YOUR COOLDOWNS')
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CLOCK:1054137880345329714> » DEINE COOLDOWNS')
					.setDescription(embedDesc)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CLOCK:1054137880345329714> » COOLDOWNS OF ' + userobj.username.toUpperCase())
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CLOCK:1054137880345329714> » COOLDOWNS VON ' + userobj.username.toUpperCase())
					.setDescription(embedDesc)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Send Message
		return ctx.interaction.update({ embeds: [message] })
	}
}