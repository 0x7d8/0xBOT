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
        .setName('count')
        .setDescription('PRESS A BUTTON')
        .setDescriptionLocalizations({
        de: 'DRÜCKE EINEN KNOPF'
    })
        .setDMPermission(false)
        .addStringOption((option) => option.setName('mode')
        .setNameLocalizations({
        de: 'modus'
    })
        .setDescription('THE MODE')
        .setDescriptionLocalizations({
        de: 'DER MODUS'
    })
        .setRequired(true)
        .addChoices(
    // Setup Choices
    { name: '🟢 PLUS', value: 'plus' }, { name: '🟡 PLUS & MINUS', value: 'minus' })),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const mode = bot.getOption(interaction, 'mode');
        // Create Button
        let row;
        if (mode === 'plus') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setEmoji('1024358756940775504')
                .setCustomId('COUNT-PLUS')
                .setStyle(discord_js_1.ButtonStyle.Secondary));
        }
        else {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setEmoji('1024358756940775504')
                .setCustomId('COUNT-PLUS')
                .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
                .setEmoji('1024358810418151494')
                .setCustomId('COUNT-MINUS')
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setDisabled(true));
        }
        // Create Embed
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:INFINITE:1024406060380979300> » COUNTING')
            .setDescription('» Lets Count! Current Number: **0**')
            .setFooter({ text: '» ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
                .setDescription('» Komm Zählen! Aktuelle Nummer: **0**')
                .setFooter({ text: '» ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COUNT : ' + mode.toUpperCase());
        return interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=count.js.map