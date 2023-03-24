"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('businessbuy')
.setDMPermission(false)
.setDescription('BUY BUSINESSES')
.setDescriptionLocalizations({
de: 'KAUFE GESCHÄFTE'
})
.addStringOption((option) => option.setName('business')
.setNameLocalizations({
de: 'geschäft'
})
.setDescription('THE BUSINESS')
.setDescriptionLocalizations({
de: 'DAS GESCHÄFT'
})
.setRequired(true)
.addChoices({ name: '🟢 [150000€] SUPERMARKT', value: 'market' }, { name: '🔵 [390000€] PARKHAUS (WIP)', value: 'parking garage' }, { name: '🟡 [520000€] AUTOHAUS', value: 'car dealership' })),
async execute(ctx) {
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'businesses')) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» Businesses are disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Geschäfte sind auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BUSINESS : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const business = ctx.getOption('business');
const balance = await ctx.bot.money.get(ctx.interaction.user.id);
if (business === 'parking garage') {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» This Business will be included soon!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Dieses Geschäft wird bald hinzugefügt!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BUSINESSBUY : WIP`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
let businessid;
if (business === 'market')
businessid = '1';
if (business === 'parking garage')
businessid = '2';
if (business === 'car dealership')
businessid = '3';
let businessowner, oldleft;
if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER') !== 0) {
oldleft = false;
businessowner = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER');
const fetchc = await ctx.interaction.guild.members.fetch(businessowner);
if (typeof fetchc === 'undefined')
oldleft = true;
if (!oldleft) {
let message;
if (ctx.interaction.user.id !== businessowner) {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» <@${businessowner}> already owns this Business!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Dieses Geschäft gehört schon <@${businessowner}>!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You already own this Business!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Dieses Geschäft gehört schon dir!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, `[CMD] BUSINESSBUY : ${business.toUpperCase()} : ALREADYOWNED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
}
if (await ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-BUSINESS') !== 0) {
const userbusiness = await ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-BUSINESS');
let name;
if (userbusiness === 'market')
name = 'MARKET';
if (userbusiness === 'parking garage')
name = 'PARKING GARAGE';
if (userbusiness === 'car dealership')
name = 'CAR DEALERSHIP';
if (ctx.metadata.language === 'de') {
if (userbusiness === 'market')
name = 'SUPERMARKT';
if (userbusiness === 'parking garage')
name = 'PARKHAUS';
if (userbusiness === 'car dealership')
name = 'AUTOHAUS';
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You already own a **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du besitzt schon ein **${name}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BUSINESSBUY : ALREADYBUSINESS`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
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
if (ctx.metadata.language === 'de') {
if (business === 'market')
name = 'SUPERMARKT';
if (business === 'parking garage')
name = 'PARKHAUS';
if (business === 'car dealership')
name = 'AUTOHAUS';
}
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
ctx.log(false, `[CMD] BUSINESSBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('BUSINESS-BUY-YES-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('BUSINESS-BUY-NO-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('BUSINESS-BUY-YES-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('BUSINESS-BUY-NO-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
}
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER');
ctx.bot.businesses.del('u-' + businessowner + '-' + ctx.interaction.guild.id + '-BUSINESS');
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
.setDescription(`» Do you want to buy a **${name}** for **$${cost}**?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
.setDescription(`» Willst du ein **${name}** für **${cost}€** kaufen?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] BUSINESSBUY : ${name.toUpperCase()} : ${cost}€`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=businessbuy.js.map