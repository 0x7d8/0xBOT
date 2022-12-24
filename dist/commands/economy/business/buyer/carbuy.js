"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('carbuy')
.setDMPermission(false)
.setDescription('BUY CARS')
.setDescriptionLocalizations({
de: 'KAUFE AUTOS'
})
.addStringOption((option) => option.setName('car')
.setNameLocalizations({
de: 'auto'
})
.setDescription('THE CAR')
.setDescriptionLocalizations({
de: 'DAS AUTO'
})
.setRequired(true)
.addChoices({ name: '🟢 2016 JEEP PATRIOT SPORT', value: 'jeep' }, { name: '🔵 2022 KIA SORENTO', value: 'kia' }, { name: '🟡 AUDI R8 COUPE V10', value: 'audi' }, { name: '🟠 TESLA MODEL Y', value: 'tesla' }, { name: '🔴 2019 PORSCHE 911 GT2RS', value: 'porsche' })),
async execute(ctx) {
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'cars')) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» Cars are disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Autos sind auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CAR : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const car = ctx.getOption('car');
const balance = await ctx.bot.money.get(ctx.interaction.user.id);
let cost;
if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === '0' || await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === 0) {
if (car === 'jeep')
cost = 15000;
if (car === 'kia')
cost = 75000;
if (car === 'audi')
cost = 160000;
if (car === 'tesla')
cost = 240000;
if (car === 'porsche')
cost = 490000;
}
else {
cost = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase());
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
if (balance < cost) {
const missing = cost - balance;
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You dont have enough Money for that, you are missing **$${missing}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du hast nicht genug Geld dafür, dir fehlen **${missing}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CARBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount') !== 0) {
const dbcar = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value');
if (dbcar === 'jeep')
name = '2016 JEEP PATRIOT SPORT';
if (dbcar === 'kia')
name = '2022 KIA SORENTO';
if (dbcar === 'audi')
name = 'AUDI R8 COUPE V10';
if (dbcar === 'tesla')
name = 'TESLA MODEL Y';
if (dbcar === 'porsche')
name = '2019 PORSCHE 911 GT2RS';
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You already own a **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du besitzt schon einen **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CARBUY : ALREADYOWNCAR : ${name}`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('CAR-BUY-YES-' + car + '-' + ctx.interaction.user.id)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('CAR-BUY-NO-' + car + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('CAR-BUY-YES-' + car + '-' + ctx.interaction.user.id)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('CAR-BUY-NO-' + car + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
.setDescription(`» Do you want to buy a **${name}** for **$${cost}**?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
.setDescription(`» Willst du einen **${name}** für **${cost}€** kaufen?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CARBUY : ${name.toUpperCase()} : ${cost}€`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=carbuy.js.map