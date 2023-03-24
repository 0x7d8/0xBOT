"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('stocks')
.setDMPermission(false)
.setDescription('SEE STOCKS')
.setDescriptionLocalizations({
de: 'SEHE AKTIEN'
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
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'stocks')) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» Stocks are disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Aktien sind auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] STOCKS : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const user = ctx.interaction.options.getUser("user");
let userobj;
if (!user)
userobj = ctx.interaction.user;
else
userobj = user;
const stocks = {
"green": (await ctx.bot.stocks.get(userobj.id, 'green', 'used')),
"greenMax": (await ctx.bot.stocks.get(userobj.id, 'green', 'max')),
"blue": (await ctx.bot.stocks.get(userobj.id, 'blue', 'used')),
"blueMax": (await ctx.bot.stocks.get(userobj.id, 'blue', 'max')),
"yellow": (await ctx.bot.stocks.get(userobj.id, 'yellow', 'used')),
"yellowMax": (await ctx.bot.stocks.get(userobj.id, 'yellow', 'max')),
"red": (await ctx.bot.stocks.get(userobj.id, 'red', 'used')),
"redMax": (await ctx.bot.stocks.get(userobj.id, 'red', 'max')),
"white": (await ctx.bot.stocks.get(userobj.id, 'white', 'used')),
"whiteMax": (await ctx.bot.stocks.get(userobj.id, 'white', 'max')),
"black": (await ctx.bot.stocks.get(userobj.id, 'black', 'used')),
"blackMax": (await ctx.bot.stocks.get(userobj.id, 'black', 'max')),
"brown": (await ctx.bot.stocks.get(userobj.id, 'brown', 'used')),
"brownMax": (await ctx.bot.stocks.get(userobj.id, 'brown', 'max')),
"purple": (await ctx.bot.stocks.get(userobj.id, 'purple', 'used')),
"purpleMax": (await ctx.bot.stocks.get(userobj.id, 'purple', 'max')),
};
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('UPDATE')
.setCustomId(`STOCKS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`STOCKS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`STOCKS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('AKTUALISIEREN')
.setCustomId(`STOCKS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`STOCKS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`STOCKS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`)
.setStyle(discord_js_1.ButtonStyle.Secondary));
}
let message;
if (ctx.interaction.user.id === '69') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » YOUR BOUGHT STOCKS')
.setDescription(`
» 🟢 Green Stock
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blue Stock
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Yellow Stock
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Red Stock
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DEINE LISTE VON AKTIEN IM BESITZ')
.setDescription(`
» 🟢 Grüne Aktie
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blaue Aktie
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Gelbe Aktie
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Rote Aktie
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' });
}
}
else {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » THE BOUGHT STOCKS OF ' + userobj.username.toUpperCase())
.setDescription(`
» 🟢 Green Stock
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blue Stock
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Yellow Stock
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Red Stock
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DIE LISTE VON AKTIEN IM BESITZ VON ' + userobj.username.toUpperCase())
.setDescription(`
» 🟢 Grüne Aktie
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blaue Aktie
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Gelbe Aktie
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Rote Aktie
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' });
}
}
ctx.log(false, `[CMD] STOCKS :${!user ? '' : ` ${user.id} :`} ${stocks.green} : ${stocks.blue} : ${stocks.yellow} : ${stocks.red} : ${stocks.white} : ${stocks.black} : ${stocks.brown} : ${stocks.purple}`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=stocks.js.map