"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'item-yes'
},
async execute(ctx, itemid, userid, type, amount) {
if (ctx.interaction.user.id !== userid) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» This choice is up to <@${userid}>!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Diese Frage ist für <@${userid}>!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] ITEMBUY : NOTSENDER`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const balance = await ctx.bot.money.get(ctx.interaction.user.id);
let cost, dopay = false;
if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === '0' || await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === 0) {
if (itemid === 'nbomb')
cost = 500 * amount;
if (itemid === 'mbomb')
cost = 1000 * amount;
if (itemid === 'hbomb')
cost = 5000 * amount;
if (itemid === 'cbomb')
cost = 15000 * amount;
}
else {
dopay = true;
cost = Number(await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())) * amount;
}
let name;
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMAL BOMB';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMB';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMB';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMB';
if (ctx.metadata.language == 'de') {
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
}
if (type === 'buy') {
if (balance < cost) {
const missing = cost - balance;
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
ctx.log(false, `[BTN] ITEMBUY : ${itemid.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const oldamount = await ctx.bot.items.get(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 'amount');
if ((amount + oldamount) > 15) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You dont have enough Slots for that!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du hast nicht genug Slots dafür!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] ITEMBUY : ${itemid.toUpperCase()} : MAXSLOTS`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
{
ctx.interaction.message.components[0].components[0].data.disabled = true;
ctx.interaction.message.components[0].components[1].data.disabled = true;
ctx.interaction.message.components[0].components[1].data.style = 2;
}
const transaction = await ctx.bot.transactions.log({
success: true,
sender: {
id: ctx.interaction.user.id,
amount: cost,
type: 'negative'
}, reciever: {
id: `${amount}x ${itemid.toUpperCase()}`,
amount: cost,
type: 'positive'
}
});
let message;
if (amount === 1) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
.setDescription(`
» You successfully bought a **${name}** for **\$${cost}**!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
.setDescription(`
» Du hast erfolgreich eine **${name}** für **${cost}€** gekauft!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
.setDescription(`
» You successfully bought **${amount}x** **${name}** for **\$${cost}**!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
.setDescription(`
» Du hast erfolgreich **${amount}x** **${name}** für **${cost}€** gekauft!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
if (dopay) {
const businessowner = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-OWNER');
if (itemid === 'nbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 250);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 250);
}
if (itemid === 'mbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 750);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 750);
}
if (itemid === 'hbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 2500);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 2500);
}
if (itemid === 'cbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 7500);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 7500);
}
}
ctx.bot.items.add(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, amount);
ctx.log(false, `[BTN] ITEMBUY : ${amount}x : ${itemid.toUpperCase()} : CONFIRM`);
return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components });
}
else if (type === 'sell') {
}
}
};
//# sourceMappingURL=yes.js.map