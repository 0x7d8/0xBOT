"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
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
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription('» Stocks are disabled on this Server!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription('» Aktien sind auf diesem Server deaktiviert!')
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
const green = await ctx.bot.stocks.get(userobj.id, 'green', 'used');
const greenMax = await ctx.bot.stocks.get(userobj.id, 'green', 'max');
const blue = await ctx.bot.stocks.get(userobj.id, 'blue', 'used');
const blueMax = await ctx.bot.stocks.get(userobj.id, 'blue', 'max');
const yellow = await ctx.bot.stocks.get(userobj.id, 'yellow', 'used');
const yellowMax = await ctx.bot.stocks.get(userobj.id, 'yellow', 'max');
const red = await ctx.bot.stocks.get(userobj.id, 'red', 'used');
const redMax = await ctx.bot.stocks.get(userobj.id, 'red', 'max');
const white = await ctx.bot.stocks.get(userobj.id, 'white', 'used');
const whiteMax = await ctx.bot.stocks.get(userobj.id, 'white', 'max');
const black = await ctx.bot.stocks.get(userobj.id, 'black', 'used');
const blackMax = await ctx.bot.stocks.get(userobj.id, 'black', 'max');
let message;
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » YOUR STOCKS')
.setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + blueMax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redMax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whiteMax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackMax + '`')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DEINE AKTIEN')
.setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + blueMax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redMax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whiteMax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackMax + '`')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » THE STOCKS OF ' + user.username.toUpperCase())
.setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + blueMax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redMax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whiteMax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackMax + '`')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DIE AKTIEN VON ' + user.username.toUpperCase())
.setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + blueMax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redMax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whiteMax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackMax + '`')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, `[CMD] STOCKS : ${green} : ${blue} : ${yellow} : ${red} : ${white} : ${black}`);
return ctx.interaction.reply({ embeds: [message] });
}
};
//# sourceMappingURL=stocks.js.map