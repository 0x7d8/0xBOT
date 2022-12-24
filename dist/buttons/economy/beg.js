"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'beg'
},
async execute(ctx, reciever, amount, reasontype, reason) {
const balance = await ctx.bot.money.get(ctx.interaction.user.id);
const args = ctx.interaction.message.embeds[0].description.split('**');
const total = Number(args[1].match(/\d+/g)) + amount;
if (balance < amount) {
const missing = amount - balance;
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You dont have enough Money for that, you are missing **\$${missing}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du hast dafür nicht genug Geld, dir fehlen **${missing}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] BEG : ${reciever} : ${amount}€ : NOTENOUGHMONEY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (ctx.interaction.user.id == reciever) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You cant give yourself Money?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du kannst dir selber kein Geld geben?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] BEG : ${reciever} : ${amount}€ : SAMEPERSON`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const transaction = await ctx.bot.transactions.log({
success: true,
sender: {
id: ctx.interaction.user.id,
amount: amount,
type: 'negative'
}, reciever: {
id: reciever,
amount: amount,
type: 'positive'
}
});
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
ctx.bot.money.add(ctx.interaction.guild.id, reciever, amount);
let message;
if (reasontype !== 'SET') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription(`
» <@${reciever}> needs Money!
Total Earnings: **\$${total}**
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription(`
» <@${reciever}> braucht Geld!
Insgesamte Einnahmen: **${total}€**
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription(`
» <@${reciever}> needs Money!
Total Earnings: **\$${total}**
*"${reason}"*
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription(`
» <@${reciever}> braucht Geld!
Insgesamte Einnahmen: **${total}€**
*"${reason}"*
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
;
let rmessage = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription(`
» <@${ctx.interaction.user.id}> gave <@${reciever}> **\$${amount}**!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
rmessage = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription(`
» <@${ctx.interaction.user.id}> hat <@${reciever}> **${amount}€** gegeben!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] BEG : ${reciever} : ${amount}€`);
await ctx.interaction.reply({ embeds: [rmessage] });
return ctx.interaction.message.edit({ embeds: [message] }).catch(() => { });
}
};
//# sourceMappingURL=beg.js.map