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
        .setName('itemprice')
        .setDMPermission(false)
        .setDescription('SET STORE PRICES')
        .setDescriptionLocalizations({
        de: 'SETZE SHOP PREISE'
    })
        .addStringOption((option) => option.setName('item')
        .setNameLocalizations({
        de: 'gegenstand'
    })
        .setDescription('THE ITEM')
        .setDescriptionLocalizations({
        de: 'DER GEGENSTAND'
    })
        .setRequired(true)
        .addChoices({ name: '💣 [250€-1500€] NORMALE BOMBE', value: 'nbomb' }, { name: '💣 [750€-5000€] MEDIUM BOMBE', value: 'mbomb' }, { name: '💣 [2500€-15000€] HYPER BOMBE', value: 'hbomb' }, { name: '💣 [7500€-20000€] CRAZY BOMBE', value: 'cbomb' }))
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
        const itemid = bot.getOption(interaction, 'item');
        const newprice = bot.getOption(interaction, 'price');
        if (await bot.businesses.get('g-' + interaction.guild.id + '-1-OWNER') !== interaction.user.id) {
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : NOTOWNER');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        let doscream = false;
        if (itemid == 'nbomb' && !bot.inRange(newprice, 250, 1500))
            doscream = true;
        if (itemid == 'mbomb' && !bot.inRange(newprice, 750, 5000))
            doscream = true;
        if (itemid == 'hbomb' && !bot.inRange(newprice, 2500, 15000))
            doscream = true;
        if (itemid == 'cbomb' && !bot.inRange(newprice, 7500, 20000))
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : NOTLIMIT');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        bot.businesses.set('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase(), newprice.toString());
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:PARTITION:1024399126403747970> » ITEM PRICES')
            .setDescription('» Successfully set the price to **$' + newprice + '**.')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang == 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:PARTITION:1024399126403747970> » ITEM PREISE')
                .setDescription('» Erfolgreich den Preis auf **' + newprice + '€** gesetzt.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : ' + itemid.toUpperCase() + ' : ' + newprice + '€');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=itemprice.js.map