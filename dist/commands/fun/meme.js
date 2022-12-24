"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('meme')
.setDMPermission(false)
.setDescription('GET A MEME')
.setDescriptionLocalizations({
de: 'BEKOMME EIN MEME'
}),
async execute(ctx) {
const axios = (await import('axios')).default;
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'meme')) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The **\`/meme\`** Command is disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Der **\`/meme\`** Befehl ist auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEME : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferReply();
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
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('NEW')
.setEmoji('1055826473442873385')
.setCustomId('meme')
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1044959793317691513')
.setLabel(String(upvotes))
.setCustomId('BIN-1')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1054857046916341861')
.setLabel(String(comments))
.setCustomId('BIN-2')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('NEU')
.setEmoji('1055826473442873385')
.setCustomId('meme')
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1044959793317691513')
.setLabel(String(upvotes))
.setCustomId('BIN-1')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1054857046916341861')
.setLabel(String(comments))
.setCustomId('BIN-2')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle(`<:IMAGE:1024405297579696179> » ${res[0].data.children[0].data.title.toUpperCase()}`)
.setDescription(`
» Subreddit
\`\`\`r/${subreddit}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle(`<:IMAGE:1024405297579696179> » ${res[0].data.children[0].data.title.toUpperCase()}`)
.setDescription(`
» Subreddit
\`\`\`r/${subreddit}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEME : ${subreddit.toUpperCase()} : ${upvotes}^ : ${comments}`);
return ctx.interaction.editReply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=meme.js.map