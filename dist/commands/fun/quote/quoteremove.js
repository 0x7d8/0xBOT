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
.setName('quoteremove')
.setDMPermission(false)
.setDescription('REMOVE QUOTES')
.setDescriptionLocalizations({
de: 'ENTFERNE ZITATE'
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
.setRequired(true)
.addChoices({ name: '💰 [01] 1000€', value: 1 }, { name: '💰 [02] 2000€', value: 2 }, { name: '💰 [03] 3000€', value: 3 }, { name: '💰 [04] 4000€', value: 4 }, { name: '💰 [05] 5000€', value: 5 });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, amount, cost, quotes, money, message_2, missing, message_3, word, newquotes, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'quotes')];
case 1:
if (!(_a.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Quotes are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Zitate sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] QUOTEREMOVE : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
amount = ctx.getOption('amount');
cost = amount * 1000;
return [4, ctx.bot.quotes.get(ctx.interaction.user.id)];
case 2:
quotes = _a.sent();
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 3:
money = _a.sent();
if (quotes - amount < 0) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have that many Quotes, you only have **".concat(quotes, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast garnicht so viele Zitate, du hast nur **".concat(quotes, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] QUOTEREMOVE : ".concat(amount, " : NOTENOUGHQUOTES"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
if (money < cost) {
missing = cost - money;
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are Missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + quotes });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast nicht genug Geld daf\u00FCr, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + quotes });
}
ctx.log(false, "[CMD] QUOTEREMOVE : ".concat(amount, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
if (amount === 1)
word = 'Quote';
else
word = 'Quotes';
if (ctx.metadata.language === 'de') {
if (amount == 1)
word = 'Zitat';
else
word = 'Zitate';
}
newquotes = quotes - 1;
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
.setDescription("\u00BB You successfully removed **".concat(amount, "** ").concat(word, " for **$").concat(cost, "**!"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + newquotes });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
.setDescription("\u00BB Du hast erfolgreich **".concat(amount, "** ").concat(word, " f\u00FCr **").concat(cost, "\u20AC** entfernt!"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + newquotes });
}
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
ctx.bot.quotes.rem(ctx.interaction.user.id, amount);
ctx.log(false, "[CMD] QUOTEREMOVE : ".concat(amount, " : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=quoteremove.js.map