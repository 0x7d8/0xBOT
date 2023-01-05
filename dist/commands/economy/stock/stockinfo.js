"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('stockinfo')
.setDMPermission(false)
.setDescription('SEE STOCK PRICES')
.setDescriptionLocalizations({
de: 'SEHE AKTIEN PREISE'
}),
async execute(ctx) {
const ms = (await import('pretty-ms')).default;
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
ctx.log(false, `[CMD] STOCKINFO : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
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
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('UPDATE')
.setCustomId(`STOCKINFO-REFRESH-1`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`STOCKINFO-BACK-1`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`STOCKINFO-NEXT-1`)
.setStyle(discord_js_1.ButtonStyle.Secondary));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('AKTUALISIEREN')
.setCustomId(`STOCKINFO-REFRESH-1`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`STOCKINFO-BACK-1`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`STOCKINFO-NEXT-1`)
.setStyle(discord_js_1.ButtonStyle.Secondary));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » THE CURRENT STOCK PRICES')
.setDescription(`
⏲️ New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

» ${stockEmojis['green']} Green Stock
\`\`\`$${ctx.client.stocks.green} (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
» ${stockEmojis['blue']} Blue Stock
\`\`\`$${ctx.client.stocks.blue} (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
» ${stockEmojis['yellow']} Yellow Stock
\`\`\`$${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
» ${stockEmojis['red']} Red Stock
\`\`\`$${ctx.client.stocks.red} (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE 1' });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DIE AKTUELLSTEN AKTIEN PREISE')
.setDescription(`
⏲️ Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+new Date() / 1000)) * 1000, { secondsDecimalDigits: 0 })}**

» ${stockEmojis['green']} Grüne Aktie
\`\`\`${ctx.client.stocks.green}€ (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
» ${stockEmojis['blue']} Blaue Aktie
\`\`\`${ctx.client.stocks.blue}€ (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
» ${stockEmojis['yellow']} Gelbe Aktie
\`\`\`${ctx.client.stocks.yellow}€ (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
» ${stockEmojis['red']} Rote Aktie
\`\`\`${ctx.client.stocks.red}€ (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE 1' });
}
ctx.log(false, `[CMD] STOCKINFO : 1 : ${ctx.client.stocks.green}€ : ${ctx.client.stocks.blue}€ : ${ctx.client.stocks.yellow}€ : ${ctx.client.stocks.red}€ : ${ctx.client.stocks.white}€ : ${ctx.client.stocks.black}€`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=stockinfo.js.map