import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDMPermission(false)
		.setDescription('THE BOT PING')
		.setDescriptionLocalizations({
			de: 'DER BOT PING'
		}),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const ping = ctx.client.ws.ping

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
			.setDescription(`» The Bot Ping is **${ping}ms**!`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
				.setDescription(`» Der Ping vom Bot ist **${ping}ms**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Correct Response
		ctx.log(false, `[CMD] PING : ${ping}ms`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}