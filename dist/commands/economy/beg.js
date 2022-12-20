"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('beg')
.setDescription('BEG FOR MONEY')
.setDescriptionLocalizations({
de: 'BETTEL FÜR GELD'
})
.setDMPermission(false)
.addIntegerOption((option) => option.setName('amount')
.setNameLocalizations({
de: 'anzahl'
})
.setDescription('THE AMOUNT OF MONEY')
.setDescriptionLocalizations({
de: 'DIE ANZAHL AN GELD'
})
.setRequired(true))
.addStringOption((option) => option.setName('reason')
.setNameLocalizations({
de: 'grund'
})
.setDescription('THE REASON')
.setDescriptionLocalizations({
de: 'DER GRUND'
})
.setRequired(false)),
async execute(ctx) {
const amount = ctx.getOption('amount');
const reason = ctx.getOption('reason');
if (amount < 0) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription('» You cant ask for negative Money!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription('» Du kannst nicht nach negativem Geld fragen!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BEG : NEGATIVEMONEY : ${amount}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (amount > 10000) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('» BEGGING')
.setDescription('» You cant beg that much! **$10000** is the Maximum.')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('» BETTELN')
.setDescription('» Du kannst nicht soviel erbetteln! **10000€** ist das Maximum.')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BEG : TOOMUCHMONEY : ${amount}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
let reasontype;
if (!reason)
reasontype = 'NONE';
else {
reasontype = 'SET';
}
let reasonres = reason;
if (!reason)
reasonres = 'NULL';
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('GIVE ' + ctx.interaction.user.username.toUpperCase() + ' $' + amount)
.setEmoji('1024382935618572299')
.setCustomId('BEG-' + ctx.interaction.user.id + '-' + amount + '-' + reasontype + '-' + reasonres.toString())
.setStyle(discord_js_1.ButtonStyle.Secondary));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('GEBE ' + ctx.interaction.user.username.toUpperCase() + ' ' + amount + '€')
.setEmoji('1024382935618572299')
.setCustomId('BEG-' + ctx.interaction.user.id + '-' + amount + '-' + reasontype + '-' + reasonres.toString())
.setStyle(discord_js_1.ButtonStyle.Secondary));
}
let message;
if (!reason) {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription('» <@' + ctx.interaction.user.id + '> needs Money!\nTotal Earnings: **$0**')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription('» <@' + ctx.interaction.user.id + '> braucht Geld!\nInsgesamte Einnahmen: **0€**')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription('» <@' + ctx.interaction.user.id + '> needs Money!\nTotal Earnings: **$0**\n*"' + reason.toString() + '"*')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription('» <@' + ctx.interaction.user.id + '> braucht Geld!\nInsgesamte Einnahmen: **0€**\n*"' + reason.toString() + '"*')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, `[CMD] BEG : ${amount}€`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=beg.js.map