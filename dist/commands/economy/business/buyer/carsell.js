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
        .setName('carsell')
        .setDMPermission(false)
        .setDescription('SELL YOUR CAR')
        .setDescriptionLocalizations({
        de: 'VERKAUFE DEIN AUTO'
    }),
    async execute(interaction, client, lang, vote) {
        // Check if Cars are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'cars')) {
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Cars are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Autos sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CAR : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const car = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value');
        // Calculate Cost
        let cost;
        if (car === 'jeep')
            cost = 15000;
        if (car === 'kia')
            cost = 75000;
        if (car === 'tesla')
            cost = 240000;
        if (car === 'porsche')
            cost = 490000;
        // Translate to Car Names
        let name;
        if (car === 'jeep')
            name = '2016 JEEP PATRIOT SPORT';
        if (car === 'kia')
            name = '2022 KIA SORENTO';
        if (car === 'tesla')
            name = 'TESLA MODEL Y';
        if (car === 'porsche')
            name = '2019 PORSCHE 911 GT2RS';
        // Check if User has a Car
        if (await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'amount') === 0) {
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont own a Car!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du besitzt kein Auto!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARSELL : DONTOWNCAR');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Create Buttons
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('YES')
            .setCustomId('CAR-SELL-YES-' + car + '-' + interaction.user.id)
            .setEmoji('1024382942153285632')
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setDisabled(false), new discord_js_1.ButtonBuilder()
            .setLabel('NO')
            .setCustomId('CAR-SELL-NO-' + car + '-' + interaction.user.id)
            .setEmoji('1024382939020152982')
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setDisabled(false));
        if (lang === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('JA')
                .setCustomId('CAR-SELL-YES-' + car + '-' + interaction.user.id)
                .setEmoji('1024382942153285632')
                .setStyle(discord_js_1.ButtonStyle.Success)
                .setDisabled(false), new discord_js_1.ButtonBuilder()
                .setLabel('NEIN')
                .setCustomId('CAR-SELL-NO-' + car + '-' + interaction.user.id)
                .setEmoji('1024382939020152982')
                .setStyle(discord_js_1.ButtonStyle.Danger)
                .setDisabled(false));
        }
        // Create Embed
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
            .setDescription('» Do you want to sell your **' + name + '** for **$' + (cost / 2) + '**?')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
                .setDescription('» Willst du deinen **' + name + '** für **' + (cost / 2) + '€** verkaufen?')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARSELL : ' + name + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=carsell.js.map