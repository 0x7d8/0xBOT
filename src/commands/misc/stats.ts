import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('SEE STATS')
		.setDescriptionLocalizations({
			de: 'SEHE STATISTIKEN'
		})
		.setDMPermission(false)
		.addUserOption((option: any) =>
			option.setName('user')
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		let userobj: typeof ctx.interaction.user
		if (!user) {
			userobj = ctx.interaction.user
			ctx.log(false, `[CMD] STATS : 1`)
		} else {
			userobj = user
			ctx.log(false, `[CMD] STATS : ${user.id} : 1`)
		}

		const totalStats = await ctx.bot.stat.get('t-all', 'cmd')
		const guildStats = await ctx.bot.stat.get('g-' + userobj.id, 'cmd')
		const userStats = await ctx.bot.stat.get('u-' + userobj.id, 'cmd')

		// Create Buttons
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1055826473442873385')
					.setLabel('UPDATE')
					.setCustomId(`STATS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`)
					.setStyle(ButtonStyle.Primary),

				new ButtonBuilder()
					.setEmoji('1055825023987888169')
					.setCustomId(`STATS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),

				new ButtonBuilder()
					.setEmoji('1055825050126786590')
					.setCustomId(`STATS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
					.setStyle(ButtonStyle.Secondary),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setEmoji('1055826473442873385')
						.setLabel('AKTUALISIEREN')
						.setCustomId(`STATS-REFRESH-${userobj.id}-${String(!!user).toUpperCase()}`)
						.setStyle(ButtonStyle.Primary),

					new ButtonBuilder()
						.setEmoji('1055825023987888169')
						.setCustomId(`STATS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),

					new ButtonBuilder()
						.setEmoji('1055825050126786590')
						.setCustomId(`STATS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
						.setStyle(ButtonStyle.Secondary),
				)
		}

		// Create Embed
		let message: any
		if (!user) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » YOUR INTERACTION STATISTICS')
				.setDescription(`
					🤖 Commands

					» Globally Executed
					\`\`\`${totalStats}\`\`\`
					» Guild Executed
					\`\`\`${guildStats}\`\`\`
					» You Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GEAR:1024404241701417011> » DEINE INTERAKTIONS STATISTIKEN')
					.setDescription(`
						🤖 Befehle

						» Global Ausgeführt
						\`\`\`${totalStats}\`\`\`
						» Server Ausgeführt
						\`\`\`${guildStats}\`\`\`
						» Du Ausgeführt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » INTERACTION STATISTICS OF ' + userobj.username.toUpperCase())
				.setDescription(`
					🤖 Commands

					» Globally Executed
					\`\`\`${totalStats}\`\`\`
					» Guild Executed
					\`\`\`${guildStats}\`\`\`
					» User Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GEAR:1024404241701417011> » INTERAKTIONS STATISTIKEN VON ' + userobj.username.toUpperCase())
					.setDescription(`
						🤖 Befehle

						» Global Ausgeführt
						\`\`\`${totalStats}\`\`\`
						» Server Ausgeführt
						\`\`\`${guildStats}\`\`\`
						» Nutzer Ausgeführt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' })
			}
		}

		// Send Correct Response
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}