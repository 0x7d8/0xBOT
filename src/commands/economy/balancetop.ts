import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('balancetop')
		.setDMPermission(false)
		.setDescription('SEE THE TOP BALANCE')
		.setDescriptionLocalizations({
			de: 'SEHE DEN KONTOSTAND'
		})
		.addStringOption((option: any) =>
			option.setName('list')
				.setNameLocalizations({
					de: 'liste'
				})
				.setDescription('THE LIST')
				.setDescriptionLocalizations({
					de: 'DIE LISTE'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '🌍 GLOBAL', value: 'global' },
					{ name: '🏘️ SERVER', value: 'server' },
				)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const listtype = ctx.getOption('list') as string

		// Defer Reply
		await ctx.interaction.deferReply()

		// Get Top Money
		let embedDesc = ''; let count = 0
		if (listtype === 'global') {
			const rawvalues = await ctx.db.query(`select * from usermoney order by money DESC`)
			for (const element of rawvalues.rows) {
				if (count >= 10) break

				let skip = false
				const userinfo = await ctx.bot.userdb.get(element.userid)
				if (!skip) {
					count++
					let formattedcount = count.toString()
					if (count < 10) formattedcount = '0' + count
					if (element.userid !== ctx.interaction.user.id) embedDesc += `\`${formattedcount}.\` » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`
					else embedDesc += `**\`${formattedcount}.\`** » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`
				}
			}
		} else {
			const rawvalues = await ctx.db.query(`select * from usermoney where $1 = any(guilds) order by money DESC limit 10`, [ctx.interaction.guild.id])
			for (const element of rawvalues.rows) {
				count++
				let formattedcount = count.toString()
				if (count < 10) formattedcount = '0' + count
				if (element.userid !== ctx.interaction.user.id) embedDesc += `\`${formattedcount}.\` » <@${element.userid}> (**${element.money}€**)\n`
				else embedDesc += `**\`${formattedcount}.\`** » <@${element.userid}> (**${element.money}€**)\n`
			}
		}; if (embedDesc === '') { embedDesc = 'Nothing to Display.'; if (ctx.metadata.language === 'de') { embedDesc = 'Nichts zum Anzeigen.' } }
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:WALLET:1024387370793050273> » TOP BALANCES [' + listtype.toUpperCase() + ']')
  		.setDescription(embedDesc)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE [' + listtype.toUpperCase() + ']')
  			.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] BALANCETOP : ${listtype.toString().toUpperCase()}`)
		return ctx.interaction.editReply({ embeds: [message] }).catch(() => {})
	}
}