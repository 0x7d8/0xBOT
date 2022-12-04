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
        .setName('stats')
        .setDMPermission(false)
        .setDescription('SEE STATS')
        .setDescriptionLocalizations({
        de: 'SEHE STATISTIKEN'
    }),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const totalcmd = await bot.stat.get('t-all', 'cmd');
        const guildcmd = await bot.stat.get('g-' + interaction.guild.id, 'cmd');
        const usercmd = await bot.stat.get('u-' + interaction.user.id, 'cmd');
        const totalbtn = await bot.stat.get('t-all', 'btn');
        const guildbtn = await bot.stat.get('g-' + interaction.guild.id, 'btn');
        const userbtn = await bot.stat.get('u-' + interaction.user.id, 'btn');
        // Create Embed
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GEAR:1024404241701417011> » BOT STATISTICS')
            .setDescription('**»» COMMAND STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» THIS SERVER\n`' + guildcmd + '`\n\n» YOU IN TOTAL\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» THIS SERVER\n`' + guildbtn + '`\n\n» YOU IN TOTAL\n`' + userbtn + '`')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GEAR:1024404241701417011> » BOT STATISTIKEN')
                .setDescription('**»» BEFEHL STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» DIESER SERVER\n`' + guildcmd + '`\n\n» DU INSGESAMT\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» DIESER SERVER\n`' + guildbtn + '`\n\n» DU INSGESAMT\n`' + userbtn + '`')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Correct Response
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STATS');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=stats.js.map