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
    data: {
        name: 'item-no'
    },
    async execute(interaction, client, lang, vote, itemid, userid, type, amount) {
        let name;
        if (itemid === 'nbomb')
            name = '<:NBOMB:1021783222520127508> NORMAL BOMB';
        if (itemid === 'mbomb')
            name = '<:MBOMB:1021783295211601940> MEDIUM BOMB';
        if (itemid === 'hbomb')
            name = '<:HBOMB:1022102357938536458> HYPER BOMB';
        if (itemid === 'cbomb')
            name = '<:CBOMB:1021783405161091162> CRAZY BOMB';
        if (lang == 'de') {
            if (itemid === 'nbomb')
                name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
            if (itemid === 'mbomb')
                name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
            if (itemid === 'hbomb')
                name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
            if (itemid === 'cbomb')
                name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
        }
        if (interaction.user.id !== userid) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This choice is up to <@' + userid + '>!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Diese Frage ist für <@' + userid + '>!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : NOTSENDER');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        {
            interaction.message.components[0].components[0].data.disabled = true;
            interaction.message.components[0].components[1].data.disabled = true;
            interaction.message.components[0].components[1].data.style = 2;
        }
        if (type === 'buy') {
            let message;
            if (amount === 1) {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
                    .setDescription('» <@' + interaction.user.id + '> said **NO** to a **' + name + '**.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
                        .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zu einer **' + name + '** gesagt.')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
            }
            else {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
                    .setDescription('» <@' + interaction.user.id + '> said **NO** to **' + amount + 'x** **' + name + '**.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
                        .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zu **' + amount + 'x** **' + name + '** gesagt.')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + amount + 'x : ' + itemid.toUpperCase() + ' : DENY');
            return interaction.update({ embeds: [message], components: interaction.message.components });
        }
        else if (type === 'sell') {
        }
    }
};
//# sourceMappingURL=no.js.map