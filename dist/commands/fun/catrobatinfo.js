"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('catrobatinfo')
        .setDMPermission(false)
        .setDescription('GET INFO ABOUT A CATROBAT PROJECT')
        .setDescriptionLocalizations({
        de: 'BEKOMME INFO ÜBER EIN CATROBAT PROJEKT'
    })
        .addStringOption((option) => option.setName('id')
        .setDescription('THE ID')
        .setDescriptionLocalizations({
        de: 'DIE ID'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        const axios = (await import('axios')).default;
        await interaction.deferReply();
        const id = bot.getOption(interaction, 'id');
        const req = await axios({
            method: 'GET',
            url: `https://share.catrob.at/api/project/${id}`,
            validateStatus: false,
            headers: {}
        });
        const info = req.data;
        if (req.status === 500) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
                .setDescription(`» The Catrobat Servers are down! (Status 500)`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
                    .setDescription(`» Die Catrobat Server sind down! (Status 500)`)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CATROBATINFO : ' + id.toUpperCase() + ' : SERVERSDOWN');
            return interaction.editReply({ embeds: [message] });
        }
        if (req.status === 404) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
                .setDescription(`» The Project **${id}** was not found!`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
                    .setDescription(`» Das Projekt **${id}** wurde nicht gefunden!`)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CATROBATINFO : ' + id.toUpperCase() + ' : NOTEXIST');
            return interaction.editReply({ embeds: [message] });
        }
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
            .setThumbnail(info.screenshot_small)
            .setDescription(`[${info.name}](https://share.catrob.at/project/${id})\n\n» Description\n\`${info.description.replace('`', '"')}\`\n\n» Size\n\`${Number(info.filesize).toFixed(2)}MB\``)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CUBE:1024404832452350032> » CATOBAT PROJEKT INFO')
                .setThumbnail(info.screenshot_small)
                .setDescription(`[${info.name}](https://share.catrob.at/project/${id})\n\n» Beschreibung\n\`${info.description.replace('`', '"')}\`\n\n» Größe\n\`${Number(info.filesize).toFixed(2)}MB\``)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CATROBATINFO : ' + id.toUpperCase());
        return interaction.editReply({ embeds: [message] });
    }
};
//# sourceMappingURL=catrobatinfo.js.map