import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

// Connect to Database
import config from "@config"
import { default as pg } from "pg"
const db = new pg.Pool({
	host: config.database.oxbot.host,
	database: config.database.oxbot.database,
	user: config.database.oxbot.username,
	password: config.database.oxbot.password,
	port: 5432,
	ssl: true
})

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
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

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Set Variables
		const listtype = bot.getOption(interaction, 'list') as string

		// Defer Reply
		await interaction.deferReply()

		// Get Top Money
		let embedDesc = ''; let count = 0
		if (listtype === 'global') {
			const rawvalues = await db.query(`select * from usermoney order by money DESC`)
			for (const element of rawvalues.rows) {
				if (count >= 10) break

				let skip = false
				const userinfo = await bot.userdb.get(element.userid)
				if (!skip) {
					count++
					let formattedcount = count.toString()
					if (count < 10) formattedcount = '0' + count
					if (element.userid !== interaction.user.id) embedDesc += `\`${formattedcount}.\` » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`
					else embedDesc += `**\`${formattedcount}.\`** » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`
				}
			}
		} else {
			const rawvalues = await db.query(`select * from usermoney where $1 = any(guilds) order by money DESC limit 10`, [interaction.guild.id])
			for (const element of rawvalues.rows) {
				count++
				let formattedcount = count.toString()
				if (count < 10) formattedcount = '0' + count
				if (element.userid !== interaction.user.id) embedDesc += `\`${formattedcount}.\` » <@${element.userid}> (**${element.money}€**)\n`
				else embedDesc += `**\`${formattedcount}.\`** » <@${element.userid}> (**${element.money}€**)\n`
			}
		}; if (embedDesc === '') { embedDesc = 'Nothing to Display.'; if (lang === 'de') { embedDesc = 'Nichts zum Anzeigen.' } }
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:WALLET:1024387370793050273> » TOP BALANCES [' + listtype.toUpperCase() + ']')
  			.setDescription(embedDesc)
			.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE [' + listtype.toUpperCase() + ']')
  				.setDescription(embedDesc)
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCETOP : ' + listtype.toString().toUpperCase());
		return interaction.editReply({ embeds: [message] }).catch(() => {})
	}
}