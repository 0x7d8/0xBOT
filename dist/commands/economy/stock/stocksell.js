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
data: new discord_js_1.SlashCommandBuilder()
.setName('stocksell')
.setDMPermission(false)
.setDescription('SELL STOCKS')
.setDescriptionLocalizations({
de: 'VERKAUFE AKTIEN'
})
.addStringOption(function (option) {
return option.setName('stock')
.setNameLocalizations({
de: 'aktie'
})
.setDescription('THE STOCK')
.setDescriptionLocalizations({
de: 'DIE AKTIE'
})
.setRequired(true)
.addChoices({ name: '🟢 GRÜNE AKTIE', value: 'green' }, { name: '🔵 BLAUE AKTIE', value: 'blue' }, { name: '🟡 GELBE AKTIE', value: 'yellow' }, { name: '🔴 ROTE AKTIE', value: 'red' }, { name: '⚪ WEISSE AKTIE', value: 'white' }, { name: '⚫ SCHWARZE AKTIE', value: 'black' });
})
.addIntegerOption(function (option) {
return option.setName('amount')
.setNameLocalizations({
de: 'anzahl'
})
.setDescription('THE AMOUNT')
.setDescriptionLocalizations({
de: 'DIE ANZAHL'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, stock, amount, message_2, cash, emoji, missing, _a, message_3, transaction, message;
return __generator(this, function (_b) {
switch (_b.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'stocks')];
case 1:
if (!(_b.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Stocks are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Aktien sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKSELL : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
stock = ctx.getOption('stock');
amount = ctx.getOption('amount');
if (amount < 0) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant sell a negative amount of Stocks!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst keine negativen Anzahlen verkaufen!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKSELL : NEGATIVESTOCKS : ".concat(amount, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
cash = amount * ctx.client.stocks[stock];
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
return [4, ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'used')];
case 2:
if (!((_b.sent()) < amount)) return [3, 4];
_a = amount;
return [4, ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'used')];
case 3:
missing = _a - (_b.sent());
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Stocks for that, you are missing **".concat(missing, "** ").concat(emoji, " !"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.interaction.guildLocale) {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Aktien, dir fehlen **".concat(missing, "** ").concat(emoji, " !"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKSELL : ".concat(stock.toUpperCase(), " : ").concat(amount, " : ").concat(cash, "\u20AC : NOTENOUGHSTOCKS"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
case 4: return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: "".concat(amount, " ").concat(stock.toUpperCase(), " STOCK"),
amount: cash,
type: 'negative'
}, reciever: {
id: ctx.interaction.user.id,
amount: cash,
type: 'positive'
}
})];
case 5:
transaction = _b.sent();
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, cash);
ctx.bot.stocks.rem(ctx.interaction.user.id, stock, 'used', amount);
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » SELL STOCKS')
.setDescription("\n\t\t\t\t\u00BB You successfully sold **".concat(amount, "** ").concat(emoji, " for **$").concat(cash, "**! (**$").concat(ctx.client.stocks[stock], "** per Stock)\n\n\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » AKTIEN VERKAUFEN')
.setDescription("\n\t\t\t\t\t\u00BB Du hast erfolgreich **".concat(amount, "** ").concat(emoji, " f\u00FCr **").concat(cash, "\u20AC** verkauft! (**").concat(ctx.client.stocks[stock], "\u20AC** pro Aktie)\n\n\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKSELL : ".concat(stock.toUpperCase(), " : ").concat(amount, " : ").concat(cash, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
});
});
}
};
//# sourceMappingURL=stocksell.js.map