import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDMPermission(false)
		.setDescription('SEE THE BALANCE')
		.setDescriptionLocalizations({
			de: 'SEHE DEN KONTOSTAND'
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

		// Get Money
		let money: number
		if (!user) {
			money = await ctx.bot.money.get(ctx.interaction.user.id)
			ctx.log(false, `[CMD] BALANCE : ${money}€`)
		} else {
			money = await ctx.bot.money.get(user.id)
			ctx.log(false, `[CMD] BALANCE : ${user} : ${money}€`)
		}
		
		// Create Embed
		let message: any
		if (!user) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:WALLET:1024387370793050273> » YOUR BALANCE')
  			.setDescription(`» Your Balance is **$${money}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:WALLET:1024387370793050273> » DEIN GELDSTAND')
  				.setDescription(`» Dein Geldstand beträgt **${money}€**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:WALLET:1024387370793050273> » THE BALANCE OF ' + user.username.toUpperCase())
  			.setDescription(`» The Balance of <@${user.id}> is **$${money}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:WALLET:1024387370793050273> » DER GELDSTAND VON ' + user.username.toUpperCase())
  				.setDescription(`» Der Geldstand von <@${user.id}> beträgt **${money}€**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Send Message
		return ctx.interaction.reply({ embeds: [message] })
	}
}