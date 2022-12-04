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
        .setName('carprice')
        .setDMPermission(false)
        .setDescription('SET CAR PRICES')
        .setDescriptionLocalizations({
        de: 'SETZE AUTO PREISE'
    })
        .addStringOption((option) => option.setName('car')
        .setNameLocalizations({
        de: 'auto'
    })
        .setDescription('THE CAR')
        .setDescriptionLocalizations({
        de: 'DAS AUTO'
    })
        .setRequired(true)
        .addChoices({ name: '🟢 [5000€-15000€] 2016 JEEP PATRIOT SPORT', value: 'jeep' }, { name: '🔵 [50000€-90000€] 2022 KIA SORENTO', value: 'kia' }, { name: '🟡 [140000€-200000€] AUDI R8 COUPE V10', value: 'audi' }, { name: '🟠 [220000€-260000€] TESLA MODEL Y', value: 'tesla' }, { name: '🔴 [400000€-500000€] 2019 PORSCHE 911 GT2RS', value: 'porsche' }))
        .addIntegerOption(option => option.setName('price')
        .setNameLocalizations({
        de: 'preis'
    })
        .setDescription('THE NEW PRICE [THE FIRST VALUE IS THE PRODUCTION COST]')
        .setDescriptionLocalizations({
        de: 'DER NEUE PREIS [DIE ERSTE ZAHL IST DER PRODUKTIONS PREIS]'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        if (!await bot.settings.get(interaction.guild.id, 'businesses')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Businesses are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const car = bot.getOption(interaction, 'car');
        const newprice = bot.getOption(interaction, 'price');
        if (await bot.businesses.get('g-' + interaction.guild.id + '-3-OWNER') !== interaction.user.id) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont own this Business!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du besitzt dieses Geschäft nicht!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARPRICE : NOTOWNER');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        let doscream = false;
        if (car === 'jeep' && !bot.inRange(newprice, 5000, 15000))
            doscream = true;
        if (car === 'kia' && !bot.inRange(newprice, 50000, 90000))
            doscream = true;
        if (car === 'audi' && !bot.inRange(newprice, 140000, 200000))
            doscream = true;
        if (car === 'tesla' && !bot.inRange(newprice, 220000, 260000))
            doscream = true;
        if (car === 'porsche' && !bot.inRange(newprice, 400000, 500000))
            doscream = true;
        if (doscream) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Please follow the limits seen in the first step!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Bitte folge den Limits zu sehen im ersten Schritt!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARPRICE : NOTLIMIT');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        bot.businesses.set('g-' + interaction.guild.id + '-3-PRICE-' + car.toUpperCase(), newprice.toString());
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:PARTITION:1024399126403747970> » CAR PRICES')
            .setDescription('» Successfully set the price to **$' + newprice + '**.')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:PARTITION:1024399126403747970> » AUTO PREISE')
                .setDescription('» Erfolgreich den Preis auf **' + newprice + '€** gesetzt.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARPRICE : ' + car.toUpperCase() + ' : ' + newprice + '€');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=carprice.js.map