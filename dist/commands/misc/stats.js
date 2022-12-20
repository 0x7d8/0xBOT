"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('stats')
.setDMPermission(false)
.setDescription('SEE STATS')
.setDescriptionLocalizations({
de: 'SEHE STATISTIKEN'
}),
async execute(ctx) {
const totalcmd = await ctx.bot.stat.get('t-all', 'cmd');
const guildcmd = await ctx.bot.stat.get('g-' + ctx.interaction.guild.id, 'cmd');
const usercmd = await ctx.bot.stat.get('u-' + ctx.interaction.user.id, 'cmd');
const totalbtn = await ctx.bot.stat.get('t-all', 'btn');
const guildbtn = await ctx.bot.stat.get('g-' + ctx.interaction.guild.id, 'btn');
const userbtn = await ctx.bot.stat.get('u-' + ctx.interaction.user.id, 'btn');
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » BOT STATISTICS')
.setDescription('**»» COMMAND STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» THIS SERVER\n`' + guildcmd + '`\n\n» YOU IN TOTAL\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» THIS SERVER\n`' + guildbtn + '`\n\n» YOU IN TOTAL\n`' + userbtn + '`')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » BOT STATISTIKEN')
.setDescription('**»» BEFEHL STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» DIESER SERVER\n`' + guildcmd + '`\n\n» DU INSGESAMT\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» DIESER SERVER\n`' + guildbtn + '`\n\n» DU INSGESAMT\n`' + userbtn + '`')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] STATS`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
};
//# sourceMappingURL=stats.js.map