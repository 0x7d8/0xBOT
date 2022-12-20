"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('leveltop')
.setDMPermission(false)
.setDescription('SEE THE TOP LEVELS')
.setDescriptionLocalizations({
de: 'SEHE DIE TOP LEVEL'
}),
async execute(ctx) {
await ctx.interaction.deferReply();
let embedDesc = '';
let count = 0;
const rawvalues = await ctx.db.query(`select * from stats where name like $1 and type = 'msg' order by value desc;`, ['%' + ctx.interaction.guild.id + '-C']);
for (const element of rawvalues.rows) {
count++;
let formattedcount = count.toString();
const cache = element.name.split('-');
const XP = Math.round(element.value / 5);
let level = 0, levelXP = XP;
while (levelXP >= 500) {
level++;
levelXP -= 500;
}
if (count < 10)
formattedcount = '0' + count;
if (cache[1] !== ctx.interaction.user.id)
embedDesc += `\`${formattedcount}.\` » <@${cache[1]}> (**LVL ${level}, ${XP} XP**)\n`;
else
embedDesc += `**\`${formattedcount}.\`** » <@${cache[1]}> (**LVL ${level}, ${XP} XP**)\n`;
}
;
if (embedDesc === '') {
embedDesc = 'Nothing to Display.';
if (ctx.metadata.language === 'de') {
embedDesc = 'Nichts zum Anzeigen.';
}
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » TOP LEVELS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » TOP LEVEL')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] LEVELTOP`);
return ctx.interaction.editReply({ embeds: [message] }).catch(() => { });
}
};
//# sourceMappingURL=leveltop.js.map