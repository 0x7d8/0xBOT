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
var promises_1 = require("timers/promises");
var rowGet = function (button) {
var row, btn;
if (button < 21) {
row = 3;
btn = button - 15;
}
if (button < 16) {
row = 2;
btn = button - 10;
}
if (button < 11) {
row = 1;
btn = button - 5;
}
if (button < 6) {
row = 0;
btn = button;
}
var output = [];
if (btn > 0)
output[0] = (btn - 1);
else
output[0] = btn;
output[1] = row;
return output;
};
exports.default = {
data: {
name: 'memory-choice'
},
execute: function (ctx, bet, sel) {
return __awaiter(this, void 0, void 0, function () {
var cache, description, _a, sender, reciever, message_1, message_2, turnemoji, doflush, comp, comp1, comp2, comp1, comp2, i, row, message, i, row, senderpoints, recieverpoints, winner, rawWinner, betwon, transaction;
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
ctx.log(false, "[BTN] MEMORY : NOTPLAYING");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (ctx.interaction.user.id !== ctx.bot.memory.get('TURN-' + sender)) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Its not your turn!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Es ist nicht dein Zug!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] MEMORY : NOTTURN");
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
return [4, ctx.interaction.deferUpdate()];
case 1:
_b.sent();
if (ctx.bot.memory.get('TURN-' + sender) === sender)
turnemoji = '🔵';
if (ctx.bot.memory.get('TURN-' + sender) === reciever)
turnemoji = '🔴';
doflush = false;
ctx.bot.memory.set('D_EMOJI-' + sel + '-' + sender, { id: ctx.bot.memory.get('I_EMOJI-' + sel + '-' + sender), name: 'MEMORY' });
ctx.bot.memory.set('DISABLED-' + sel + '-' + sender, true);
comp = rowGet(sel);
ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
ctx.components.rows[comp[1]].components[comp[0]].setEmoji(ctx.bot.memory.get('D_EMOJI-' + sel + '-' + sender));
ctx.bot.memory.get('C_PLAYERSELECT-' + ctx.interaction.user.id).push(ctx.bot.memory.get('I_EMOJI-' + sel + '-' + sender));
ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id).push(sel);
ctx.bot.memory.set('A_PLAYERSELECT-' + ctx.interaction.user.id, (Number(ctx.bot.memory.get('A_PLAYERSELECT-' + ctx.interaction.user.id)) + 1));
if (ctx.bot.memory.get('A_PLAYERSELECT-' + ctx.interaction.user.id) === 2) {
if (ctx.bot.memory.get('C_PLAYERSELECT-' + ctx.interaction.user.id)[0] === ctx.bot.memory.get('C_PLAYERSELECT-' + ctx.interaction.user.id)[1]) {
ctx.bot.memory.set('POINTS-' + ctx.interaction.user.id, (Number(ctx.bot.memory.get('POINTS-' + ctx.interaction.user.id)) + 1));
comp1 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0]);
comp2 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1]);
if (ctx.interaction.user.id === sender) {
ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, 1);
ctx.components.rows[comp[1]].components[comp[0]].setStyle(1);
ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, 1);
ctx.components.rows[comp2[1]].components[comp2[0]].setStyle(1);
}
;
if (ctx.interaction.user.id === reciever) {
ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, 4);
ctx.components.rows[comp1[1]].components[comp1[0]].setStyle(4);
ctx.bot.memory.set('STYLE-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, 4);
ctx.components.rows[comp2[1]].components[comp2[0]].setStyle(4);
}
ctx.bot.memory.set('A_PLAYERSELECT-' + ctx.interaction.user.id, 0);
ctx.bot.memory.set('B_PLAYERSELECT-' + ctx.interaction.user.id, []);
ctx.bot.memory.set('C_PLAYERSELECT-' + ctx.interaction.user.id, []);
}
else {
comp1 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0]);
comp2 = rowGet(ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1]);
ctx.components.rows[comp1[1]].components[comp1[0]].setDisabled(false);
ctx.components.rows[comp1[1]].components[comp1[0]].setEmoji('1020411843644243998');
ctx.components.rows[comp2[1]].components[comp2[0]].setDisabled(false);
ctx.components.rows[comp2[1]].components[comp2[0]].setEmoji('1020411843644243998');
ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, false);
ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, false);
if (ctx.bot.memory.get('TURN-' + sender) === sender) {
ctx.bot.memory.set('TURN-' + sender, reciever);
turnemoji = '🔴';
}
else {
ctx.bot.memory.set('TURN-' + sender, sender);
turnemoji = '🔵';
}
}
doflush = true;
}
if (doflush) {
for (i = 0; i < 20; i++) {
row = Math.floor(i / 5);
ctx.components.rows[row].components[i % 5].setLabel(null);
ctx.components.rows[row].components[i % 5].setDisabled(true);
ctx.components.rows[row].components[i % 5].setEmoji(ctx.bot.memory.get('D_EMOJI-' + (i + 1) + '-' + sender));
ctx.components.rows[row].components[i % 5].setStyle(ctx.bot.memory.get('STYLE-' + (i + 1) + '-' + sender));
}
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription("\n\t\t\t\t\u00BB <@".concat(sender, "> is playing Memory with <@").concat(reciever, ">!\n\t\t\t\tThe Bet is **$").concat(bet, "**\n\t\t\t\t\n\t\t\t\t\uD83D\uDD35 \u00BB Points of <@").concat(sender, "> are **").concat(ctx.bot.memory.get('POINTS-' + sender), "**\n\t\t\t\t\uD83D\uDD34 \u00BB Points of <@").concat(reciever, "> are **").concat(ctx.bot.memory.get('POINTS-' + reciever), "**\n\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version + ' » CURRENT TURN: ' + turnemoji });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(sender, "> spielt mit <@").concat(reciever, "> Memory!\n\t\t\t\t\tDie Wette ist **").concat(bet, "\u20AC**\n\t\t\t\t\t\n\t\t\t\t\t\uD83D\uDD35 \u00BB Punkte von <@").concat(sender, "> sind **").concat(ctx.bot.memory.get('POINTS-' + sender), "**\n\t\t\t\t\t\uD83D\uDD34 \u00BB Punkte von <@").concat(reciever, "> sind **").concat(ctx.bot.memory.get('POINTS-' + reciever), "**\n\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version + ' » AM ZUG: ' + turnemoji });
}
ctx.log(false, "[BTN] MEMORY : ".concat(sel, " : ").concat(ctx.bot.memory.get('I_EMOJI-' + sel + '-' + sender)));
ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true });
if (!doflush)
return [2];
return [4, (0, promises_1.setTimeout)(2000)];
case 2:
_b.sent();
ctx.bot.memory.set('D_EMOJI-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' });
ctx.bot.memory.set('D_EMOJI-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' });
ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[0] + '-' + sender, false);
ctx.bot.memory.set('DISABLED-' + ctx.bot.memory.get('B_PLAYERSELECT-' + ctx.interaction.user.id)[1] + '-' + sender, false);
ctx.bot.memory.set('A_PLAYERSELECT-' + ctx.interaction.user.id, 0);
ctx.bot.memory.set('B_PLAYERSELECT-' + ctx.interaction.user.id, []);
ctx.bot.memory.set('C_PLAYERSELECT-' + ctx.interaction.user.id, []);
for (i = 0; i < 20; i++) {
row = Math.floor(i / 5);
ctx.components.rows[row].components[i % 5].setLabel(null);
ctx.components.rows[row].components[i % 5].setDisabled(true);
ctx.components.rows[row].components[i % 5].setEmoji(ctx.bot.memory.get('D_EMOJI-' + (i + 1) + '-' + sender));
ctx.components.rows[row].components[i % 5].setStyle(ctx.bot.memory.get('STYLE-' + (i + 1) + '-' + sender));
}
if (!((ctx.bot.memory.get('POINTS-' + sender) + ctx.bot.memory.get('POINTS-' + reciever)) == 10)) return [3, 7];
senderpoints = ctx.bot.memory.get('POINTS-' + sender);
recieverpoints = ctx.bot.memory.get('POINTS-' + reciever);
winner = '**Noone**', rawWinner = void 0;
if (ctx.metadata.language === 'de')
winner = '**Niemand**';
if (senderpoints > recieverpoints)
winner = '<@' + sender + '>';
else if (senderpoints < recieverpoints)
winner = '<@' + reciever + '>';
betwon = bet * 2;
transaction = void 0;
if (!(winner !== '**Noone**' && winner !== '**Niemand**')) return [3, 5];
ctx.bot.money.add(ctx.interaction.guild.id, rawWinner, betwon);
if (!(betwon > 0)) return [3, 4];
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
case 3:
transaction = _b.sent();
_b.label = 4;
case 4: return [3, 6];
case 5:
ctx.bot.money.add(ctx.interaction.guild.id, sender, bet);
ctx.bot.money.add(ctx.interaction.guild.id, reciever, bet);
_b.label = 6;
case 6:
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(sender, "> is playing Memory with <@").concat(reciever, ">!\n\t\t\t\t\tThe Bet is **$").concat(bet, "**\n\t\t\t\t\t\n\t\t\t\t\t\uD83D\uDD35 \u00BB Points of <@").concat(sender, "> are **").concat(ctx.bot.memory.get('POINTS-' + sender), "**\n\t\t\t\t\t\uD83D\uDD34 \u00BB Points of <@").concat(reciever, "> are **").concat(ctx.bot.memory.get('POINTS-' + reciever), "**\n\t\t\t\t\t\n\t\t\t\t\t<:AWARD:1024385473524793445> ").concat(winner, " has won **$").concat(betwon, "**.").concat((typeof transaction === 'object') ? "\nID: ".concat(transaction.id) : '', "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription("\n\t\t\t\t\t\t\u00BB <@".concat(sender, "> spielt mit <@").concat(reciever, "> Memory!\n\t\t\t\t\t\tDie Wette ist **").concat(bet, "\u20AC**\n\t\t\t\t\t\t\n\t\t\t\t\t\t\uD83D\uDD35 \u00BB Punkte von <@").concat(sender, "> sind **").concat(ctx.bot.memory.get('POINTS-' + sender), "**\n\t\t\t\t\t\t\uD83D\uDD34 \u00BB Punkte von <@").concat(reciever, "> sind **").concat(ctx.bot.memory.get('POINTS-' + reciever), "**\n\t\t\t\t\t\t\n\t\t\t\t\t\t<:AWARD:1024385473524793445> ").concat(winner, " hat **").concat(betwon, "\u20AC** gewonnen.").concat((typeof transaction === 'object') ? "\nID: ".concat(transaction.id) : '', "\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.bot.game.delete('PLAYING-' + sender);
ctx.bot.game.delete('PLAYING-' + reciever);
ctx.bot.memory.delete('TURN-' + sender);
ctx.bot.memory.delete('A_PLAYERSELECT-' + sender);
ctx.bot.memory.delete('A_PLAYERSELECT-' + reciever);
ctx.bot.memory.delete('POINTS-' + sender);
ctx.bot.memory.delete('POINTS-' + reciever);
ctx.bot.memory.delete('E_PLAYERSELECT-' + sender);
ctx.bot.memory.delete('E_PLAYERSELECT-' + reciever);
ctx.bot.memory.delete('B_PLAYERSELECT-' + reciever);
ctx.bot.memory.delete('B_PLAYERSELECT-' + sender);
ctx.bot.memory.delete('C_PLAYERSELECT-' + reciever);
ctx.bot.memory.delete('C_PLAYERSELECT-' + sender);
return [2, ctx.interaction.message.edit({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true })];
case 7: return [2, ctx.interaction.message.edit({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true })];
}
});
});
}
};
//# sourceMappingURL=choice.js.map