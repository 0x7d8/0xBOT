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
        .setName('beg')
        .setDescription('BEG FOR MONEY')
        .setDescriptionLocalizations({
        de: 'BETTEL FÜR GELD'
    })
        .setDMPermission(false)
        .addIntegerOption((option) => option.setName('amount')
        .setNameLocalizations({
        de: 'anzahl'
    })
        .setDescription('THE AMOUNT OF MONEY')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL AN GELD'
    })
        .setRequired(true))
        .addStringOption((option) => option.setName('reason')
        .setNameLocalizations({
        de: 'grund'
    })
        .setDescription('THE REASON')
        .setDescriptionLocalizations({
        de: 'DER GRUND'
    })
        .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const amount = bot.getOption(interaction, 'amount');
        const reason = bot.getOption(interaction, 'reason');
        // Check if Balance is Minus
        if (amount < 0) {
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant ask for negative Money!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst nicht nach negativem Geld fragen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BEG : NEGATIVEMONEY : ' + amount + '€');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check for Max Amount
        if (amount > 10000) {
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('» BEGGING')
                .setDescription('» You cant beg that much! **$10000** is the Maximum.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('» BETTELN')
                    .setDescription('» Du kannst nicht soviel erbetteln! **10000€** ist das Maximum.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BEG : TOOMUCHMONEY : ' + amount + '€');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Reason Type
        let reasontype;
        if (reason === null) {
            reasontype = 'NONE';
        }
        else {
            reasontype = 'SET';
        }
        let reasonres = reason;
        if (reason === null) {
            reasonres = 'NULL';
        }
        // Create Button
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('GIVE ' + interaction.user.username.toUpperCase() + ' $' + amount)
            .setEmoji('1024382935618572299')
            .setCustomId('BEG-' + interaction.user.id + '-' + amount + '-' + reasontype + '-' + reasonres.toString())
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        if (lang === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('GEBE ' + interaction.user.username.toUpperCase() + ' ' + amount + '€')
                .setEmoji('1024382935618572299')
                .setCustomId('BEG-' + interaction.user.id + '-' + amount + '-' + reasontype + '-' + reasonres.toString())
                .setStyle(discord_js_1.ButtonStyle.Secondary));
        }
        // Create Embed
        let message;
        if (!reason) {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
                .setDescription('» <@' + interaction.user.id + '> needs Money!\nTotal Earnings: **$0**')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
                    .setDescription('» <@' + interaction.user.id + '> braucht Geld!\nInsgesamte Einnahmen: **0€**')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
                .setDescription('» <@' + interaction.user.id + '> needs Money!\nTotal Earnings: **$0**\n*"' + reason.toString() + '"*')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
                    .setDescription('» <@' + interaction.user.id + '> braucht Geld!\nInsgesamte Einnahmen: **0€**\n*"' + reason.toString() + '"*')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BEG : ' + amount + '€');
        return interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=beg.js.map