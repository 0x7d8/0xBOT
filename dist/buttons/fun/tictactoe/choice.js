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
if (button < 10) {
row = 2;
btn = button - 6;
}
if (button < 7) {
row = 1;
btn = button - 3;
}
if (button < 4) {
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
name: 'ttt-choice'
},
execute: function (ctx, bet, sel) {
return __awaiter(this, void 0, void 0, function () {
var cache, description, _a, sender, reciever, message_1, turn, message_2, turnemoji, comp, message, fields, won, winner, rawWinner, betwon, transaction, i, comp_1;
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
ctx.log(false, "[BTN] TICTACTOE : NOTPLAYING");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
turn = ctx.bot.ttt.get('TURN-' + sender);
if (ctx.interaction.user.id !== turn) {
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
ctx.log(false, "[BTN] TICTACTOE : NOTTURN");
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
return [4, ctx.interaction.deferUpdate()];
case 1:
_b.sent();
if (turn === sender)
turnemoji = '🔵';
if (turn === reciever)
turnemoji = '🔴';
if (turn === sender) {
ctx.bot.ttt.set('TURN-' + sender, reciever);
turnemoji = '🔴';
}
;
if (turn === reciever) {
ctx.bot.ttt.set('TURN-' + sender, sender);
turnemoji = '🔵';
}
comp = rowGet(sel);
if (ctx.interaction.user.id === sender) {
ctx.bot.ttt.set('FIELD-' + sel + '-' + sender, sender);
ctx.bot.ttt.get('FIELDS-' + sender).push(sel);
ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
ctx.components.rows[comp[1]].components[comp[0]].setEmoji('1020411088245903451');
ctx.components.rows[comp[1]].components[comp[0]].setStyle(1);
}
;
if (ctx.interaction.user.id === reciever) {
ctx.bot.ttt.set('FIELD-' + sel + '-' + sender, reciever);
ctx.bot.ttt.get('FIELDS-' + reciever).push(sel);
ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
ctx.components.rows[comp[1]].components[comp[0]].setEmoji('1020411023414542447');
ctx.components.rows[comp[1]].components[comp[0]].setStyle(4);
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\n\t\t\t\t\u00BB <@".concat(sender, "> is playing Tic Tac Toe with <@").concat(reciever, ">!\n\t\t\t\tThe Bet is **$").concat(bet, "**\n\t\t\t\t\n\t\t\t\t\uD83D\uDD35 \u00BB <@").concat(sender, ">\n\uD83D\uDD34 \u00BB <@").concat(reciever, ">\n\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version + ' » CURRENT TURN: ' + turnemoji });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(sender, "> spielt mit <@").concat(reciever, "> Tic Tac Toe!\n\t\t\t\t\tDie Wette ist **").concat(bet, "\u20AC**\n\t\t\t\t\t\n\t\t\t\t\t\uD83D\uDD35 \u00BB <@").concat(sender, ">\n\uD83D\uDD34 \u00BB <@").concat(reciever, ">\n\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version + ' » AM ZUG: ' + turnemoji });
}
ctx.log(false, "[BTN] TICTACTOE : ".concat(sel));
ctx.interaction.editReply({ embeds: [message], components: ctx.interaction.message.components, ephemeral: true });
return [4, (0, promises_1.setTimeout)(500)];
case 2:
_b.sent();
fields = [];
won = false;
if (ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-2-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-3-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-2-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null) {
won = true;
fields.push(1, 2, 3);
}
if (ctx.bot.ttt.get('FIELD-4-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-4-' + sender) === ctx.bot.ttt.get('FIELD-6-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-4-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null) {
won = true;
fields.push(3, 4, 5);
}
if (ctx.bot.ttt.get('FIELD-7-' + sender) === ctx.bot.ttt.get('FIELD-8-' + sender) &&
ctx.bot.ttt.get('FIELD-7-' + sender) === ctx.bot.ttt.get('FIELD-9-' + sender) &&
ctx.bot.ttt.get('FIELD-7-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-8-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-9-' + sender) !== null) {
won = true;
fields.push(7, 8, 9);
}
if (ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-4-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-7-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-4-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-7-' + sender) !== null) {
won = true;
fields.push(1, 4, 7);
}
if (ctx.bot.ttt.get('FIELD-2-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-2-' + sender) === ctx.bot.ttt.get('FIELD-8-' + sender) &&
ctx.bot.ttt.get('FIELD-2-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-8-' + sender) !== null) {
won = true;
fields.push(2, 5, 8);
}
if (ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-6-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-9-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-6-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-9-' + sender) !== null) {
won = true;
fields.push(3, 6, 9);
}
if (ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-9-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-9-' + sender) !== null) {
won = true;
fields.push(1, 5, 9);
}
if (ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-7-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-7-' + sender) !== null) {
won = true;
fields.push(3, 5, 7);
}
if (!(won || (ctx.bot.ttt.get('FIELDS-' + sender).length + ctx.bot.ttt.get('FIELDS-' + reciever).length) === 9)) return [3, 7];
winner = '**Noone**', rawWinner = void 0;
if (ctx.metadata.language === 'de')
winner = '**Niemand**';
if (won) {
rawWinner = ctx.bot.ttt.get('FIELD-' + fields[0] + '-' + sender);
winner = '<@' + ctx.bot.ttt.get('FIELD-' + fields[0] + '-' + sender) + '>';
}
fields.forEach(function (field) {
var comp = rowGet(field);
ctx.components.rows[comp[1]].components[comp[0]].setStyle(3);
});
betwon = bet * 2;
transaction = void 0;
if (!rawWinner) return [3, 5];
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
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(sender, "> is playing Tic Tac Toe with <@").concat(reciever, ">!\n\t\t\t\t\tThe Bet is **$").concat(bet, "**\n\t\t\t\t\t\n\t\t\t\t\t\uD83D\uDD35 \u00BB <@").concat(sender, ">\n\t\t\t\t\t\uD83D\uDD34 \u00BB <@").concat(reciever, ">\n\t\t\t\t\t\n\t\t\t\t\t<:AWARD:1024385473524793445> ").concat(winner, " has won **$").concat(betwon, "**.").concat((typeof transaction === 'object') ? "\nID: ".concat(transaction.id) : '', "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\n\t\t\t\t\t\t\u00BB <@".concat(sender, "> spielt mit <@").concat(reciever, "> Tic Tac Toe!\n\t\t\t\t\t\tDie Wette ist **").concat(bet, "\u20AC**\n\t\t\t\t\t\t\n\t\t\t\t\t\t\uD83D\uDD35 \u00BB <@").concat(sender, ">\n\t\t\t\t\t\t\uD83D\uDD34 \u00BB <@").concat(reciever, ">\n\t\t\t\t\t\t\n\t\t\t\t\t\t<:AWARD:1024385473524793445> ").concat(winner, " hat **").concat(betwon, "\u20AC** gewonnen.").concat((typeof transaction === 'object') ? "\nID: ".concat(transaction.id) : '', "\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
for (i = 0; i <= 9; i++) {
comp_1 = rowGet(i);
ctx.components.rows[comp_1[1]].components[comp_1[0]].setDisabled(true);
}
ctx.bot.game.delete('PLAYING-' + sender);
ctx.bot.game.delete('PLAYING-' + reciever);
ctx.bot.ttt.delete('TURN-' + sender);
ctx.bot.ttt.delete('TURN-' + reciever);
ctx.bot.ttt.delete('FIELDS-' + sender);
ctx.bot.ttt.delete('FIELDS-' + reciever);
ctx.bot.ttt.delete('FIELD-1-' + sender);
ctx.bot.ttt.delete('FIELD-2-' + sender);
ctx.bot.ttt.delete('FIELD-3-' + sender);
ctx.bot.ttt.delete('FIELD-4-' + sender);
ctx.bot.ttt.delete('FIELD-5-' + sender);
ctx.bot.ttt.delete('FIELD-6-' + sender);
ctx.bot.ttt.delete('FIELD-7-' + sender);
ctx.bot.ttt.delete('FIELD-8-' + sender);
ctx.bot.ttt.delete('FIELD-9-' + sender);
return [2, ctx.interaction.message.edit({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true })];
case 7: return [2];
}
});
});
}
};
//# sourceMappingURL=choice.js.map