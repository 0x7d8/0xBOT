"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'stock-next'
},
async execute(ctx, stock) {
let emoji;
if (stock === 'green')
emoji = '🟢';
if (stock === 'blue')
emoji = '🔵';
if (stock === 'yellow')
emoji = '🟡';
if (stock === 'red')
emoji = '🔴';
if (stock === 'white')
emoji = '⚪';
if (stock === 'black')
emoji = '⚫';
let stockEmojis = {
green: '',
blue: '',
yellow: '',
red: '',
white: '',
black: ''
};
let stockList = [
'green',
'blue',
'yellow',
'red',
'white',
'black'
];
stockList.forEach((stock) => {
if (ctx.client.stocks[stock] > ctx.client.stocks['old' + stock])
stockEmojis[stock] = '<:UP:1009502422990860350>';
else if (ctx.client.stocks[stock] < ctx.client.stocks['old' + stock])
stockEmojis[stock] = '<:DOWN:1009502386320056330>';
else
stockEmojis[stock] = '🧐';
});
let message;
if (stock !== 'all') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » ' + emoji + ' STOCK INFO')
.setDescription(`» NEXT PRICES
<t:${ctx.client.stocks.refresh}:R>

» PRICE
**${stockEmojis[stock]} \`$${ctx.client.stocks[stock]}\` (${ctx.bot.perCalc(ctx.client.stocks[stock], ctx.client.stocks['old' + stock])}%)
`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » ' + emoji + ' AKTIEN INFO')
.setDescription(`» NÄCHSTEN PREISE
<t:${ctx.client.stocks.refresh}:R>

» PREIS
**${stockEmojis[stock]} \`${ctx.client.stocks[stock]}€\` (${ctx.bot.perCalc(ctx.client.stocks[stock], ctx.client.stocks['old' + stock])}%)
`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » FULL STOCK INFO')
.setDescription(`» NEXT PRICES
<t:${ctx.client.stocks.refresh}:R>

» 🟢 GREEN STOCK
**${stockEmojis.green} \`$${ctx.client.stocks.green}\` (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)**

» 🔵 BLUE STOCK
**${stockEmojis.blue} \`$${ctx.client.stocks.blue}\` (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)**

» 🟡 YELLOW STOCK
**${stockEmojis.yellow} \`$${ctx.client.stocks.yellow}\` (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)**

» 🔴 RED STOCK
**${stockEmojis.red} \`$${ctx.client.stocks.red}\` (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)**

» ⚪ WHITE STOCK
**${stockEmojis.white} \`$${ctx.client.stocks.white}\` (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)**

» ⚫ BLACK STOCK
**${stockEmojis.black} \`$${ctx.client.stocks.black}\` (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)**
`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » VOLLE AKTIEN INFOS')
.setDescription(`» NÄCHSTEN PREISE
<t:${ctx.client.stocks.refresh}:R>

» 🟢 GRÜNE AKTIE
**${stockEmojis.green} \`${ctx.client.stocks.green}€\` (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)**

» 🔵 BLAUE AKTIE
**${stockEmojis.blue} \`${ctx.client.stocks.blue}€\` (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)**

» 🟡 GELBE AKTIE
**${stockEmojis.yellow} \`${ctx.client.stocks.yellow}€\` (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)**

» 🔴 ROTE AKTIE
**${stockEmojis.red} \`${ctx.client.stocks.red}€\` (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)**

» ⚪ WEIßE AKTIE
**${stockEmojis.white} \`${ctx.client.stocks.white}€\` (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)**

» ⚫ SCHWARZE AKTIE
**${stockEmojis.black} \`${ctx.client.stocks.black}€\` (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)**
`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
if (stock !== 'all')
ctx.log(false, '[CMD] STOCKINFO : ' + stock.toUpperCase() + ' : ' + ctx.client.stocks[stock] + '€');
else
ctx.log(false, '[CMD] STOCKINFO : ALL : ' + ctx.client.stocks.green + '€ : ' + ctx.client.stocks.blue + '€ : ' + ctx.client.stocks.yellow + '€ : ' + ctx.client.stocks.red + '€ : ' + ctx.client.stocks.white + '€ : ' + ctx.client.stocks.black + '€');
return ctx.interaction.update({ embeds: [message] });
}
};
//# sourceMappingURL=next.js.map