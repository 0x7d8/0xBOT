import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import { PermissionFlagsBits } from "discord-api-types/v10"
import { SlashCommandBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('SEND A MESSAGE')
		.setDescriptionLocalizations({
			de: 'SENDE EINE NACHRICHT'
		})
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(ctx: CommandInteraction) {
		// Create Modal
		const modal = new ModalBuilder()
			.setCustomId('say')
			.setTitle('EMBED CONTENT')

		let titleInput = new TextInputBuilder()
			.setCustomId('say-title')
			.setLabel('Please enter the Title of your Embed.')
			.setMinLength(1)
			.setStyle(TextInputStyle.Short)

		let contentInput = new TextInputBuilder()
			.setCustomId('say-content')
			.setLabel('Please enter the Content of your Embed.')
			.setMinLength(1)
			.setMaxLength(1000)
			.setStyle(TextInputStyle.Paragraph)

		if (ctx.metadata.language === 'de') {
			titleInput = new TextInputBuilder()
				.setCustomId('say-title')
				.setLabel('Bitte geb den Titel der Embed an.')
				.setMinLength(1)
				.setStyle(TextInputStyle.Short)

			contentInput = new TextInputBuilder()
				.setCustomId('say-content')
				.setLabel('Bitte geb den Inhalt der Embed an.')
				.setMinLength(1)
				.setMaxLength(1000)
				.setStyle(TextInputStyle.Paragraph)
		}

		const title = new ActionRowBuilder().addComponents(titleInput)
		const content = new ActionRowBuilder().addComponents(contentInput)
		modal.addComponents(title as any, content as any)

		// Send Modal
		return ctx.interaction.showModal(modal)
	}
}