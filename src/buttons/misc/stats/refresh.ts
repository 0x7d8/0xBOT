import { EmbedBuilder } from "discord.js"

import ButtonInteraction from "@/interfaces/ButtonInteraction"
export default {
	data: {
		name: 'stats-refresh'
	},

	async execute(ctx: ButtonInteraction, userId: string, pageNumber: number, selfCmd: boolean) {
		// Get Stats
		const statsType = ['cmd', 'btn', 'mod'][pageNumber - 1]
		const totalStats = await ctx.bot.stat.get('t-all', statsType)
		const guildStats = await ctx.bot.stat.get('g-' + ctx.interaction.guild.id, statsType)
		const userStats = await ctx.bot.stat.get('u-' + userId, statsType)

		// Edit Buttons
		ctx.components.rows[0].components[0].setCustomId(`STATS-REFRESH-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`)
		ctx.components.rows[0].components[1].setCustomId(`STATS-BACK-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`)
		ctx.components.rows[0].components[2].setCustomId(`STATS-NEXT-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`)

		// Get UserObj
		let userobj: typeof ctx.interaction.user
		if (selfCmd) userobj = await ctx.client.users.fetch(userId)

		// Create Embed
		let message: EmbedBuilder
		if (!selfCmd) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » YOUR INTERACTION STATISTICS')
				.setDescription(`
					${statsType === 'cmd' ? '🤖 Commands' : (statsType === 'btn' ? '🖱️ Buttons' : '💻 Modals')}

					» Globally Executed
					\`\`\`${totalStats}\`\`\`
					» Guild Executed
					\`\`\`${guildStats}\`\`\`
					» You Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GEAR:1024404241701417011> » DEINE INTERAKTIONS STATISTIKEN')
					.setDescription(`
						${statsType === 'cmd' ? '🤖 Befehle' : (statsType === 'btn' ? '🖱️ Buttons' : '💻 Modale')}

						» Global Ausgeführt
						\`\`\`${totalStats}\`\`\`
						» Server Ausgeführt
						\`\`\`${guildStats}\`\`\`
						» Du Ausgeführt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » INTERACTION STATISTICS OF ' + userobj.username.toUpperCase())
				.setDescription(`
					${statsType === 'cmd' ? '🤖 Commands' : (statsType === 'btn' ? '🖱️ Buttons' : '💻 Modals')}

					» Globally Executed
					\`\`\`${totalStats}\`\`\`
					» Guild Executed
					\`\`\`${guildStats}\`\`\`
					» User Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GEAR:1024404241701417011> » INTERAKTIONS STATISTIKEN VON ' + userobj.username.toUpperCase())
					.setDescription(`
						${statsType === 'cmd' ? '🤖 Befehle' : (statsType === 'btn' ? '🖱️ Buttons' : '💻 Modale')}

						» Global Ausgeführt
						\`\`\`${totalStats}\`\`\`
						» Server Ausgeführt
						\`\`\`${guildStats}\`\`\`
						» Nutzer Ausgeführt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber })
			}
		}

		// Send Message
		ctx.log(false, `[BTN] STATS :${ctx.interaction.user.id !== userId ? ` ${userId} :` : ''} REFRESH : ${pageNumber}`)
		return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
	}
}