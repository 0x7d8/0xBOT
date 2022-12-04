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
        .setName('transactionsearch')
        .setDescription('SEARCH A TRANSACTION')
        .setDescriptionLocalizations({
        de: 'SUCHE EINE TRANSAKTION'
    })
        .setDMPermission(false)
        .addUserOption((option) => option.setName('sender')
        .setDescription('THE SENDER')
        .setDescriptionLocalizations({
        de: 'DER SENDER'
    })
        .setRequired(false))
        .addUserOption((option) => option.setName('reciever')
        .setNameLocalizations({
        de: 'empfänger'
    })
        .setDescription('THE RECIEVER')
        .setDescriptionLocalizations({
        de: 'DER EMPFÄNGER'
    })
        .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const sender = interaction.options.getUser("sender");
        const reciever = interaction.options.getUser("reciever");
        // Get Results
        let embedDesc = '';
        let rawvalues;
        if (sender !== null && reciever !== null) {
            rawvalues = await db.query(`select * from usertransactions where senderid = $1 and recieverid = $2 order by timestamp desc limit 20;`, [
                sender.id,
                reciever.id
            ]);
        }
        else if (sender !== null && reciever === null) {
            rawvalues = await db.query(`select * from usertransactions where senderid = $1 order by timestamp desc limit 20;`, [
                sender.id
            ]);
        }
        else if (sender === null && reciever !== null) {
            rawvalues = await db.query(`select * from usertransactions where recieverid = $1 order by timestamp desc limit 20;`, [
                reciever.id
            ]);
        }
        else {
            rawvalues = await db.query(`select * from usertransactions order by timestamp desc limit 20;`);
        }
        for (const element of rawvalues.rows) {
            if (lang === 'de')
                embedDesc += `» ${(/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid)} | **${element.senderamount}€** -> ${(/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid)}\nID: \`${element.id}\`\n`;
            else
                embedDesc += `» ${(/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid)} | **$${element.senderamount}** -> ${(/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid)}\nID: \`${element.id}\`\n`;
        }
        ;
        if (embedDesc === '') {
            embedDesc = 'Nothing Found.';
            if (lang === 'de') {
                embedDesc = 'Nichts Gefunden.';
            }
        }
        // Create Embeds
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » TRANSACTION SEARCH')
            .setDescription(embedDesc)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS SUCHE')
                .setDescription(embedDesc)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TRANSACTIONSEARCH : ' + (sender === null ? 'EMPTY' : sender.id) + ' : ' + (reciever === null ? 'EMPTY' : reciever.id));
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=transactionsearch.js.map