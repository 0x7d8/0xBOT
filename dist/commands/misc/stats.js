"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('stats')
.setDescription('SEE STATS')
.setDescriptionLocalizations({
de: 'SEHE STATISTIKEN'
})
.setDMPermission(false)
.addUserOption((option) => option.setName('user')
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(false)),
async execute(ctx) {
const user = ctx.interaction.options.getUser("user");
let userobj;
if (!user) {
userobj = ctx.interaction.user;
ctx.log(false, `[CMD] STATS : 1`);
}
else {
userobj = user;
ctx.log(false, `[CMD] STATS : ${user.id} : 1`);
}
const totalStats = await ctx.bot.stat.get('t-all', 'cmd');
const guildStats = await ctx.bot.stat.get('g-' + userobj.id, 'cmd');
const userStats = await ctx.bot.stat.get('u-' + userobj.id, 'cmd');
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('UPDATE')
.setCustomId(`STATS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`STATS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`STATS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('AKTUALISIEREN')
.setCustomId(`STATS-REFRESH-${userobj.id}-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`STATS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`STATS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary));
}
let message;
if (!user) {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » YOUR INTERACTION STATISTICS')
.setDescription(`
🤖 Commands

» Globally Executed
\`\`\`${totalStats}\`\`\`
» Guild Executed
\`\`\`${guildStats}\`\`\`
» You Executed
\`\`\`${userStats}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » DEINE INTERAKTIONS STATISTIKEN')
.setDescription(`
🤖 Befehle

» Global Ausgeführt
\`\`\`${totalStats}\`\`\`
» Server Ausgeführt
\`\`\`${guildStats}\`\`\`
» Du Ausgeführt
\`\`\`${userStats}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' });
}
}
else {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » INTERACTION STATISTICS OF ' + userobj.username.toUpperCase())
.setDescription(`
🤖 Commands

» Globally Executed
\`\`\`${totalStats}\`\`\`
» Guild Executed
\`\`\`${guildStats}\`\`\`
» User Executed
\`\`\`${userStats}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » INTERAKTIONS STATISTIKEN VON ' + userobj.username.toUpperCase())
.setDescription(`
🤖 Befehle

» Global Ausgeführt
\`\`\`${totalStats}\`\`\`
» Server Ausgeführt
\`\`\`${guildStats}\`\`\`
» Nutzer Ausgeführt
\`\`\`${userStats}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' });
}
}
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=stats.js.map