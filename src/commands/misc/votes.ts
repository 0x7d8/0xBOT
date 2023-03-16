import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('votes')
		.setDMPermission(false)
		.setDescription('SEE THE VOTES')
		.setDescriptionLocalizations({
			de: 'SEHE DIE VOTES'
		})
		.addUserOption((option) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		
		// Set User ID
		let votes: number
		if (!user) {
			votes = await ctx.bot.votes.get(ctx.interaction.user.id + '-A');
			ctx.log(false, `[CMD] VOTES : ${votes}`)
		} else {
			votes = await ctx.bot.votes.get(user.id + '-A');
			ctx.log(false, `[CMD] VOTES : ${user.id} : ${votes}`)
		}
		
		// Check if Plural or not
		let word: string
		if (votes === 1) word = 'Vote'
		else word = 'Votes'
		
		// Create Embed
		let message: any
		if (!user) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » YOUR VOTES')
  			.setDescription(`» You have **${votes}** ${word}!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GLOBE:1024403680503529583> » DEINE VOTES')
  				.setDescription(`» Du hast **${votes}** ${word}!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » THE VOTES OF ' + user.username.toUpperCase())
  			.setDescription(`» <@${user.id}> has **${votes}** ${word}!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GLOBE:1024403680503529583> » DIE VOTES VON ' + user.username.toUpperCase())
  				.setDescription(`» <@${user.id}> hat **${votes}** ${word}!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Send Message
		return ctx.interaction.reply({ embeds: [message] })
	}
}