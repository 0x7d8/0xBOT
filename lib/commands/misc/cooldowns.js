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
if (!user)
userobj = ctx.interaction.user;
else
userobj = user;
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
.setEmoji('1055826473442873385')
.setCustomId(`COOLDOWNS-${userobj.id}-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Primary));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('AKTUALISIEREN')
.setEmoji('1055826473442873385')
.setCustomId(`COOLDOWNS-${userobj.id}-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Primary));
}
let message;
if (!user) {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » YOUR ACTIVE COOLDOWNS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » DEINE ATIVEN COOLDOWNS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » ACTIVE COOLDOWNS OF ' + userobj.username.toUpperCase())
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOCK:1054137880345329714> » AKTIVE COOLDOWNS VON ' + userobj.username.toUpperCase())
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, `[CMD] COOLDOWNS :${user ? ` ${user.id} :` : ''} ${rawvalues.rowCount}`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=cooldowns.js.map