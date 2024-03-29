import { SlashCommandBuilder, EmbedBuilder, version } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDMPermission(false)
		.setDescription('THE BOT VERSION')
		.setDescriptionLocalizations({
			de: 'DIE BOT VERSION'
		}),

	async execute(ctx: CommandInteraction) {
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
			.setDescription(`
				» Bot Version
				\`\`\`${ctx.client.config.version} (V3)\`\`\`
				» Library
				\`\`\`discord.js ${version}\`\`\`
				» Author
				\`\`\`0x4096#7678\`\`\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
				.setDescription(`
					» Bot Version
					\`\`\`${ctx.client.config.version} (V3)\`\`\`
					» Bibliothek
					\`\`\`discord.js ${version}\`\`\`
					» Autor
					\`\`\`0x4096#7678\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Correct Response
		ctx.log(false, `[CMD] VERSION`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}