"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'car-yes'
},
async execute(ctx, car, userid, type) {
const balance = await ctx.bot.money.get(ctx.interaction.user.id);
let carvalue;
if (car === 'jeep')
carvalue = 25;
if (car === 'kia')
carvalue = 50;
if (car === 'audi')
carvalue = 75;
if (car === 'tesla')
carvalue = 100;
if (car === 'porsche')
carvalue = 200;
let cost, dopay = false;
if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === '0' || await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === 0) {
if (car === 'jeep')
cost = 15000;
if (car === 'kia')
cost = 75000;
if (car === 'audi')
cost = 150000;
if (car === 'tesla')
cost = 240000;
if (car === 'porsche')
cost = 490000;
}
else {
if (type === 'buy') {
cost = Number(await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase()));
dopay = true;
}
else {
if (car === 'jeep')
cost = 15000;
if (car === 'kia')
cost = 75000;
if (car === 'audi')
cost = 150000;
if (car === 'tesla')
cost = 240000;
if (car === 'porsche')
cost = 490000;
}
}
let name;
if (car === 'jeep')
name = '2016 JEEP PATRIOT SPORT';
if (car === 'kia')
name = '2022 KIA SORENTO';
if (car === 'audi')
name = 'AUDI R8 COUPE V10';
if (car === 'tesla')
name = 'TESLA MODEL Y';
if (car === 'porsche')
name = '2019 PORSCHE 911 GT2RS';
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
ctx.log(false, `[BTN] CARBUY : NOTSENDER`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
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
.setDescription(`» Du hast nicht genug Geld dafür, dir fehlen **${missing}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] CARBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount') !== 0) {
const dbcar = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value');
if (dbcar == 'jeep')
name = '2016 JEEP PATRIOT SPORT';
if (dbcar == 'kia')
name = '2022 KIA SORENTO';
if (dbcar == 'audi')
name = 'AUDI R8 COUPE V10';
if (dbcar == 'tesla')
name = 'TESLA MODEL Y';
if (dbcar == 'porsche')
name = '2019 PORSCHE 911 GT2RS';
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You already own a **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du besitzt schon einen **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] CARBUY : ALREADYOWNCAR : ${name}`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[1].setStyle(2);
const transaction = await ctx.bot.transactions.log({
success: true,
sender: {
id: ctx.interaction.user.id,
amount: cost,
type: 'negative'
}, reciever: {
id: `1x ${car.toUpperCase()}`,
amount: cost,
type: 'positive'
}
});
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
.setDescription(`
» You successfully bought a **${name}** for **\$${cost}**!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
.setDescription(`
» Du hast erfolgreich einen **${name}** für **${cost}€** gekauft!

ID: ${transaction.id}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
if (dopay) {
const businessowner = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-OWNER');
if (car === 'jeep') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 5000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 5000);
}
if (car === 'kia') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 50000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 50000);
}
if (car === 'audi') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 150000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 150000);
}
if (car === 'tesla') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 220000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 260000);
}
if (car === 'porsche') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 400000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 500000);
}
}
ctx.bot.items.set(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, car, carvalue);
ctx.log(false, `[BTN] CARBUY : ${name} : CONFIRM`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
else if (type === 'sell') {
if (await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount') === 0) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You dont own a Car!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du besitzt kein Auto!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CARSELL : DONTOWNCAR`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[1].setStyle(2);
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
.setDescription(`» You successfully sold your **${name}** for **\$${cost / 2}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
.setDescription(`» Du hast erfolgreich deinen **${name}** für **${cost / 2}€** verkauft!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, (cost / 2));
ctx.bot.items.del(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id);
ctx.log(false, `[BTN] CARSELL : ${name} : CONFIRM`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
}
};
//# sourceMappingURL=yes.js.map