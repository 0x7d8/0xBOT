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
const cooldown = new discord_js_1.Collection();
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('quote')
        .setDescription('QUOTE SOMETHING')
        .setDescriptionLocalizations({
        de: 'ZITIERE ETWAS'
    })
        .setDMPermission(false)
        .addStringOption((option) => option.setName('quote')
        .setNameLocalizations({
        de: 'zitat'
    })
        .setDescription('THE QUOTE')
        .setDescriptionLocalizations({
        de: 'DAS ZITAT'
    })
        .setRequired(true))
        .addUserOption((option) => option.setName('author')
        .setNameLocalizations({
        de: 'autor'
    })
        .setDescription('THE AUTHOR')
        .setDescriptionLocalizations({
        de: 'DER AUTOR'
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const quote = bot.getOption(interaction, 'quote');
        const author = interaction.options.getUser("author");
        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            // Translate Vars
            const timeLeft = cooldown.get(interaction.user.id) - Date.now();
            const cdown = timeLeft / 1000;
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check if there is a author specified
        let message;
        if (!author || interaction.user.id === author.id) {
            const amount = await bot.quotes.get(interaction.user.id) + 1;
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » A WISE QUOTE')
                .setDescription('» "' + quote + '" ~<@' + interaction.user.id + '>')
                .setFooter({ text: '» ' + client.config.version + ' » QUOTES: ' + amount });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUOTES:1024406448127623228> » EIN WEISES ZITAT')
                    .setDescription('» "' + quote + '" ~<@' + interaction.user.id + '>')
                    .setFooter({ text: '» ' + client.config.version + ' » ZITATE: ' + amount });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ' + quote.toUpperCase());
        }
        else {
            const amount = await bot.quotes.get(author.toString().replace(/\D/g, '')) + 1;
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » A QUOTE')
                .setDescription('» "' + quote + '" ~<@' + author + '>')
                .setFooter({ text: '» ' + client.config.version + ' » QUOTES: ' + amount });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUOTES:1024406448127623228> » EIN quote')
                    .setDescription('» "' + quote + '" ~<@' + author + '>')
                    .setFooter({ text: '» ' + client.config.version + ' » ZITATE: ' + amount });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ' + quote.toUpperCase() + ' : ~' + author);
            bot.quotes.add(author.toString().replace(/\D/g, ''), 1);
        }
        // Set Cooldown
        cooldown.set(interaction.user.id, Date.now() + 45000);
        setTimeout(() => cooldown.delete(interaction.user.id), 45000);
        // Send Message
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=quote.js.map