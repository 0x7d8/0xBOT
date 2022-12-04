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
        .setName('meme')
        .setDMPermission(false)
        .setDescription('GET A MEME')
        .setDescriptionLocalizations({
        de: 'BEKOMME EIN MEME'
    }),
    async execute(interaction, client, lang, vote) {
        const axios = (await import('axios')).default;
        if (!await bot.settings.get(interaction.guild.id, 'meme')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The **`/meme`** Command is disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Der **`/meme`** Befehl ist auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEME : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const result = bot.random(1, 4);
        let subreddit;
        if (result === 1)
            subreddit = 'memes';
        if (result === 2)
            subreddit = 'me_irl';
        if (result === 3)
            subreddit = 'CrappyDesign';
        if (result === 4)
            subreddit = 'Gittertiere';
        const req = await axios.get(`https://www.reddit.com/r/${subreddit}/random/.json`);
        const random = req.data;
        let upvotes = random[0].data.children[0].data.ups;
        let comments = random[0].data.children[0].data.num_comments;
        if (upvotes === 187)
            upvotes = upvotes + ' 🐊';
        if (comments === 187)
            comments = comments + ' 🐊';
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle(`<:IMAGE:1024405297579696179> » ${random[0].data.children[0].data.title.toUpperCase()}`)
            .setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» COMMENTS:\n`' + comments + '`')
            .setImage(random[0].data.children[0].data.url)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle(`<:IMAGE:1024405297579696179> » ${random[0].data.children[0].data.title.toUpperCase()}`)
                .setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» KOMMENTARE:\n`' + comments + '`')
                .setImage(random[0].data.children[0].data.url)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEME : ' + subreddit.toUpperCase() + ' : ' + upvotes + '^ : ' + comments);
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=meme.js.map