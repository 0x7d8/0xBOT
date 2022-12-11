import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { PermissionFlagsBits } from "discord-api-types/v10"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
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

	async execute(interaction: CommandInteraction, client: Client, bin: void, vote: string) {
		// Set Variables
		const lang = bot.getOption(interaction, 'language') as string

		// Get String
		let langString: string
		if (lang === 'de') langString = 'DEUTSCH'
		if (lang === 'en') langString = 'ENGLISH'

		// Set Language
		bot.language.set(interaction.guild.id, lang)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('» LANGUAGE')
			.setDescription('» Language successfully set to **' + langString + '**!')
			.setFooter({ text: '» ' + client.config.version })

		if (lang === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» SPRACHE')
				.setDescription('» Sprache erfolgreich auf **' + langString + '** gesetzt!')
				.setFooter({ text: '» ' + client.config.version })
		}
			
		// Send Message
		bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LANGUAGE : ' + langString)
		return interaction.reply({ embeds: [message], ephemeral: true })
	}
}