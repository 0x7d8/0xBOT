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
        .setName('mcsrvinfo')
        .setDMPermission(false)
        .setDescription('GET INFO ABOUT A MINECRAFT SERVER')
        .setDescriptionLocalizations({
        de: 'BEKOMME INFO ÜBER EINEN MINECRAFT SERVER'
    })
        .addStringOption((option) => option.setName('address')
        .setNameLocalizations({
        de: 'adresse'
    })
        .setDescription('THE ADDRESS')
        .setDescriptionLocalizations({
        de: 'DIE ADRESSE'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        const axios = (await import('axios')).default;
        interaction.deferReply();
        const address = bot.getOption(interaction, 'address');
        const req = await axios({
            method: 'GET',
            url: `https://api.mcsrvstat.us/2/${encodeURIComponent(address)}`,
            validateStatus: false,
            headers: {}
        });
        const info = req.data;
        if (info.ip === '127.0.0.1') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
                .setDescription(`» The Server **${address}** was not found!`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
                    .setDescription(`» Der Server **${address}** wurde nicht gefunden!`)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MCSRVINFO : ' + address.toUpperCase() + ' : NOTEXIST');
            return interaction.editReply({ embeds: [message] });
        }
        let status = '🟡 UNKNOWN';
        if ('online' in info && info.online)
            status = '🟢 ONLINE';
        if ('online' in info && !info.online)
            status = '🔴 OFFLINE';
        let players = { online: '?', slots: '?' };
        if ('players' in info)
            players = { online: info.players.online.toString(), slots: info.players.max.toString() };
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
            .setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
            .setDescription(`${status}\n\n» IP\n\`${info.ip}:${info.port}\`\n\n» Players\n\`${players.online}/${players.slots}\``)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
                .setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
                .setDescription(`${status}\n\n» IP\n\`${info.ip}:${info.port}\`\n\n» Spieler\n\`${players.online}/${players.slots}\``)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MCSRVINFO : ' + address.toUpperCase());
        return interaction.editReply({ embeds: [message] });
    }
};
//# sourceMappingURL=mcsrvinfo.js.map