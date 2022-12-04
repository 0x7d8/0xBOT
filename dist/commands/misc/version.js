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
        .setName('version')
        .setDMPermission(false)
        .setDescription('THE BOT VERSION')
        .setDescriptionLocalizations({
        de: 'DIE BOT VERSION'
    }),
    async execute(interaction, client, lang, vote) {
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
            .setDescription('» VERSION\n`' + client.config.version + ' (V3)`\n\n» FRAMEWORK\n`discord.js v14 (14.7.1)`\n\n» AUTHOR\n`0x4096#7678`')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
                .setDescription('» VERSION\n`' + client.config.version + ' (V3)`\n\n» FRAMEWORK\n`discord.js v14 (14.7.1)`\n\n» AUTOR\n`0x4096#7678`')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VERSION');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=version.js.map