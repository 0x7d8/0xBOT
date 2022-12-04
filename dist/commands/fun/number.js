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
        .setName('number')
        .setDMPermission(false)
        .setDescription('GENERATE A NUMBER')
        .setDescriptionLocalizations({
        de: 'GENERIERE EINE NUMMER'
    })
        .addIntegerOption((option) => option.setName('min')
        .setDescription('THE MIN AMOUNT')
        .setDescriptionLocalizations({
        de: 'DAS MINIMUM'
    })
        .setRequired(true))
        .addIntegerOption((option) => option.setName('max')
        .setDescription('THE MAX AMOUNT')
        .setDescriptionLocalizations({
        de: 'DAS MAXIMUM'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        const min = bot.getOption(interaction, 'min');
        const max = bot.getOption(interaction, 'max');
        const res = bot.random(min, max);
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GEAR:1024404241701417011> » RANDOM NUMBER')
            .setDescription('» Between **' + min + '** and **' + max + '** I choose **' + res + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GEAR:1024404241701417011> » ZUFÄLLIGE NUMMER')
                .setDescription('» Zwischen **' + min + '** und **' + max + '** wähle ich **' + res + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] NUMBER : ' + min + ' : ' + max + ' : ' + res);
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=number.js.map