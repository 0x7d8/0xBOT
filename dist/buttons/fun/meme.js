"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'meme'
},
async execute(ctx, type) {
const axios = (await import('axios')).default;
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'meme')) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The **\`/meme\`** Command is disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Der **\`/meme\`** Befehl ist auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] MEME : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferUpdate();
const random = ctx.bot.random(1, 5);
let subreddit;
if (random === 1)
subreddit = 'memes';
if (random === 2)
subreddit = 'me_irl';
if (random === 3)
subreddit = 'CrappyDesign';
if (random === 4)
subreddit = 'dankmemes';
if (random === 5)
subreddit = 'terriblefacebookmemes';
const req = await axios.get(`https://www.reddit.com/r/${subreddit}/random/.json`);
const res = req.data;
let upvotes = res[0].data.children[0].data.ups;
let comments = res[0].data.children[0].data.num_comments;
if (upvotes === 187)
upvotes += ' 🐊';
if (comments === 187)
comments += ' 🐊';
ctx.components.rows[0].components[1].setLabel(String(upvotes));
ctx.components.rows[0].components[2].setLabel(String(comments));
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » MEME')
.setDescription(`
» Title
\`\`\`${res[0].data.children[0].data.title}\`\`\`
» Subreddit
\`\`\`r/${subreddit}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » MEME')
.setDescription(`
» Titel
\`\`\`${res[0].data.children[0].data.title}\`\`\`
» Subreddit
\`\`\`r/${subreddit}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] MEME : ${subreddit.toUpperCase()} : ${upvotes}^ : ${comments}`);
return ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
