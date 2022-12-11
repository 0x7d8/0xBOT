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
const discord_js_2 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_2.SlashCommandBuilder()
        .setName('vote')
        .setDMPermission(false)
        .setDescription('VOTE FOR THE BOT')
        .setDescriptionLocalizations({
        de: 'VOTE FÜR DEN BOT'
    }),
    async execute(interaction, client, lang, vote) {
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('TOPGG')
            .setURL('https://top.gg/bot/1001944224545128588/vote')
            .setStyle(discord_js_1.ButtonStyle.Link), new discord_js_1.ButtonBuilder()
            .setLabel('DBL EU')
            .setURL('https://discord-botlist.eu/vote/1001944224545128588')
            .setStyle(discord_js_1.ButtonStyle.Link));
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GLOBE:1024403680503529583> » VOTE')
            .setDescription('» Click below to go to Vote for the Bot!')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » VOTEN')
                .setDescription('» Klicke unten um für den Bot zu voten!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTE');
        return interaction.reply({ embeds: [message], components: [row], ephemeral: true });
    }
};
//# sourceMappingURL=vote.js.map