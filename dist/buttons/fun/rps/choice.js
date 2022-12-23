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
var __read = (this && this.__read) || function (o, n) {
var m = typeof Symbol === "function" && o[Symbol.iterator];
if (!m) return o;
var i = m.call(o), r, ar = [], e;
try {
while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
}
catch (error) { e = { error: error }; }
finally {
try {
if (r && !r.done && (m = i["return"])) m.call(i);
}
finally { if (e) throw e.error; }
}
return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'rps-choice'
},
execute: function (ctx, bet, choice) {
return __awaiter(this, void 0, void 0, function () {
var cache, description, _a, sender, reciever, message_1, choiceen, message, choicede, psc, prc, win, winner, rawWinner, betwon, transaction, send, reci;
return __generator(this, function (_b) {
switch (_b.label) {
case 0:
cache = ctx.interaction.message.embeds;
description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
_a = __read(description, 2), sender = _a[0], reciever = _a[1];
if (sender !== ctx.interaction.user.id && reciever !== ctx.interaction.user.id) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You arent playing!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du spielst garnicht mit!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] RPS : NOTPLAYING");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (choice === 'ROCK')
choiceen = '🪨 ROCK';
if (choice === 'PAPER')
choiceen = '📝 PAPER';
if (choice === 'SCISSORS')
choiceen = '✂️ SCISSORS';
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
.setDescription("\u00BB You selected **".concat(choiceen, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
choicede = void 0;
if (choice === 'ROCK')
choicede = '🪨 STEIN';
if (choice === 'PAPER')
choicede = '📝 PAPIER';
if (choice === 'SCISSORS')
choicede = '✂️ SCHERE';
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
.setDescription("\u00BB Du hast **".concat(choicede, "** ausgew\u00E4hlt!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] RPS : ".concat(choice));
ctx.interaction.reply({ embeds: [message], ephemeral: true });
ctx.bot.rps.set('CHOICE-' + ctx.interaction.user.id, choice);
if (!(ctx.bot.rps.has('CHOICE-' + sender) && ctx.bot.rps.has('CHOICE-' + reciever))) return [3, 5];
psc = ctx.bot.rps.get('CHOICE-' + sender);
prc = ctx.bot.rps.get('CHOICE-' + reciever);
win = 'none';
if (psc === 'ROCK' && prc === 'PAPER')
win = 'pr';
if (psc === 'ROCK' && prc === 'SCISSORS')
win = 'ps';
if (psc === 'SCISSORS' && prc === 'ROCK')
win = 'pr';
if (psc === 'SCISSORS' && prc === 'PAPER')
win = 'ps';
if (psc === 'PAPER' && prc === 'ROCK')
win = 'ps';
if (psc === 'PAPER' && prc === 'SCISSORS')
win = 'pr';
winner = '**Noone**', rawWinner = void 0;
if (ctx.metadata.language === 'de')
winner = '**Niemand**';
if (win === 'ps') {
winner = '<@' + sender + '>';
rawWinner = sender;
}
if (win === 'pr') {
winner = '<@' + reciever + '>';
rawWinner = reciever;
}
betwon = bet * 2;
transaction = void 0;
if (!(winner !== '**Noone**' && winner !== '**Niemand**')) return [3, 3];
ctx.bot.money.add(ctx.interaction.guild.id, rawWinner, betwon);
if (!(betwon > 0)) return [3, 2];
return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: (rawWinner === sender ? reciever : sender),
amount: betwon,
type: 'negative'
}, reciever: {
id: rawWinner,
amount: betwon,
type: 'positive'
}
})];
case 1:
transaction = _b.sent();
_b.label = 2;
case 2: return [3, 4];
case 3:
ctx.bot.money.add(ctx.interaction.guild.id, sender, bet);
ctx.bot.money.add(ctx.interaction.guild.id, reciever, bet);
_b.label = 4;
case 4:
send = void 0, reci = void 0;
if (psc === 'SCISSORS')
send = '✂️ SCISSORS';
if (psc === 'PAPER')
send = '📝 PAPER';
if (psc === 'ROCK')
send = '🪨 ROCK';
if (prc === 'ROCK')
reci = '🪨 ROCK';
if (prc === 'PAPER')
reci = '📝 PAPER';
if (prc === 'SCISSORS')
reci = '✂️ SCISSORS';
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(sender, "> selected **").concat(ctx.bot.rps.get('CHOICE-' + sender), "**\n\t\t\t\t\t\u00BB <@").concat(reciever, "> selected **").concat(ctx.bot.rps.get('CHOICE-' + reciever), "**\n\t\t\t\t\t\n\t\t\t\t\t<:AWARD:1024385473524793445> ").concat(winner, " won **$").concat(betwon, "**.").concat((typeof transaction === 'object') ? "\nID: ".concat(transaction.id) : '', "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
if (psc === 'SCISSORS')
send = '✂️ SCHERE';
if (psc === 'PAPER')
send = '📝 PAPIER';
if (psc === 'ROCK')
send = '🪨 STEIN';
if (prc === 'ROCK')
reci = '🪨 STEIN';
if (prc === 'PAPER')
reci = '📝 PAPIER';
if (prc === 'SCISSORS')
reci = '✂️ SCHERE';
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
.setDescription("\n\t\t\t\t\t\t\u00BB <@".concat(sender, "> w\u00E4hlte **").concat(send, "**\n\t\t\t\t\t\t\u00BB <@").concat(reciever, "> w\u00E4hlte **").concat(reci, "**\n\t\t\t\t\t\t\n\t\t\t\t\t\t<:AWARD:1024385473524793445> ").concat(winner, " hat **").concat(betwon, "\u20AC** gewonnen.").concat((typeof transaction === 'object') ? "\nID: ".concat(transaction.id) : '', "\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.bot.rps.delete('CHOICE-' + sender);
ctx.bot.rps.delete('CHOICE-' + reciever);
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[2].setDisabled(true);
ctx.log(false, "[BTN] RPS : DONE");
return [2, ctx.interaction.message.edit({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true })];
case 5: return [2];
}
});
});
}
};
//# sourceMappingURL=choice.js.map