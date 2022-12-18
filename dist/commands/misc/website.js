"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
    data: new discord_js_2.SlashCommandBuilder()
        .setName('website')
        .setDMPermission(false)
        .setDescription('GO TO THE WEBSITE')
        .setDescriptionLocalizations({
        de: 'GEHE ZUR WEBSEITE'
    }),
    async execute(ctx) {
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('GO')
            .setURL('https://0xbot.de')
            .setStyle(discord_js_1.ButtonStyle.Link));
        if (ctx.metadata.language === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('LOS')
                .setURL('https://0xbot.de')
                .setStyle(discord_js_1.ButtonStyle.Link));
        }
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GLOBE:1024403680503529583> » WEBSITE')
            .setDescription('» Click below to go to the Website!')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » WEBSITE')
                .setDescription('» Klicke unten um zur Webseite zu gehen!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] DASHBOARD`);
        await ctx.interaction.reply({ embeds: [message], components: [row], ephemeral: true });
    }
};
//# sourceMappingURL=website.js.map