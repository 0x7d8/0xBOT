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
        .setName('inventory')
        .setDMPermission(false)
        .setDescription('SEE YOUR INVENTORY')
        .setDescriptionLocalizations({
        de: 'SEHE DEIN INVENTAR'
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
        // Set Variables
        const user = interaction.options.getUser("user");
        let nbombs, mbombs, hbombs, cbombs, carname;
        if (!user) {
            nbombs = await bot.items.get(interaction.user.id + '-NBOMBS-' + interaction.guild.id, 'amount');
            mbombs = await bot.items.get(interaction.user.id + '-MBOMBS-' + interaction.guild.id, 'amount');
            hbombs = await bot.items.get(interaction.user.id + '-HBOMBS-' + interaction.guild.id, 'amount');
            cbombs = await bot.items.get(interaction.user.id + '-CBOMBS-' + interaction.guild.id, 'amount');
            const car = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value');
            carname = 'NONE';
            if (lang === 'de') {
                carname = 'KEINS';
            }
            if (car === 'jeep')
                carname = '2016 JEEP PATRIOT SPORT';
            if (car === 'kia')
                carname = '2022 KIA SORENTO';
            if (car === 'audi')
                carname = 'AUDI R8 COUPE V10';
            if (car === 'tesla')
                carname = 'TESLA MODEL Y';
            if (car === 'porsche')
                carname = '2019 PORSCHE 911 GT2RS';
        }
        else {
            nbombs = await bot.items.get(user.id + '-NBOMBS-' + interaction.guild.id, 'amount');
            mbombs = await bot.items.get(user.id + '-MBOMBS-' + interaction.guild.id, 'amount');
            hbombs = await bot.items.get(user.id + '-HBOMBS-' + interaction.guild.id, 'amount');
            cbombs = await bot.items.get(user.id + '-CBOMBS-' + interaction.guild.id, 'amount');
            const car = await bot.items.get(user.id + '-CAR-' + interaction.guild.id, 'value');
            carname = 'NONE';
            if (lang === 'de') {
                carname = 'KEINS';
            }
            if (car === 'jeep')
                carname = '2016 JEEP PATRIOT SPORT';
            if (car === 'kia')
                carname = '2022 KIA SORENTO';
            if (car === 'audi')
                carname = 'AUDI R8 COUPE V10';
            if (car === 'tesla')
                carname = 'TESLA MODEL Y';
            if (car === 'porsche')
                carname = '2019 PORSCHE 911 GT2RS';
        }
        // Create Embed
        let message;
        if (!user) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOX:1024394572555624510> » YOUR INVENTORY')
                .setDescription('» <:NBOMB:1021783222520127508> NORMAL BOMBS\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBS\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBS\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBS\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> CAR\n**`' + carname + '`**')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOX:1024394572555624510> » DEIN INVENTAR')
                    .setDescription('» <:NBOMB:1021783222520127508> NORMALE BOMBEN\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBEN\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBEN\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> AUTO\n**`' + carname + '`**')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOX:1024394572555624510> » THE INVENTORY OF ' + user.username.toUpperCase() + '#' + user.discriminator)
                .setDescription('» <:NBOMB:1021783222520127508> NORMAL BOMBS\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBS\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBS\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBS\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> CAR\n**`' + carname + '`**')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOX:1024394572555624510> » DAS INVENTAR VON ' + user.username.toUpperCase() + '#' + user.discriminator)
                    .setDescription('» <:NBOMB:1021783222520127508> NORMALE BOMBEN\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBEN\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBEN\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> AUTO\n**`' + carname + '`**')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] INVENTORY');
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=inventory.js.map