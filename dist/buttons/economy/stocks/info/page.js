"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'stockinfo-page'
},
async execute(ctx, pageNumber, type) {
const ms = (await import('pretty-ms')).default;
if (type === 'back')
pageNumber--;
if (type === 'next')
pageNumber++;
if (pageNumber === 0)
return;
if (pageNumber === 3)
return;
ctx.components.rows[0].components[0].setCustomId(`STOCKINFO-REFRESH-${pageNumber}`);
ctx.components.rows[0].components[1].setCustomId(`STOCKINFO-BACK-${pageNumber}`);
ctx.components.rows[0].components[2].setCustomId(`STOCKINFO-NEXT-${pageNumber}`);
if (!ctx.components.rows[0].components[1].data.disabled && pageNumber <= 1)
ctx.components.rows[0].components[1].setDisabled(true);
else
ctx.components.rows[0].components[1].setDisabled(false);
if (!ctx.components.rows[0].components[2].data.disabled && pageNumber >= 2)
ctx.components.rows[0].components[2].setDisabled(true);
else
ctx.components.rows[0].components[2].setDisabled(false);
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
\`\`\`$${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\``
: pageNumber === 2
? `» ${stockEmojis['red']} Red Stock
\`\`\`$${ctx.client.stocks.red} (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`
» ${stockEmojis['white']} White Stock
\`\`\`$${ctx.client.stocks.white} (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)\`\`\`
» ${stockEmojis['black']} Black Stock
\`\`\`$${ctx.client.stocks.black} (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)\`\`\``
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
  » ${stockEmojis['yellow']}€ Gelbe Aktie
  \`\`\`${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\``
: pageNumber === 2
? `» ${stockEmojis['red']} Rote Aktie
  \`\`\`${ctx.client.stocks.red}€ (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`
  » ${stockEmojis['white']} Weiße Aktie
  \`\`\`${ctx.client.stocks.white}€ (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)\`\`\`
  » ${stockEmojis['black']} Schwarze Aktie
  \`\`\`${ctx.client.stocks.black}€ (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)\`\`\``
: ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber });
}
ctx.log(false, `[BTN] STOCKINFO : ${pageNumber} : ${ctx.client.stocks.green}€ : ${ctx.client.stocks.blue}€ : ${ctx.client.stocks.yellow}€ : ${ctx.client.stocks.red}€ : ${ctx.client.stocks.white}€ : ${ctx.client.stocks.black}€`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
//# sourceMappingURL=page.js.map