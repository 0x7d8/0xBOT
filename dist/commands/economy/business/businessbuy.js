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
        .setName('businessbuy')
        .setDMPermission(false)
        .setDescription('BUY BUSINESSES')
        .setDescriptionLocalizations({
        de: 'KAUFE GESCHÄFTE'
    })
        .addStringOption((option) => option.setName('business')
        .setNameLocalizations({
        de: 'geschäft'
    })
        .setDescription('THE BUSINESS')
        .setDescriptionLocalizations({
        de: 'DAS GESCHÄFT'
    })
        .setRequired(true)
        .addChoices(
    // Setup Choices
    { name: '🟢 [150000€] SUPERMARKT', value: 'market' }, { name: '🔵 [390000€] PARKHAUS (WIP)', value: 'parking garage' }, { name: '🟡 [520000€] AUTOHAUS', value: 'car dealership' })),
    async execute(interaction, client, lang, vote) {
        // Check if Businesses are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'businesses')) {
            // Create Embed
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
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const business = bot.getOption(interaction, 'business');
        const balance = await bot.money.get(interaction.user.id);
        // Check if User Selected Parking Garage
        if (business === 'parking garage') {
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This Business will be included in **2.5.0**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Dieses Geschäft wird in **2.5.0** hinzugefügt!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : WIP');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Translate to Business ID
        let businessid;
        if (business === 'market')
            businessid = '1';
        if (business === 'parking garage')
            businessid = '2';
        if (business === 'car dealership')
            businessid = '3';
        // Check if Business is Empty
        let businessowner, oldleft;
        if (await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER') !== 0) {
            oldleft = false;
            businessowner = await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER');
            const fetchc = await interaction.guild.members.fetch(businessowner);
            if (typeof fetchc === 'undefined')
                oldleft = true;
            if (!oldleft) {
                // Create Embed
                let message;
                if (interaction.user.id !== businessowner) {
                    message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                        .setDescription('» <@' + businessowner + '> already owns this Business!')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                    if (lang === 'de') {
                        message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                            .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                            .setDescription('» Dieses Geschäft gehört schon <@' + businessowner + '>!')
                            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                    }
                }
                else {
                    message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                        .setDescription('» You already own this Business!')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                    if (lang === 'de') {
                        message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                            .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                            .setDescription('» Dieses Geschäft gehört schon dir!')
                            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                    }
                }
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ALREADYOWNED');
                return interaction.reply({ embeds: [message], ephemeral: true });
            }
        }
        // Check if User already has Business
        if (await bot.businesses.get('u-' + interaction.user.id + '-BUSINESS') !== 0) {
            const userbusiness = await bot.businesses.get('u-' + interaction.user.id + '-BUSINESS');
            // Translate to Business Names
            let name;
            if (userbusiness === 'market')
                name = 'MARKET';
            if (userbusiness === 'parking garage')
                name = 'PARKING GARAGE';
            if (userbusiness === 'car dealership')
                name = 'CAR DEALERSHIP';
            if (lang === 'de') {
                if (userbusiness === 'market')
                    name = 'SUPERMARKT';
                if (userbusiness === 'parking garage')
                    name = 'PARKHAUS';
                if (userbusiness === 'car dealership')
                    name = 'AUTOHAUS';
            }
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You already own a **' + name + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du besitzt schon ein **' + name + '**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ALREADYBUSINESS');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Calculate Cost
        let cost;
        if (business === 'market')
            cost = 150000;
        if (business === 'parking garage')
            cost = 390000;
        if (business === 'car dealership')
            cost = 520000;
        // Translate to Business Names
        let name;
        if (business === 'market') {
            name = 'MARKET';
        }
        if (business === 'parking garage') {
            name = 'PARKING GARAGE';
        }
        if (business === 'car dealership') {
            name = 'CAR DEALERSHIP';
        }
        if (lang === 'de') {
            if (business === 'market') {
                name = 'SUPERMARKT';
            }
            if (business === 'parking garage') {
                name = 'PARKHAUS';
            }
            if (business === 'car dealership') {
                name = 'AUTOHAUS';
            }
        }
        // Check if User has enough Money
        if (balance < cost) {
            const missing = cost - balance;
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Create Buttons
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('YES')
            .setCustomId('BUSINESS-BUY-YES-' + business + '-' + interaction.user.id)
            .setEmoji('1024382935618572299')
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setDisabled(false), new discord_js_1.ButtonBuilder()
            .setLabel('NO')
            .setCustomId('BUSINESS-BUY-NO-' + business + '-' + interaction.user.id)
            .setEmoji('1024382939020152982')
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setDisabled(false));
        if (lang === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('JA')
                .setCustomId('BUSINESS-BUY-YES-' + business + '-' + interaction.user.id)
                .setEmoji('1024382935618572299')
                .setStyle(discord_js_1.ButtonStyle.Success)
                .setDisabled(false), new discord_js_1.ButtonBuilder()
                .setLabel('NEIN')
                .setCustomId('BUSINESS-BUY-NO-' + business + '-' + interaction.user.id)
                .setEmoji('1024382939020152982')
                .setStyle(discord_js_1.ButtonStyle.Danger)
                .setDisabled(false));
        }
        // Delete Old Data as Left User is Confirmed
        bot.businesses.del('g-' + interaction.guild.id + '-' + businessid + '-OWNER');
        bot.businesses.del('u-' + businessowner + '-' + interaction.guild.id + '-BUSINESS');
        // Create Embed
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
            .setDescription('» Do you want to buy a **' + name + '** for **$' + cost + '**?')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
                .setDescription('» Willst du ein **' + name + '** für **' + cost + '€** kaufen?')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ' + name.toUpperCase() + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=businessbuy.js.map