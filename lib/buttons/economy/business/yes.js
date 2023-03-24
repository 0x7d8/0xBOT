"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'business-yes'
},
async execute(ctx, business, userid, type) {
const balance = await ctx.bot.money.get(ctx.interaction.user.id);
let businessid;
if (business === 'market')
businessid = '1';
if (business === 'parking garage')
businessid = '2';
if (business === 'car dealership')
businessid = '3';
let cost;
if (business === 'market')
cost = 150000;
if (business === 'parking garage')
cost = 390000;
if (business === 'car dealership')
cost = 520000;
let name;
if (business === 'market')
name = 'MARKET';
if (business === 'parking garage')
name = 'PARKING GARAGE';
if (business === 'car dealership')
name = 'CAR DEALERSHIP';
if (ctx.metadata.language == 'de') {
if (business === 'market')
name = 'SUPERMARKT';
if (business === 'parking garage')
name = 'PARKHAUS';
if (business === 'car dealership')
name = 'AUTOHAUS';
}
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
ctx.log(false, `[BTN] BUSINESSBUY : NOTSENDER`);
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
ctx.log(false, `[BTN] BUSINESSBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (await ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS') !== 0) {
const userbusiness = await ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS');
let name;
if (userbusiness === 'market')
name = 'MARKET';
if (userbusiness === 'parking garage')
name = 'PARKING GARAGE';
if (userbusiness === 'car dealership')
name = 'CAR DEALERSHIP';
if (ctx.metadata.language == 'de') {
if (userbusiness === 'market')
name = 'SUPERMARKT';
if (userbusiness === 'parking garage')
name = 'PARKHAUS';
if (userbusiness === 'car dealership')
name = 'AUTOHAUS';
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You already own a **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du besitzt schon ein **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] BUSINESSBUY : ALREADYBUSINESS`);
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
id: `1x ${business.toUpperCase()}`,
amount: cost,
type: 'positive'
}
});
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER', ctx.interaction.user.id);
ctx.bot.businesses.set('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS', business);
if (business === 'market') {
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-NBOMB', '500');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-MBOMB', '1500');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-HBOMB', '5000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-CBOMB', '15000');
}
if (business === 'car dealership') {
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-JEEP', '10000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-KIA', '75000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-AUDI', '180000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-TESLA', '250000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-PORSCHE', '520000');
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
.setDescription(`» You successfully bought a **${name}** for **\$${cost}**!\n\nID: ${transaction.id}`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
.setDescription(`» Du hast erfolgreich ein **${name}** für **${cost}€** gekauft!\n\nID: ${transaction.id}`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] BUSINESSBUY : ${name} : CONFIRM`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
else if (type === 'sell') {
const business = await ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS');
let businessid;
if (business === 'market')
businessid = '1';
if (business === 'parking garage')
businessid = '2';
if (business === 'car dealership')
businessid = '3';
let cost;
if (business === 'market')
cost = 150000;
if (business === 'parking garage')
cost = 390000;
if (business === 'car dealership')
cost = 520000;
if (await ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS', false) === 0) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You dont own a Business!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du besitzt kein Geschäft!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BUSINESSSELL : DONTOWNBUSINESS`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[1].setStyle(2);
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » SELL BUSINESS')
.setDescription(`» You successfully sold your **${name}** for **\$${cost / 2}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT VERKAUFEN')
.setDescription(`» Du hast erfolgreich dein **${name}** für **${cost / 2}€** verkauft!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, (cost / 2));
ctx.bot.businesses.del('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER');
if (business === 'market') {
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-NBOMB');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-MBOMB');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-HBOMB');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-CBOMB');
}
if (business === 'car dealership') {
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-JEEP');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-KIA');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-AUDI');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-TESLA');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-PORSCHE');
}
ctx.log(false, `[BTN] BUSINESSSELL : ${name} : CONFIRM`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
}
};
//# sourceMappingURL=yes.js.map