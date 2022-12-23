"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
return new (P || (P = Promise))(function (resolve, reject) {
function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
step((generator = generator.apply(thisArg, _arguments || [])).next());
});
};
var __generator = (this && this.__generator) || function (thisArg, body) {
var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
function verb(n) { return function (v) { return step([n, v]); }; }
function step(op) {
if (f) throw new TypeError("Generator is already executing.");
while (g && (g = 0, op[0] && (_ = 0)), _) try {
if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
if (y = 0, t) op = [op[0] & 2, t.value];
switch (op[0]) {
case 0: case 1: t = op; break;
case 4: _.label++; return { value: op[1], done: false };
case 5: _.label++; y = op[1]; op = [0]; continue;
case 7: op = _.ops.pop(); _.trys.pop(); continue;
default:
if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
if (t[2]) _.ops.pop();
_.trys.pop(); continue;
}
op = body.call(thisArg, _);
} catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
}
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'stock-next'
},
execute: function (ctx, stock) {
return __awaiter(this, void 0, void 0, function () {
var emoji, stockEmojis, stockList, message;
return __generator(this, function (_a) {
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
stockEmojis = {
green: '',
blue: '',
yellow: '',
red: '',
white: '',
black: ''
};
stockList = [
'green',
'blue',
'yellow',
'red',
'white',
'black'
];
stockList.forEach(function (stock) {
if (ctx.client.stocks[stock] > ctx.client.stocks['old' + stock])
stockEmojis[stock] = '<:UP:1009502422990860350>';
else if (ctx.client.stocks[stock] < ctx.client.stocks['old' + stock])
stockEmojis[stock] = '<:DOWN:1009502386320056330>';
else
stockEmojis[stock] = '🧐';
});
if (stock !== 'all') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » ' + emoji + ' STOCK INFO')
.setDescription("\u00BB NEXT PRICES\n\t\t\t\t\t<t:".concat(ctx.client.stocks.refresh, ":R>\n\n\t\t\t\t\t\u00BB PRICE\n\t\t\t\t\t**").concat(stockEmojis[stock], " `$").concat(ctx.client.stocks[stock], "` (").concat(ctx.bot.perCalc(ctx.client.stocks[stock], ctx.client.stocks['old' + stock]), "%)\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » ' + emoji + ' AKTIEN INFO')
.setDescription("\u00BB N\u00C4CHSTEN PREISE\n\t\t\t\t\t\t<t:".concat(ctx.client.stocks.refresh, ":R>\n\n\t\t\t\t\t\t\u00BB PREIS\n\t\t\t\t\t\t**").concat(stockEmojis[stock], " `").concat(ctx.client.stocks[stock], "\u20AC` (").concat(ctx.bot.perCalc(ctx.client.stocks[stock], ctx.client.stocks['old' + stock]), "%)\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » FULL STOCK INFO')
.setDescription("\u00BB NEXT PRICES\n\t\t\t\t\t<t:".concat(ctx.client.stocks.refresh, ":R>\n\n\t\t\t\t\t\u00BB \uD83D\uDFE2 GREEN STOCK\n\t\t\t\t\t**").concat(stockEmojis.green, " `$").concat(ctx.client.stocks.green, "` (").concat(ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen), "%)**\n\n\t\t\t\t\t\u00BB \uD83D\uDD35 BLUE STOCK\n\t\t\t\t\t**").concat(stockEmojis.blue, " `$").concat(ctx.client.stocks.blue, "` (").concat(ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue), "%)**\n\n\t\t\t\t\t\u00BB \uD83D\uDFE1 YELLOW STOCK\n\t\t\t\t\t**").concat(stockEmojis.yellow, " `$").concat(ctx.client.stocks.yellow, "` (").concat(ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow), "%)**\n\n\t\t\t\t\t\u00BB \uD83D\uDD34 RED STOCK\n\t\t\t\t\t**").concat(stockEmojis.red, " `$").concat(ctx.client.stocks.red, "` (").concat(ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred), "%)**\n\n\t\t\t\t\t\u00BB \u26AA WHITE STOCK\n\t\t\t\t\t**").concat(stockEmojis.white, " `$").concat(ctx.client.stocks.white, "` (").concat(ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite), "%)**\n\n\t\t\t\t\t\u00BB \u26AB BLACK STOCK\n\t\t\t\t\t**").concat(stockEmojis.black, " `$").concat(ctx.client.stocks.black, "` (").concat(ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack), "%)**\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » VOLLE AKTIEN INFOS')
.setDescription("\u00BB N\u00C4CHSTEN PREISE\n\t\t\t\t\t\t<t:".concat(ctx.client.stocks.refresh, ":R>\n\n\t\t\t\t\t\t\u00BB \uD83D\uDFE2 GR\u00DCNE AKTIE\n\t\t\t\t\t\t**").concat(stockEmojis.green, " `").concat(ctx.client.stocks.green, "\u20AC` (").concat(ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen), "%)**\n\n\t\t\t\t\t\t\u00BB \uD83D\uDD35 BLAUE AKTIE\n\t\t\t\t\t\t**").concat(stockEmojis.blue, " `").concat(ctx.client.stocks.blue, "\u20AC` (").concat(ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue), "%)**\n\n\t\t\t\t\t\t\u00BB \uD83D\uDFE1 GELBE AKTIE\n\t\t\t\t\t\t**").concat(stockEmojis.yellow, " `").concat(ctx.client.stocks.yellow, "\u20AC` (").concat(ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow), "%)**\n\n\t\t\t\t\t\t\u00BB \uD83D\uDD34 ROTE AKTIE\n\t\t\t\t\t\t**").concat(stockEmojis.red, " `").concat(ctx.client.stocks.red, "\u20AC` (").concat(ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred), "%)**\n\n\t\t\t\t\t\t\u00BB \u26AA WEI\u00DFE AKTIE\n\t\t\t\t\t\t**").concat(stockEmojis.white, " `").concat(ctx.client.stocks.white, "\u20AC` (").concat(ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite), "%)**\n\n\t\t\t\t\t\t\u00BB \u26AB SCHWARZE AKTIE\n\t\t\t\t\t\t**").concat(stockEmojis.black, " `").concat(ctx.client.stocks.black, "\u20AC` (").concat(ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack), "%)**\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
if (stock !== 'all')
ctx.log(false, '[CMD] STOCKINFO : ' + stock.toUpperCase() + ' : ' + ctx.client.stocks[stock] + '€');
else
ctx.log(false, '[CMD] STOCKINFO : ALL : ' + ctx.client.stocks.green + '€ : ' + ctx.client.stocks.blue + '€ : ' + ctx.client.stocks.yellow + '€ : ' + ctx.client.stocks.red + '€ : ' + ctx.client.stocks.white + '€ : ' + ctx.client.stocks.black + '€');
return [2, ctx.interaction.update({ embeds: [message] })];
});
});
}
};
//# sourceMappingURL=next.js.map