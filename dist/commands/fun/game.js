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
        .setName('game')
        .setDMPermission(false)
        .setDescription('SHOW BROWSERGAMES AND RULES')
        .setDescriptionLocalizations({
        de: 'ZEIGE BROWSERSPIELE UND REGELN'
    })
        .addStringOption((option) => option.setName('game')
        .setNameLocalizations({
        de: 'spiel'
    })
        .setDescription('THE GAME')
        .setDescriptionLocalizations({
        de: 'DAS SPIEL'
    })
        .setRequired(true)
        .addChoices(
    // Setup Choices
    { name: '🗺️ STADT LAND FLUSS', value: 'stadtlandfluss' }, { name: '🤔 SCRIBBL.IO', value: 'scribblio' }, { name: '⭐ GARTIC PHONE', value: 'garticphone' }, { name: '🧠 JKLM', value: 'jklm' })),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const spiel = bot.getOption(interaction, 'game');
        // Create Buttons
        const slfB = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('LOBBY ERSTELLEN')
            .setURL('https://stopots.com/de/')
            .setStyle(discord_js_1.ButtonStyle.Link));
        const sioB = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('LOBBY ERSTELLEN')
            .setURL('https://skribbl.io/')
            .setStyle(discord_js_1.ButtonStyle.Link));
        const gtfB = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('LOBBY ERSTELLEN')
            .setURL('https://garticphone.com/de')
            .setStyle(discord_js_1.ButtonStyle.Link));
        const jklB = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('LOBBY ERSTELLEN')
            .setURL('https://jklm.fun/')
            .setStyle(discord_js_1.ButtonStyle.Link));
        // Create Embeds
        const slf = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » STADT LAND FLUSS REGELN')
            .setDescription('**»» PERSONEN**\n» 100000+ ABONNENTEN\n» DEUTSCHE PERSON\n\n**»» STÄDTE**\n» 5000+ BEWOHNER\n» DEUTSCHE STADTNAMEN\n\n**»» SÄTZE**\n» KONTEXT WICHTIG\n» NUR DEUTSCH')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        const sio = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » SCRIBBL.IO REGELN')
            .setDescription('**»» MALEN**\n» KEINEN TEXT\n\n**»» WÖRTER**\n» WÖRTER DIE JEDER KENNT\n\n**»» CHAT**\n» KEIN SPAMMING')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        const gtf = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » GARTICPHONE REGELN')
            .setDescription('**»» MALEN**\n» KEINEN TEXT\n» MUSS ZUM SATZ PASSEN\n\n**»» SÄTZE**\n» SÄTZE DIE JEDER VERSTEHT')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        const jkl = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » JKLM.FUN REGELN')
            .setDescription('**»» GENERELL**\n» KEINE REGELN')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GAME : ' + spiel.toUpperCase());
        if (spiel == 'stadtlandfluss') {
            await interaction.reply({ embeds: [slf.toJSON()], components: [slfB] });
        }
        ;
        if (spiel == 'scribblio') {
            await interaction.reply({ embeds: [sio.toJSON()], components: [sioB] });
        }
        ;
        if (spiel == 'garticphone') {
            await interaction.reply({ embeds: [gtf.toJSON()], components: [gtfB] });
        }
        ;
        if (spiel == 'jklm') {
            await interaction.reply({ embeds: [jkl.toJSON()], components: [jklB] });
        }
    }
};
//# sourceMappingURL=game.js.map