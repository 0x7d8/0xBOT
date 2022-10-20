const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('SEND A MESSAGE')
        .setDescriptionLocalizations({
            de: 'SENDE EINE NACHRICHT'
        })
    	.setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client, lang, vote) {
        // Create Modal
        const modal = new ModalBuilder()
            .setCustomId('say')
            .setTitle('EMBED CONTENT')

        const titleInput = new TextInputBuilder()
            .setCustomId('say-title')
            .setLabel('Please enter the Title of your Embed.')
            .setMinLength(1)
            .setStyle(TextInputStyle.Short)

        const contentInput = new TextInputBuilder()
            .setCustomId('say-content')
            .setLabel('Please enter the Content of your Embed.')
            .setMinLength(1)
            .setMaxLength(1000)
            .setStyle(TextInputStyle.Paragraph)

        const title = new ActionRowBuilder().addComponents(titleInput)
        const content = new ActionRowBuilder().addComponents(contentInput)
        modal.addComponents(title, content)

        // Send Modal
        return interaction.showModal(modal)
    },
};