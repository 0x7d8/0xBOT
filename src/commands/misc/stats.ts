import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDMPermission(false)
		.setDescription('SEE STATS')
		.setDescriptionLocalizations({
			de: 'SEHE STATISTIKEN'
		}),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Set Variables
		const totalcmd = await bot.stat.get('t-all', 'cmd')
		const guildcmd = await bot.stat.get('g-' + interaction.guild.id, 'cmd')
		const usercmd = await bot.stat.get('u-' + interaction.user.id, 'cmd')
		
		const totalbtn = await bot.stat.get('t-all', 'btn')
		const guildbtn = await bot.stat.get('g-' + interaction.guild.id, 'btn')
		const userbtn = await bot.stat.get('u-' + interaction.user.id, 'btn')

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » BOT STATISTICS')
				.setDescription('**»» COMMAND STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» THIS SERVER\n`' + guildcmd + '`\n\n» YOU IN TOTAL\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» THIS SERVER\n`' + guildbtn + '`\n\n» YOU IN TOTAL\n`' + userbtn + '`')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » BOT STATISTIKEN')
				.setDescription('**»» BEFEHL STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» DIESER SERVER\n`' + guildcmd + '`\n\n» DU INSGESAMT\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» DIESER SERVER\n`' + guildbtn + '`\n\n» DU INSGESAMT\n`' + userbtn + '`')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
		}

		// Send Correct Response
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STATS')
		return interaction.reply({ embeds: [message], ephemeral: true })
	}
}