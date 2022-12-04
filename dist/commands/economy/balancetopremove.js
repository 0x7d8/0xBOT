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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
// Connect to Database
const _config_1 = __importDefault(require("@config"));
const pg_1 = __importDefault(require("pg"));
const db = new pg_1.default.Pool({
    host: _config_1.default.database.oxbot.host,
    database: _config_1.default.database.oxbot.database,
    user: _config_1.default.database.oxbot.username,
    password: _config_1.default.database.oxbot.password,
    port: 5432,
    ssl: true
});
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('balancetopremove')
        .setDMPermission(false)
        .setDescription('REMOVE SOMEONE FROM BALANCE TOP')
        .setDescriptionLocalizations({
        de: 'ENTFERNE JEMANDEN VON TOP KONTOSTÄNDEN'
    })
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(true))
        .setDefaultMemberPermissions(v10_1.PermissionFlagsBits.Administrator),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const user = interaction.options.getUser("user");
        // Create Embed
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:WALLET:1024387370793050273> » TOP BALANCE REMOVAL')
            .setDescription(`» Successfully removed <@${user.id}> from your Servers Top Balance!\nIf this User interacts with money again he will be on the List again.`)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE ENTFERNUNG')
                .setDescription(`» Erfolgreich <@${user.id}> von der Top Kontostände Liste des Servers entfernt!\nWenn dieser Nutzer wieder mit Geld interagiert, wird er wieder auf der Liste sein.`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        await db.query(`update usermoney set guilds = array_remove(guilds, $1) where userid = $2;`, [interaction.guild.id, user.id]);
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCETOPREMOVE : ' + user.id);
        return interaction.reply({ embeds: [message], ephemeral: true }).catch(() => { });
    }
};
//# sourceMappingURL=balancetopremove.js.map