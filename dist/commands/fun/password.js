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
const utils = __importStar(require("rjutils-collection"));
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('password')
        .setDMPermission(false)
        .setDescription('GENERATE A PASSWORD')
        .setDescriptionLocalizations({
        de: 'GENERIERE EIN PASSWORT'
    })
        .addIntegerOption((option) => option.setName('length')
        .setNameLocalizations({
        de: 'länge'
    })
        .setDescription('THE length')
        .setDescriptionLocalizations({
        de: 'DIE LÄNGE'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        const length = bot.getOption(interaction, 'length');
        if (length > 256) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The Maximum Size is **256**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Die Maximale Größe ist **128**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : TOOBIG : ' + length);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (length < 4) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The Minimum Size is **4**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Die Minimale Größe ist **4**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : TOOSMALL : ' + length);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const password = utils.randomStr({
            numbers: true,
            uppercase: true,
            symbols: false,
            length
        });
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:KEY:1024392167130664980> » GENERATE PASSWORD')
            .setDescription('» This is the Password I choose:\n`' + password + '`')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:KEY:1024392167130664980> » PASSWORT GENERIEREN')
                .setDescription('» Das hier ist mein ausgedachtes Passwort:\n`' + password + '`')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : ' + length + ' : SUCCESS');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=password.js.map