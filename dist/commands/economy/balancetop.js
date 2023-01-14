"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
async execute(ctx) {
const listtype = ctx.getOption('list');
await ctx.interaction.deferReply();
let embedDesc = '';
let count = 0;
if (listtype === 'global') {
const rawvalues = await ctx.db.query(`select * from usermoney order by money DESC`);
for (const element of rawvalues.rows) {
if (count >= 10)
break;
let skip = false;
const userinfo = await ctx.bot.userdb.get(element.userid);
if (!skip) {
count++;
let formattedcount = count.toString();
if (count < 10)
formattedcount = '0' + count;
if (element.userid !== ctx.interaction.user.id)
embedDesc += `\`${formattedcount}.\` » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`;
else
embedDesc += `**\`${formattedcount}.\`** » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`;
}
}
}
else {
const rawvalues = await ctx.db.query(`select * from usermoney where $1 = any(guilds) order by money DESC limit 10`, [ctx.interaction.guild.id]);
for (const element of rawvalues.rows) {
count++;
let formattedcount = count.toString();
if (count < 10)
formattedcount = '0' + count;
if (element.userid !== ctx.interaction.user.id)
embedDesc += `\`${formattedcount}.\` » <@${element.userid}> (**${element.money}€**)\n`;
else
embedDesc += `**\`${formattedcount}.\`** » <@${element.userid}> (**${element.money}€**)\n`;
}
}
;
if (embedDesc === '') {
embedDesc = 'Nothing to Display.';
if (ctx.metadata.language === 'de') {
embedDesc = 'Nichts zum Anzeigen.';
}
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » TOP BALANCES [' + listtype.toUpperCase() + ']')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE [' + listtype.toUpperCase() + ']')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BALANCETOP : ${listtype.toString().toUpperCase()}`);
return ctx.interaction.editReply({ embeds: [message] }).catch(() => { });
}
};
