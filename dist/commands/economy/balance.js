"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('balance')
.setDMPermission(false)
.setDescription('SEE THE BALANCE')
.setDescriptionLocalizations({
de: 'SEHE DEN KONTOSTAND'
})
.addUserOption((option) => option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(false)),
async execute(ctx) {
const user = ctx.interaction.options.getUser("user");
let money;
if (!user) {
money = await ctx.bot.money.get(ctx.interaction.user.id);
ctx.log(false, `[CMD] BALANCE : ${money}€`);
}
else {
money = await ctx.bot.money.get(user.id);
ctx.log(false, `[CMD] BALANCE : ${user} : ${money}€`);
}
let message;
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » YOUR BALANCE')
.setDescription(`» Your Balance is **$${money}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » DEIN GELDSTAND')
.setDescription(`» Dein Geldstand beträgt **${money}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » THE BALANCE OF ' + user.username.toUpperCase())
.setDescription(`» The Balance of <@${user.id}> is **$${money}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » DER GELDSTAND VON ' + user.username.toUpperCase())
.setDescription(`» Der Geldstand von <@${user.id}> beträgt **${money}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
return ctx.interaction.reply({ embeds: [message] });
}
};
