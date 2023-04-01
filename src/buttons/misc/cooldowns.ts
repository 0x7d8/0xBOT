import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@/interfaces/ButtonInteraction"
export default {
	data: {
		name: 'cooldowns'
	},

	async execute(ctx: ButtonInteraction, userId: string, selfCmd: boolean) {
		const ms = (await import('pretty-ms')).default

		// Set Variables
		let userobj: typeof ctx.interaction.user
		if (selfCmd) userobj = await ctx.client.users.fetch(userId)

		// Get Results
		let embedDesc = ''
		const rawvalues = await ctx.db.query(`select name, expires from usercooldowns where userid = $1 and expires / 1000 > extract(epoch from now());`, [userId])
		for (const element of rawvalues.rows) {
			embedDesc += `» ${element.name.toUpperCase()}\n**${ms((Number(element.expires) - Date.now()), { secondsDecimalDigits: 0 })}**\n`
		}; if (embedDesc === '') { embedDesc = 'Nothing Found.'; if (ctx.metadata.language === 'de') { embedDesc = 'Nichts Gefunden.' } }

		// Create Embeds
		let message: EmbedBuilder
		if (!selfCmd) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CLOCK:1054137880345329714> » YOUR ACTIVE COOLDOWNS')
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CLOCK:1054137880345329714> » DEINE AKTIVEN COOLDOWNS')
					.setDescription(embedDesc)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CLOCK:1054137880345329714> » ACTIVE COOLDOWNS OF ' + userobj.username.toUpperCase())
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CLOCK:1054137880345329714> » AKTIVE COOLDOWNS VON ' + userobj.username.toUpperCase())
					.setDescription(embedDesc)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Send Message
		ctx.log(false, `[BTN] COOLDOWNS :${ctx.interaction.user.id !== userId ? ` ${userId} :` : ''} ${rawvalues.rowCount}`)
		return ctx.interaction.update({ embeds: [message] })
	}
}