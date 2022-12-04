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
        name: 'count'
    },
    async execute(interaction, client, lang, vote, type) {
        const cache = interaction.message.embeds;
        let number = parseInt(cache[0].description.toString().match(/\d+/g));
        if (typeof interaction.message.components[0].components[1] !== 'undefined') {
            if (number === 1) {
                interaction.message.components[0].components[1].data.disabled = true;
                await interaction.message.edit({ components: interaction.message.components });
            }
            else {
                interaction.message.components[0].components[1].data.disabled = false;
                await interaction.message.edit({ components: interaction.message.components });
            }
        }
        if (type === 'plus')
            number++;
        else
            number--;
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:INFINITE:1024406060380979300> » COUNTING')
            .setDescription('» Lets Count! Current Number: **' + number + '**')
            .setFooter({ text: '» ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
                .setDescription('» Komm Zählen! Aktuelle Nummer: **' + number + '**')
                .setFooter({ text: '» ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] COUNT : ' + number);
        return interaction.update({ embeds: [message], components: interaction.message.components });
    }
};
//# sourceMappingURL=count.js.map