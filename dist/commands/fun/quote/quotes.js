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
        .setName('quotes')
        .setDMPermission(false)
        .setDescription('SEE THE QUOTES')
        .setDescriptionLocalizations({
        de: 'SEHE DIE ZITATE'
    })
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Check if Quotes are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'quotes')) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Quotes are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Zitate sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const user = interaction.options.getUser("user");
        // Set User ID
        let quotes;
        if (user == null) {
            quotes = await bot.quotes.get(interaction.user.id);
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : ' + quotes);
        }
        else {
            quotes = await bot.quotes.get(user.id);
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : ' + user + ' : ' + quotes);
        }
        // Check if Plural or not
        let word;
        if (quotes === 1)
            word = 'Quote';
        else
            word = 'Quotes';
        if (lang === 'de') {
            if (quotes === 1)
                word = 'Zitat';
            else
                word = 'Zitate';
        }
        // Create Embed
        let message;
        if (!user) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » YOUR QUOTES')
                .setDescription('» You have **' + quotes + '** ' + word + '!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUOTES:1024406448127623228> » DEINE ZITATE')
                    .setDescription('» Du hast **' + quotes + '** ' + word + '!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » THE QUOTES OF ' + user.username.toUpperCase())
                .setDescription('» <@' + user + '> has **' + quotes + '** ' + word + '!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUOTES:1024406448127623228> » DIE ZITATE VON ' + user.username.toUpperCase())
                    .setDescription('» <@' + user + '> hat **' + quotes + '** ' + word + '!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        // Send Message
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=quotes.js.map