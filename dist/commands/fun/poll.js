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
        .setName('poll')
        .setDMPermission(false)
        .setDescription('MAKE A POLL')
        .setDescriptionLocalizations({
        de: 'MACHE EINE UMFRAGE'
    })
        .addStringOption((option) => option.setName('text')
        .setDescription('THE TEXT')
        .setDescriptionLocalizations({
        de: 'DER TEXT'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const question = bot.getOption(interaction, 'text');
        // Create Buttons
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1044959793317691513')
            .setLabel('0 [0%]')
            .setCustomId('POLL-YES')
            .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
            .setEmoji('1044959826914070568')
            .setLabel('0 [0%]')
            .setCustomId('POLL-NO')
            .setStyle(discord_js_1.ButtonStyle.Danger));
        // Create Embed
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:POLL:1024391847092703365> » POLL')
            .setDescription('» ' + question)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:POLL:1024391847092703365> » ABSTIMMUNG')
                .setDescription('» ' + question)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] POLL : ' + question.toUpperCase());
        return interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=poll.js.map