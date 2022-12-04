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
        .setName('search')
        .setDMPermission(false)
        .setDescription('SHOW A BUTTON TO A SEARCH')
        .setDescriptionLocalizations({
        de: 'ZEIGE EINEN KNOPF ZU EINER SUCHE'
    })
        .addStringOption((option) => option.setName('query')
        .setNameLocalizations({
        de: 'suche'
    })
        .setDescription('THE QUERY')
        .setDescriptionLocalizations({
        de: 'DIE SUCHE'
    })
        .setRequired(true))
        .addStringOption((option) => option.setName('engine')
        .setDescription('THE SEARCH ENGINE')
        .setDescriptionLocalizations({
        de: 'DIE SUCHMASCHINE'
    })
        .setRequired(false)
        .addChoices(
    // Setup Choices
    { name: '🤔 GOOGLE', value: 'Google' }, { name: '⭐ BING', value: 'Bing' }, { name: '⭐ YAHOO', value: 'Yahoo' }, { name: '⭐ DUCKDUCKGO', value: 'DuckDuckGo' })),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        let query = bot.getOption(interaction, 'query');
        let engine = bot.getOption(interaction, 'engine');
        if (!engine)
            engine = 'Google';
        // Create Query
        query = encodeURIComponent(query);
        // Create Buttons
        const google = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('👀 ANSCHAUEN')
            .setURL("https://google.com/search?q=" + query)
            .setStyle(discord_js_1.ButtonStyle.Link));
        const bing = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('👀 ANSCHAUEN')
            .setURL("https://bing.com/search?q=" + query)
            .setStyle(discord_js_1.ButtonStyle.Link));
        const yahoo = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('👀 ANSCHAUEN')
            .setURL("https://search.yahoo.com/search?q=" + query)
            .setStyle(discord_js_1.ButtonStyle.Link));
        const duck = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('👀 ANSCHAUEN')
            .setURL("https://duckduckgo.com/?q=" + query)
            .setStyle(discord_js_1.ButtonStyle.Link));
        // Create Embed
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:SEARCH:1024389710279348354> » SEARCH')
            .setDescription('» Click Below to look up results for **' + decodeURIComponent(query) + '** on **' + engine + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:SEARCH:1024389710279348354> » SUCHEN')
                .setDescription('» Klicke unten um nach Ergebnissen für **' + decodeURIComponent(query) + '** auf **' + engine + '** zu finden!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] SEARCH : "' + decodeURIComponent(query).toUpperCase() + '" : ' + engine.toUpperCase());
        if (engine === 'Google') {
            await interaction.reply({ embeds: [message], components: [google] });
        }
        ;
        if (engine === 'Bing') {
            await interaction.reply({ embeds: [message], components: [bing] });
        }
        ;
        if (engine === 'Yahoo') {
            await interaction.reply({ embeds: [message], components: [yahoo] });
        }
        ;
        if (engine === 'DuckDuckGo') {
            await interaction.reply({ embeds: [message], components: [duck] });
        }
    }
};
//# sourceMappingURL=search.js.map