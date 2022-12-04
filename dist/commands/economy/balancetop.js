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
        .setName('balancetop')
        .setDMPermission(false)
        .setDescription('SEE THE TOP BALANCE')
        .setDescriptionLocalizations({
        de: 'SEHE DEN KONTOSTAND'
    })
        .addStringOption((option) => option.setName('list')
        .setNameLocalizations({
        de: 'liste'
    })
        .setDescription('THE LIST')
        .setDescriptionLocalizations({
        de: 'DIE LISTE'
    })
        .setRequired(true)
        .addChoices({ name: '🌍 GLOBAL', value: 'global' }, { name: '🏘️ SERVER', value: 'server' })),
    async execute(interaction, client, lang, vote) {
        const listtype = bot.getOption(interaction, 'list');
        await interaction.deferReply();
        let embedDesc = '';
        let count = 0;
        if (listtype === 'global') {
            const rawvalues = await db.query(`select * from usermoney order by money DESC`);
            for (const element of rawvalues.rows) {
                if (count >= 10)
                    break;
                let skip = false;
                const userinfo = await bot.userdb.get(element.userid);
                if (!skip) {
                    count++;
                    let formattedcount = count.toString();
                    if (count < 10)
                        formattedcount = '0' + count;
                    if (element.userid !== interaction.user.id)
                        embedDesc += `\`${formattedcount}.\` » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`;
                    else
                        embedDesc += `**\`${formattedcount}.\`** » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`;
                }
            }
        }
        else {
            const rawvalues = await db.query(`select * from usermoney where $1 = any(guilds) order by money DESC limit 10`, [interaction.guild.id]);
            for (const element of rawvalues.rows) {
                count++;
                let formattedcount = count.toString();
                if (count < 10)
                    formattedcount = '0' + count;
                if (element.userid !== interaction.user.id)
                    embedDesc += `\`${formattedcount}.\` » <@${element.userid}> (**${element.money}€**)\n`;
                else
                    embedDesc += `**\`${formattedcount}.\`** » <@${element.userid}> (**${element.money}€**)\n`;
            }
        }
        ;
        if (embedDesc === '') {
            embedDesc = 'Nothing to Display.';
            if (lang === 'de') {
                embedDesc = 'Nichts zum Anzeigen.';
            }
        }
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:WALLET:1024387370793050273> » TOP BALANCES [' + listtype.toUpperCase() + ']')
            .setDescription(embedDesc)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE [' + listtype.toUpperCase() + ']')
                .setDescription(embedDesc)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCETOP : ' + listtype.toString().toUpperCase());
        return interaction.editReply({ embeds: [message] }).catch(() => { });
    }
};
//# sourceMappingURL=balancetop.js.map