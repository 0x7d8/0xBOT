"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('cooldowns')
.setDescription('VIEW COOLDOWNS')
.setDescriptionLocalizations({
de: 'SCHAUE COOLDOWNS AN'
})
.setDMPermission(false)
.addUserOption((option) => option.setName('user')
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(false)),
async execute(ctx) {
const ms = (await import('pretty-ms')).default;
const user = ctx.interaction.options.getUser("user");
let userobj;
if (!user) {
userobj = ctx.interaction.user;
ctx.log(false, `[CMD] COOLDOWNS`);
}
else {
userobj = user;
ctx.log(false, `[CMD] COOLDOWNS : ${user.id}`);
}
let embedDesc = '';
const rawvalues = await ctx.db.query(`select name, expires from usercooldowns where userid = $1 and expires / 1000 > extract(epoch from now());`, [userobj.id]);
for (const element of rawvalues.rows) {
embedDesc += `» ${element.name.toUpperCase()}\n**${ms((Number(element.expires) - Date.now()), { secondsDecimalDigits: 0 })}**\n`;
}
;
if (embedDesc === '') {
embedDesc = 'Nothing Found.';
if (ctx.metadata.language === 'de') {
embedDesc = 'Nichts Gefunden.';
}
}
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('UPDATE')
.setEmoji('1024382926923776020')
.setCustomId('COOLDOWNS-' + userobj.id + '-' + userobj.username)
.setStyle(discord_js_1.ButtonStyle.Secondary));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('AKTUALISIEREN')
.setEmoji('1024382926923776020')
.setCustomId('COOLDOWNS-' + userobj.id + '-' + userobj.username)
.setStyle(discord_js_1.ButtonStyle.Secondary));
}
let message;
if (!user) {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » YOUR COOLDOWNS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » DEINE COOLDOWNS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » COOLDOWNS OF ' + userobj.username.toUpperCase())
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » COOLDOWNS VON ' + userobj.username.toUpperCase())
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=cooldowns.js.map