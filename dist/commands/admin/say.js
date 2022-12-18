"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
const discord_js_2 = require("discord.js");
exports.default = {
    data: new discord_js_2.SlashCommandBuilder()
        .setName('say')
        .setDescription('SEND A MESSAGE')
        .setDescriptionLocalizations({
        de: 'SENDE EINE NACHRICHT'
    })
        .setDMPermission(false)
        .setDefaultMemberPermissions(v10_1.PermissionFlagsBits.Administrator),
    async execute(ctx) {
        const modal = new discord_js_1.ModalBuilder()
            .setCustomId('say')
            .setTitle('EMBED CONTENT');
        let titleInput = new discord_js_1.TextInputBuilder()
            .setCustomId('say-title')
            .setLabel('Please enter the Title of your Embed.')
            .setMinLength(1)
            .setStyle(discord_js_1.TextInputStyle.Short);
        let contentInput = new discord_js_1.TextInputBuilder()
            .setCustomId('say-content')
            .setLabel('Please enter the Content of your Embed.')
            .setMinLength(1)
            .setMaxLength(1000)
            .setStyle(discord_js_1.TextInputStyle.Paragraph);
        if (ctx.metadata.language === 'de') {
            titleInput = new discord_js_1.TextInputBuilder()
                .setCustomId('say-title')
                .setLabel('Bitte geb den Titel der Embed an.')
                .setMinLength(1)
                .setStyle(discord_js_1.TextInputStyle.Short);
            contentInput = new discord_js_1.TextInputBuilder()
                .setCustomId('say-content')
                .setLabel('Bitte geb den Inhalt der Embed an.')
                .setMinLength(1)
                .setMaxLength(1000)
                .setStyle(discord_js_1.TextInputStyle.Paragraph);
        }
        const title = new discord_js_1.ActionRowBuilder().addComponents(titleInput);
        const content = new discord_js_1.ActionRowBuilder().addComponents(contentInput);
        modal.addComponents(title, content);
        return ctx.interaction.showModal(modal);
    }
};
//# sourceMappingURL=say.js.map