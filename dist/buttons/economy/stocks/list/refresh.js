"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'stocks-refresh'
},
async execute(ctx, userId, pageNumber, selfCmd) {
ctx.components.rows[0].components[0].setCustomId(`STOCKS-REFRESH-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
ctx.components.rows[0].components[1].setCustomId(`STOCKS-BACK-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
ctx.components.rows[0].components[2].setCustomId(`STOCKS-NEXT-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
const stocks = {
"green": (await ctx.bot.stocks.get(userId, 'green', 'used')),
"greenMax": (await ctx.bot.stocks.get(userId, 'green', 'max')),
"blue": (await ctx.bot.stocks.get(userId, 'blue', 'used')),
"blueMax": (await ctx.bot.stocks.get(userId, 'blue', 'max')),
"yellow": (await ctx.bot.stocks.get(userId, 'yellow', 'used')),
"yellowMax": (await ctx.bot.stocks.get(userId, 'yellow', 'max')),
"red": (await ctx.bot.stocks.get(userId, 'red', 'used')),
"redMax": (await ctx.bot.stocks.get(userId, 'red', 'max')),
"white": (await ctx.bot.stocks.get(userId, 'white', 'used')),
"whiteMax": (await ctx.bot.stocks.get(userId, 'white', 'max')),
"black": (await ctx.bot.stocks.get(userId, 'black', 'used')),
"blackMax": (await ctx.bot.stocks.get(userId, 'black', 'max')),
"brown": (await ctx.bot.stocks.get(userId, 'brown', 'used')),
"brownMax": (await ctx.bot.stocks.get(userId, 'brown', 'max')),
"purple": (await ctx.bot.stocks.get(userId, 'purple', 'used')),
"purpleMax": (await ctx.bot.stocks.get(userId, 'purple', 'max')),
};
let userobj;
if (selfCmd)
userobj = await ctx.client.users.fetch(userId);
let message;
if (!selfCmd) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » YOUR BOUGHT STOCKS')
.setDescription(`
${pageNumber === 1
? `» 🟢 Green Stock
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blue Stock
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Yellow Stock
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Red Stock
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\``
: pageNumber === 2
? `» ⚪ White Stock
\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
» ⚫ Black Stock
\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
» 🟤 Brown Stock
\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
» 🟣 Purple Stock
\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\``
: ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DEINE LISTE VON AKTIEN IM BESITZ')
.setDescription(`
${pageNumber === 1
? `» 🟢 Grüne Aktie
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blaue Aktie
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Gelbe Aktie
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Rote Aktie
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\``
: pageNumber === 2
? `» ⚪ Weiße Aktie
\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
» ⚫ Schwarze Aktie
\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
» 🟤 Braune Aktie
\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
» 🟣 Lila Aktie
\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\``
: ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » THE BOUGHT STOCKS OF ' + userobj.username.toUpperCase())
.setDescription(`
${pageNumber === 1
? `» 🟢 Green Stock
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blue Stock
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Yellow Stock
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Red Stock
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\``
: pageNumber === 2
? `» ⚪ White Stock
\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
» ⚫ Black Stock
\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
» 🟤 Brown Stock
\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
» 🟣 Purple Stock
\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\``
: ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DIE LISTE VON AKTIEN IM BESITZ VON ' + userobj.username.toUpperCase())
.setDescription(`
${pageNumber === 1
? `» 🟢 Grüne Aktie
\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
» 🔵 Blaue Aktie
\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
» 🟡 Gelbe Aktie
\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
» 🔴 Rote Aktie
\`\`\`${stocks.red} / ${stocks.redMax}\`\`\``
: pageNumber === 2
? `» ⚪ Weiße Aktie
\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
» ⚫ Schwarze Aktie
\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
» 🟤 Braune Aktie
\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
» 🟣 Lila Aktie
\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\``
: ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber });
}
}
ctx.log(false, `[BTN] STOCKS : REFRESH :${ctx.interaction.user.id !== userId ? ` ${userId} :` : ''} ${pageNumber} : ${stocks.green} : ${stocks.blue} : ${stocks.yellow} : ${stocks.red} : ${stocks.white} : ${stocks.black} : ${stocks.brown} : ${stocks.purple}`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
//# sourceMappingURL=refresh.js.map