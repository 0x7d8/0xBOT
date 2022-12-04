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
        .setName('balance')
        .setDMPermission(false)
        .setDescription('SEE THE BALANCE')
        .setDescriptionLocalizations({
        de: 'SEHE DEN KONTOSTAND'
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
        // Get Money
        let money;
        if (!user) {
            money = await bot.money.get(interaction.user.id);
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCE : ' + money + '€');
        }
        else {
            money = await bot.money.get(user.id);
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCE : ' + user + ' : ' + money + '€');
        }
        // Create Embed
        let message;
        if (!user) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:WALLET:1024387370793050273> » YOUR BALANCE')
                .setDescription('» Your Balance is **$' + money + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:WALLET:1024387370793050273> » DEIN GELDSTAND')
                    .setDescription('» Dein Geldstand beträgt **' + money + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:WALLET:1024387370793050273> » THE BALANCE OF ' + user.username.toUpperCase())
                .setDescription('» The Balance of <@' + user + '> is **$' + money + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:WALLET:1024387370793050273> » DER GELDSTAND VON ' + user.username.toUpperCase())
                    .setDescription('» Der Geldstand von <@' + user + '> beträgt **' + money + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        // Send Message
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=balance.js.map