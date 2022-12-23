import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDMPermission(false)
		.setDescription('SEE STATS')
		.setDescriptionLocalizations({
			de: 'SEHE STATISTIKEN'
		}),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const totalcmd = await ctx.bot.stat.get('t-all', 'cmd')
		const guildcmd = await ctx.bot.stat.get('g-' + ctx.interaction.guild.id, 'cmd')
		const usercmd = await ctx.bot.stat.get('u-' + ctx.interaction.user.id, 'cmd')
		
		const totalbtn = await ctx.bot.stat.get('t-all', 'btn')
		const guildbtn = await ctx.bot.stat.get('g-' + ctx.interaction.guild.id, 'btn')
		const userbtn = await ctx.bot.stat.get('u-' + ctx.interaction.user.id, 'btn')

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GEAR:1024404241701417011> » BOT STATISTICS')
			.setDescription(`
				**»» COMMAND STATS**
				» GLOBAL
				\`${totalcmd}\`
				
				» THIS SERVER
				\`${guildcmd}\`
				
				» YOU IN TOTAL
				\`${usercmd}\`
				
				**»» BUTTON STATS**
				» GLOBAL
				\`${totalbtn}\`
				
				» THIS SERVER
				\`${guildbtn}\`
				
				» YOU IN TOTAL
				\`${userbtn}\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » BOT STATISTIKEN')
				.setDescription(`
					**»» BEFEHL STATS**
					» GLOBAL
					\`${totalcmd}\`
					
					» DIESER SERVER
					\`${guildcmd}\`
					
					» DU INSGESAMT
					\`${usercmd}\`
					
					**»» BUTTON STATS**
					» GLOBAL
					\`${totalbtn}\`
					
					» DIESER SERVER
					\`${guildbtn}\`
					
					» DU INSGESAMT
					\`${userbtn}\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Correct Response
		ctx.log(false, `[CMD] STATS`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}