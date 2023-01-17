"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'stock-no'
},
async execute(ctx, stock, userid, type, amount) {
let name;
if (stock === 'green')
name = '🟢 GREEN';
if (stock === 'blue')
name = '🔵 BLUE';
if (stock === 'yellow')
name = '🟡 YELLOW';
if (stock === 'red')
name = '🔴 RED';
if (stock === 'white')
name = '⚪ WHITE';
if (stock === 'black')
name = '⚫ BLACK';
if (stock === 'brown')
name = '🟤 BROWN';
if (stock === 'purple')
name = '🟣 PURPLE';
if (ctx.metadata.language === 'de') {
if (stock === 'green')
name = '🟢 GRÜNE';
if (stock === 'blue')
name = '🔵 BLAUE';
if (stock === 'yellow')
name = '🟡 GELBE';
if (stock === 'red')
name = '🔴 ROTE';
if (stock === 'white')
name = '⚪ WEIßE';
if (stock === 'black')
name = '⚫ SCHWARZE';
if (stock === 'brown')
name = '🟤 BRAUNE';
if (stock === 'purple')
name = '🟣 LILA';
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
ctx.log(false, `[BTN] STOCK : NOTSENDER`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[2].setDisabled(true);
ctx.components.rows[0].components[0].setStyle(2);
ctx.components.rows[0].components[1].setStyle(2);
if (type === 'buy') {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCKS')
.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to **${amount}x** **${name}** Stock.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN KAUFEN')
.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zu **${amount}x** **${name}** Aktie gesagt.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] STOCKBUY : ${stock.toUpperCase()} : DENY`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
else if (type === 'sell') {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL STOCKS')
.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to selling **${amount}x **${name}** Stock.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » AKTIEN VERKAUFEN')
.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zum verkaufen von **${amount}x** **${name}** Aktie gesagt.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] STOCKSELL : ${stock.toUpperCase()} : DENY`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
}
};
//# sourceMappingURL=no.js.map