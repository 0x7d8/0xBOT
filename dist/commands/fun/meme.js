"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('meme')
.setDMPermission(false)
.setDescription('GET A MEME')
.setDescriptionLocalizations({
de: 'BEKOMME EIN MEME'
}),
async execute(ctx) {
const axios = (await import('axios')).default;
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'meme')) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription('» The **`/meme`** Command is disabled on this Server!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription('» Der **`/meme`** Befehl ist auf diesem Server deaktiviert!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEME : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferReply();
const result = ctx.bot.random(1, 4);
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
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle(`<:IMAGE:1024405297579696179> » ${random[0].data.children[0].data.title.toUpperCase()}`)
.setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» KOMMENTARE:\n`' + comments + '`')
.setImage(random[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEME : ${subreddit.toUpperCase()} : ${upvotes}^ : ${comments}`);
return ctx.interaction.editReply({ embeds: [message] });
}
};
//# sourceMappingURL=meme.js.map