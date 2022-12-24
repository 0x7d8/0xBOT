import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('cooldowns')
		.setDescription('VIEW COOLDOWNS')
		.setDescriptionLocalizations({
			de: 'SCHAUE COOLDOWNS AN'
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
		const ms = (await import('pretty-ms')).default

		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		let userobj: typeof ctx.interaction.user
		if (!user) userobj = ctx.interaction.user
		else userobj = user

		// Get Results
		let embedDesc = ''
		const rawvalues = await ctx.db.query(`select name, expires from usercooldowns where userid = $1 and expires / 1000 > extract(epoch from now());`, [userobj.id])
		for (const element of rawvalues.rows) {
			embedDesc += `» ${element.name.toUpperCase()}\n**${ms((Number(element.expires) - Date.now()), { secondsDecimalDigits: 0 })}**\n`
		}; if (embedDesc === '') { embedDesc = 'Nothing Found.'; if (ctx.metadata.language === 'de') { embedDesc = 'Nichts Gefunden.' } }

		// Create Button
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('UPDATE')
					.setEmoji('1055826473442873385')
					.setCustomId(`COOLDOWNS-${userobj.id}-${String(!!user).toUpperCase()}`)
					.setStyle(ButtonStyle.Primary),
			)
		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('AKTUALISIEREN')
						.setEmoji('1055826473442873385')
						.setCustomId(`COOLDOWNS-${userobj.id}-${String(!!user).toUpperCase()}`)
						.setStyle(ButtonStyle.Primary),
				)
		}
		
		// Create Embeds
		let message: any
		if (!user) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CLOCK:1054137880345329714> » YOUR ACTIVE COOLDOWNS')
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CLOCK:1054137880345329714> » DEINE ATIVEN COOLDOWNS')
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
		ctx.log(false, `[CMD] COOLDOWNS :${user ? ` ${user.id} :` : ''} ${rawvalues.rowCount}`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}