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
.setName('guess')
.setDMPermission(false)
.setDescription('GUESS NUMBERS')
.setDescriptionLocalizations({
de: 'RATE ZAHLEN'
})
.addStringOption(function (option) {
return option.setName('range')
.setNameLocalizations({
de: 'bereich'
})
.setDescription('THE RANGE')
.setDescriptionLocalizations({
de: 'DER BEREICH'
})
.setRequired(true)
.addChoices({ name: '🟢 [x2] 1-10', value: '10' }, { name: '🟡 [x4] 1-100', value: '100' }, { name: '🔴 [x6] 1-1000', value: '1000' });
})
.addIntegerOption(function (option) {
return option.setName('bet')
.setNameLocalizations({
de: 'wette'
})
.setDescription('THE BET')
.setDescriptionLocalizations({
de: 'DIE WETTE'
})
.setRequired(true);
})
.addIntegerOption(function (option) {
return option.setName('number')
.setNameLocalizations({
de: 'nummer'
})
.setDescription('THE NUMBER')
.setDescriptionLocalizations({
de: 'DIE NUMMER'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, bet, range, guess, money, random10, random100, random1000, message_2, status, result, message_3, missing, message_4, transaction, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'luckgames')];
case 1:
if (!(_a.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Luck Games are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Gl\u00FCcksspiele sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] GUESS : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
bet = ctx.getOption('bet');
range = ctx.getOption('range');
guess = ctx.getOption('number');
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 2:
money = _a.sent();
random10 = ctx.bot.random(1, 10);
random100 = ctx.bot.random(1, 100);
random1000 = ctx.bot.random(1, 1000);
if (bet < 0) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant play with negative Money!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst keine negativen Eins\u00E4tze spielen!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] GUESS : NEGATIVEMONEY : ".concat(bet, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
if (money >= bet) {
if (bet > 15000) {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant bet that much! **$15000** is the Maximum.")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst nicht soviel Wetten! **15000\u20AC** ist das Maximum.")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] GUESS : TOOMUCHMONEY : ".concat(bet, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
if (range === '10') {
if (guess === random10) {
status = 'WON';
result = bet * 2;
}
else {
status = 'LOST';
result = bet;
}
}
if (range === '100') {
if (guess === random100) {
status = 'WON';
result = bet * 4;
}
else {
status = 'LOST';
result = bet;
}
}
if (range === '1000') {
if (guess === random1000) {
status = 'WON';
result = bet * 6;
}
else {
status = 'LOST';
result = bet;
}
}
if (ctx.metadata.language === 'de') {
if (range === '10') {
if (guess === random10) {
status = 'GEWONNEN';
result = bet * 2;
}
else {
status = 'VERLOREN';
result = bet;
}
}
if (range === '100') {
if (guess === random100) {
status = 'GEWONNEN';
result = bet * 4;
}
else {
status = 'VERLOREN';
result = bet;
}
}
if (range === '1000') {
if (guess === random1000) {
status = 'GEWONNEN';
result = bet * 6;
}
else {
status = 'VERLOREN';
result = bet;
}
}
}
}
else {
missing = bet - money;
message_4 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_4 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Geld, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] GUESS : NOTENOUGHMONEY : ".concat(missing, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_4], ephemeral: true })];
}
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, result);
if (!(status === 'GEWONNEN' || status === 'WON')) return [3, 4];
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, result);
return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: 'CASINO',
amount: bet,
type: 'negative'
}, reciever: {
id: ctx.interaction.user.id,
amount: bet,
type: 'positive'
}
})];
case 3:
transaction = _a.sent();
return [3, 6];
case 4: return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: ctx.interaction.user.id,
amount: bet,
type: 'negative'
}, reciever: {
id: 'CASINO',
amount: bet,
type: 'positive'
}
})];
case 5:
transaction = _a.sent();
_a.label = 6;
case 6:
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOVER:1024388649418235925> » GUESS')
.setDescription("\n\t\t\t\t\u00BB You set **$".concat(bet, "** on **").concat(guess, "** and **").concat(status, "** **$").concat(result, "**!\n\n\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CLOVER:1024388649418235925> » RATEN')
.setDescription("\n\t\t\t\t\t\u00BB Du hast **".concat(bet, "\u20AC** auf **").concat(guess, "** gesetzt und **").concat(result, "\u20AC** **").concat(status, "**!\n\n\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] GUESS : ".concat(guess, " : ").concat(status, " : ").concat(result, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=guess.js.map