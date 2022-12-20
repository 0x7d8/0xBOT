import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { PermissionFlagsBits } from "discord-api-types/v10"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('language')
		.setDescription('CHANGE THE LANGUAGE')
		.setDescriptionLocalizations({
			de: 'ÄNDERE DIE SPRACHE'
		})
		.setDMPermission(false)
		.addStringOption(option =>
			option.setName('language')
				.setNameLocalizations({
					de: 'sprache'
				})
				.setDescription('THE LANGUAGE')
				.setDescriptionLocalizations({
					de: 'DIE SPRACHE'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '🇩🇪 DEUTSCH', value: 'de' },
					{ name: '🇬🇧 ENGLISH', value: 'en' },
				))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const lang = ctx.getOption('language') as string

		// Get String
		let langString: string
		if (lang === 'de') langString = 'DEUTSCH'
		if (lang === 'en') langString = 'ENGLISH'

		// Set Language
		ctx.bot.language.set(ctx.interaction.guild.id, lang)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('» LANGUAGE')
			.setDescription(`» Language successfully set to **${langString}**!`)
			.setFooter({ text: '» ' + ctx.client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» SPRACHE')
				.setDescription(`» Sprache erfolgreich auf **${langString}** gesetzt!`)
				.setFooter({ text: '» ' + ctx.client.config.version })
		}
			
		// Send Message
		ctx.log(false, `[CMD] LANGUAGE : ${langString}`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}