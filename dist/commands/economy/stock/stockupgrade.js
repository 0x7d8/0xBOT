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
var discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('stockupgrade')
.setDMPermission(false)
.setDescription('BUY STOCK SLOTS')
.setDescriptionLocalizations({
de: 'KAUFE AKTIEN SLOTS'
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
.setDescription('THE SLOTS')
.setDescriptionLocalizations({
de: 'DIE SLOTS'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, stock, amount, balance, baseCost, cost, emoji, missing, message_2, row, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'stocks')];
case 1:
if (!(_a.sent())) {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Stocks are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Aktien sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKUPGRADE : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
stock = ctx.getOption('stock');
amount = ctx.getOption('amount');
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 2:
balance = _a.sent();
if (stock === 'green')
baseCost = 15000;
if (stock === 'blue')
baseCost = 20000;
if (stock === 'yellow')
baseCost = 25000;
if (stock === 'red')
baseCost = 30000;
if (stock === 'white')
baseCost = 35000;
if (stock === 'black')
baseCost = 40000;
cost = amount * baseCost;
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
if (balance < cost) {
missing = cost - balance;
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Geld, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKUPGRADE : ".concat(stock.toUpperCase(), " : ").concat(amount, "x : ").concat(cost, "\u20AC : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('STOCKUPGRADE-BUY-YES-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('STOCKUPGRADE-BUY-NO-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('STOCKUPGRADE-BUY-YES-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('STOCKUPGRADE-BUY-NO-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
}
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCK SLOTS')
.setDescription("\u00BB Do you want to buy **".concat(amount, "x** ").concat(emoji, " for **$").concat(cost, "**?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN SLOTS KAUFEN')
.setDescription("\u00BB Willst du **".concat(amount, "x** ").concat(emoji, " f\u00FCr **").concat(cost, "\u20AC** kaufen?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKUPGRADE : ".concat(amount, "x : ").concat(stock.toUpperCase(), " : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message], components: [row] })];
}
});
});
}
};
//# sourceMappingURL=stockupgrade.js.map