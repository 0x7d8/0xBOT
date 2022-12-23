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
.setName('coinflip')
.setDMPermission(false)
.setDescription('FLIP A COIN')
.setDescriptionLocalizations({
de: 'WIRF EINE MÜNZE'
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
.setRequired(false);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var amount, heads, tails, tries, message_1, message_2, coin, random, message;
return __generator(this, function (_a) {
amount = ctx.getOption('amount');
heads = 0;
tails = 0;
tries = 0;
if (!amount)
amount = 1;
if (amount < 1) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You need to throw atleast **1** Coin!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du musst schon mindestens **1** M\u00FCnze werfen!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] COINFLIP : NOTENOUGHCOINS : ".concat(amount));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (amount > 1000) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant throw more than **1000** Coins!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du darfst nicht mehr als **1000** M\u00FCnzen werfen!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] COINFLIP : TOOMANYCOINS : ".concat(amount));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
while (amount !== tries) {
random = ctx.bot.random(1, 2);
if (random === 1) {
coin = 'HEAD';
heads++;
}
if (random === 2) {
coin = 'TAIL';
tails++;
}
tries++;
}
if (amount === 1) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:COINS:1024392690776944803> » COINFLIP')
.setDescription("\u00BB The Coin Landed on **".concat(coin, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
if (coin === "HEAD")
coin = "KOPF";
if (coin === "TAIL")
coin = "ZAHL";
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:COINS:1024392690776944803> » COINFLIP')
.setDescription("\u00BB Die M\u00FCnze ist auf **".concat(coin, "** gelandet!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:COINS:1024392690776944803> » COINFLIP')
.setDescription("\n\t\t\t\t\t\u00BB HEADS\n\t\t\t\t\t`".concat(heads, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB TAILS\n\t\t\t\t\t`").concat(tails, "`\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:COINS:1024392690776944803> » COINFLIP')
.setDescription("\n\t\t\t\t\t\t\u00BB K\u00D6PFE\n\t\t\t\t\t\t`".concat(heads, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB ZAHLEN\n\t\t\t\t\t\t`").concat(tails, "`\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, "[CMD] COINFLIP : H[".concat(heads, "] : T[").concat(tails, "]"));
return [2, ctx.interaction.reply({ embeds: [message] })];
});
});
}
};
//# sourceMappingURL=coinflip.js.map