"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'stockinfo-refresh'
},
async execute(ctx, pageNumber) {
const ms = (await import('pretty-ms')).default;
ctx.components.rows[0].components[0].setCustomId(`STOCKINFO-REFRESH-${pageNumber}`);
ctx.components.rows[0].components[1].setCustomId(`STOCKINFO-BACK-${pageNumber}`);
ctx.components.rows[0].components[2].setCustomId(`STOCKINFO-NEXT-${pageNumber}`);
let stockEmojis = {
green: '',
blue: '',
yellow: '',
red: '',
white: '',
black: '',
brown: '',
purple: ''
};
let stockList = [
'green',
'blue',
'yellow',
'red',
'white',
'black',
'brown',
'purple'
];
stockList.forEach((stock) => {
if (ctx.client.stocks[stock] > ctx.client.stocks['old' + stock])
stockEmojis[stock] = '<:UP:1009502422990860350>';
else if (ctx.client.stocks[stock] < ctx.client.stocks['old' + stock])
stockEmojis[stock] = '<:DOWN:1009502386320056330>';
else
stockEmojis[stock] = '🧐';
});
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » THE CURRENT STOCK PRICES')
.setDescription(`
⏲️ New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

${pageNumber === 1
? `» ${stockEmojis['green']} Green Stock
\`\`\`$${ctx.client.stocks.green} (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
» ${stockEmojis['blue']} Blue Stock
\`\`\`$${ctx.client.stocks.blue} (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
» ${stockEmojis['yellow']} Yellow Stock
\`\`\`$${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
» ${stockEmojis['red']} Red Stock
\`\`\`$${ctx.client.stocks.red} (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\``
: pageNumber === 2
? `» ${stockEmojis['white']} White Stock
\`\`\`$${ctx.client.stocks.white} (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)\`\`\`
» ${stockEmojis['black']} Black Stock
\`\`\`$${ctx.client.stocks.black} (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)\`\`\`
» ${stockEmojis['brown']} Brown Stock
\`\`\`$${ctx.client.stocks.brown} (${ctx.bot.perCalc(ctx.client.stocks.brown, ctx.client.stocks.oldbrown)}%)\`\`\`
» ${stockEmojis['purple']} Purple Stock
\`\`\`$${ctx.client.stocks.purple} (${ctx.bot.perCalc(ctx.client.stocks.purple, ctx.client.stocks.oldpurple)}%)\`\`\``
: ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DIE AKTUELLSTEN AKTIEN PREISE')
.setDescription(`
⏲️ Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

${pageNumber === 1
? `» ${stockEmojis['green']} Grüne Aktie
  \`\`\`${ctx.client.stocks.green}€ (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
  » ${stockEmojis['blue']} Blaue Aktie
  \`\`\`${ctx.client.stocks.blue}€ (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
  » ${stockEmojis['yellow']} Gelbe Aktie
  \`\`\`${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
» ${stockEmojis['red']} Rote Aktie
  \`\`\`${ctx.client.stocks.red}€ (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\``
: pageNumber === 2
? `» ${stockEmojis['white']} Weiße Aktie
  \`\`\`${ctx.client.stocks.white}€ (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)\`\`\`
  » ${stockEmojis['black']} Schwarze Aktie
  \`\`\`${ctx.client.stocks.black}€ (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)\`\`\`
» ${stockEmojis['brown']} Braune Aktie
  \`\`\`${ctx.client.stocks.brown}€ (${ctx.bot.perCalc(ctx.client.stocks.brown, ctx.client.stocks.oldbrown)}%)\`\`\`
» ${stockEmojis['purple']} Lila Aktie
  \`\`\`${ctx.client.stocks.purple}€ (${ctx.bot.perCalc(ctx.client.stocks.purple, ctx.client.stocks.oldpurple)}%)\`\`\``
: ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber });
}
ctx.log(false, `[BTN] STOCKINFO : REFRESH : ${pageNumber}`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
//# sourceMappingURL=refresh.js.map