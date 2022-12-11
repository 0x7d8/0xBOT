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
const v10_1 = require("discord-api-types/v10");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('language')
        .setDescription('CHANGE THE LANGUAGE')
        .setDescriptionLocalizations({
        de: 'ÄNDERE DIE SPRACHE'
    })
        .setDMPermission(false)
        .addStringOption(option => option.setName('language')
        .setNameLocalizations({
        de: 'sprache'
    })
        .setDescription('THE LANGUAGE')
        .setDescriptionLocalizations({
        de: 'DIE SPRACHE'
    })
        .setRequired(true)
        .addChoices({ name: '🇩🇪 DEUTSCH', value: 'de' }, { name: '🇬🇧 ENGLISH', value: 'en' }))
        .setDefaultMemberPermissions(v10_1.PermissionFlagsBits.ManageMessages),
    async execute(interaction, client, bin, vote) {
        const lang = bot.getOption(interaction, 'language');
        let langString;
        if (lang === 'de')
            langString = 'DEUTSCH';
        if (lang === 'en')
            langString = 'ENGLISH';
        bot.language.set(interaction.guild.id, lang);
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('» LANGUAGE')
            .setDescription('» Language successfully set to **' + langString + '**!')
            .setFooter({ text: '» ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('» SPRACHE')
                .setDescription('» Sprache erfolgreich auf **' + langString + '** gesetzt!')
                .setFooter({ text: '» ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LANGUAGE : ' + langString);
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=language.js.map