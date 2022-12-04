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
        .setName('businesssell')
        .setDMPermission(false)
        .setDescription('SELL YOUR BUSINESS')
        .setDescriptionLocalizations({
        de: 'VERKAUFE DEIN GESCHÄFT'
    }),
    async execute(interaction, client, lang, vote) {
        if (!await bot.settings.get(interaction.guild.id, 'businesses')) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Businesses are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const business = await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS');
        let cost;
        if (business === 'market')
            cost = 150000;
        if (business === 'parking garage')
            cost = 390000;
        if (business === 'car dealership')
            cost = 520000;
        let name;
        if (business === 'market')
            name = 'MARKET';
        if (business === 'parking garage')
            name = 'PARKING GARAGE';
        if (business === 'car dealership')
            name = 'CAR DEALERSHIP';
        if (lang === 'de') {
            if (business === 'market')
                name = 'SUPERMARKT';
            if (business === 'parking garage')
                name = 'PARKHAUS';
            if (business === 'car dealership')
                name = 'AUTOHAUS';
        }
        if (await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS') === 0) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont own a Business!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du besitzt kein Geschäft!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSSELL : DONTOWNBUSINESS');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('YES')
            .setCustomId('BUSINESS-SELL-YES-' + business + '-' + interaction.user.id)
            .setEmoji('1024382942153285632')
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setDisabled(false), new discord_js_1.ButtonBuilder()
            .setLabel('NO')
            .setCustomId('BUSINESS-SELL-NO-' + business + '-' + interaction.user.id)
            .setEmoji('1024382939020152982')
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setDisabled(false));
        if (lang === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('JA')
                .setCustomId('BUSINESS-SELL-YES-' + business + '-' + interaction.user.id)
                .setEmoji('1024382942153285632')
                .setStyle(discord_js_1.ButtonStyle.Success)
                .setDisabled(false), new discord_js_1.ButtonBuilder()
                .setLabel('NEIN')
                .setCustomId('BUSINESS-SELL-NO-' + business + '-' + interaction.user.id)
                .setEmoji('1024382939020152982')
                .setStyle(discord_js_1.ButtonStyle.Danger)
                .setDisabled(false));
        }
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BOXDOLLAR:1024402261784403999> » SELL BUSINESS')
            .setDescription('» Do you want to sell your **' + name + '** for **$' + (cost / 2) + '**?')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXDOLLAR:1024402261784403999> » GESCHÄFT VERKAUFEN')
                .setDescription('» Willst du dein **' + name + '** für **' + (cost / 2) + '€** verkaufen?')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSSELL : ' + name + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=businesssell.js.map