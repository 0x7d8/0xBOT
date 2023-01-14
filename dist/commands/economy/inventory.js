"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('inventory')
.setDMPermission(false)
.setDescription('SEE YOUR INVENTORY')
.setDescriptionLocalizations({
de: 'SEHE DEIN INVENTAR'
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
let nbombs, mbombs, hbombs, cbombs, carname;
if (!user) {
nbombs = await ctx.bot.items.get(ctx.interaction.user.id + '-NBOMBS-' + ctx.interaction.guild.id, 'amount');
mbombs = await ctx.bot.items.get(ctx.interaction.user.id + '-MBOMBS-' + ctx.interaction.guild.id, 'amount');
hbombs = await ctx.bot.items.get(ctx.interaction.user.id + '-HBOMBS-' + ctx.interaction.guild.id, 'amount');
cbombs = await ctx.bot.items.get(ctx.interaction.user.id + '-CBOMBS-' + ctx.interaction.guild.id, 'amount');
const car = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value');
carname = 'NONE';
if (ctx.metadata.language === 'de')
carname = 'KEINS';
if (car === 'jeep')
carname = '2016 JEEP PATRIOT SPORT';
if (car === 'kia')
carname = '2022 KIA SORENTO';
if (car === 'audi')
carname = 'AUDI R8 COUPE V10';
if (car === 'tesla')
carname = 'TESLA MODEL Y';
if (car === 'porsche')
carname = '2019 PORSCHE 911 GT2RS';
}
else {
nbombs = await ctx.bot.items.get(user.id + '-NBOMBS-' + ctx.interaction.guild.id, 'amount');
mbombs = await ctx.bot.items.get(user.id + '-MBOMBS-' + ctx.interaction.guild.id, 'amount');
hbombs = await ctx.bot.items.get(user.id + '-HBOMBS-' + ctx.interaction.guild.id, 'amount');
cbombs = await ctx.bot.items.get(user.id + '-CBOMBS-' + ctx.interaction.guild.id, 'amount');
const car = await ctx.bot.items.get(user.id + '-CAR-' + ctx.interaction.guild.id, 'value');
carname = 'NONE';
if (ctx.metadata.language === 'de')
carname = 'KEINS';
if (car === 'jeep')
carname = '2016 JEEP PATRIOT SPORT';
if (car === 'kia')
carname = '2022 KIA SORENTO';
if (car === 'audi')
carname = 'AUDI R8 COUPE V10';
if (car === 'tesla')
carname = 'TESLA MODEL Y';
if (car === 'porsche')
carname = '2019 PORSCHE 911 GT2RS';
}
let message;
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » YOUR INVENTORY')
.setDescription(`
» <:NBOMB:1021783222520127508> NORMAL BOMBS
\`\`\`${nbombs}/15\`\`\`
» <:MBOMB:1021783295211601940> MEDIUM BOMBS
\`\`\`${mbombs}/15\`\`\`
» <:HBOMB:1022102357938536458> HYPER BOMBS
\`\`\`${hbombs}/15\`\`\`
» <:CBOMB:1021783405161091162> CRAZY BOMBS
\`\`\`${cbombs}/15\`\`\`
» <:CAR:1021844412998877294> CAR
\`\`\`${carname}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » DEIN INVENTAR')
.setDescription(`
» <:NBOMB:1021783222520127508> NORMALE BOMBEN
\`\`\`${nbombs}/15\`\`\`
» <:MBOMB:1021783295211601940> MEDIUM BOMBEN
\`\`\`${mbombs}/15\`\`\`
» <:HBOMB:1022102357938536458> HYPER BOMBEN
\`\`\`${hbombs}/15\`\`\`
» <:CBOMB:1021783405161091162> CRAZY BOMBEN
\`\`\`${cbombs}/15\`\`\`
» <:CAR:1021844412998877294> AUTO
\`\`\`${carname}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » THE INVENTORY OF ' + user.username.toUpperCase())
.setDescription(`
» <:NBOMB:1021783222520127508> NORMAL BOMBS
\`\`\`${nbombs}/15\`\`\`
» <:MBOMB:1021783295211601940> MEDIUM BOMBS
\`\`\`${mbombs}/15\`\`\`
» <:HBOMB:1022102357938536458> HYPER BOMBS
\`\`\`${hbombs}/15\`\`\`
» <:CBOMB:1021783405161091162> CRAZY BOMBS
\`\`\`${cbombs}/15\`\`\`
» <:CAR:1021844412998877294> CAR
\`\`\`${carname}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » DAS INVENTAR VON ' + user.username.toUpperCase())
.setDescription(`
» <:NBOMB:1021783222520127508> NORMALE BOMBEN
\`\`\`${nbombs}/15\`\`\`
» <:MBOMB:1021783295211601940> MEDIUM BOMBEN
\`\`\`${mbombs}/15\`\`\`
» <:HBOMB:1022102357938536458> HYPER BOMBEN
\`\`\`${hbombs}/15\`\`\`
» <:CBOMB:1021783405161091162> CRAZY BOMBEN
\`\`\`${cbombs}/15\`\`\`
» <:CAR:1021844412998877294> AUTO
\`\`\`${carname}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, `[CMD] INVENTORY`);
return ctx.interaction.reply({ embeds: [message] });
}
};
