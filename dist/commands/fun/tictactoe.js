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
.setName('tictactoe')
.setDescription('PLAY TICTACTOE')
.setDescriptionLocalizations({
de: 'SPIELE TICTACTOE'
})
.setDMPermission(false)
.addUserOption(function (option) {
return option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(true);
})
.addIntegerOption(function (option) {
return option.setName('bet')
.setNameLocalizations({
de: 'wette'
})
.setDescription('THE AMOUNT OF MONEY')
.setDescriptionLocalizations({
de: 'DIE ANZAHL VON GELD'
})
.setRequired(false);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var user, bet, money, othermoney, message_1, message_2, message_3, message_4, message_5, missing, message_6, missing, message_7, row, message, msg, expiration;
var _this = this;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
user = ctx.interaction.options.getUser("user");
bet = ctx.getOption('bet');
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 1:
money = _a.sent();
return [4, ctx.bot.money.get(user.id)];
case 2:
othermoney = _a.sent();
if (user.bot) {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant play Tic Tac Toe with a Bot!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst Tic Tac Toe nicht mit einem Bot spielen!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : BOT"));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (ctx.bot.game.has('PLAYING-' + ctx.interaction.user.id)) {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You are already in a Lobby!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du bist schon in einer Lobby!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : ALREADYLOBBY"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
if (ctx.bot.game.has('PLAYING-' + user.id)) {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(user.id, "> is already in a Lobby!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB <@".concat(user.id, "> ist schon in einer Lobby!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : ALREADYLOBBY"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
if (bet < 0 && bet !== null) {
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant bet negative Money!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst kein negatives Geld wetten!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : NEGATIVEMONEY : ").concat(bet, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_4], ephemeral: true })];
}
if (ctx.interaction.user.id === user.id) {
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant play Tic Tac Toe with yourself?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst Tic Tac Toe nicht mit dir selber spielen?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : ").concat(bet, "\u20AC : SAMEPERSON"));
return [2, ctx.interaction.reply({ embeds: [message_5], ephemeral: true })];
}
if (money < bet && bet !== null) {
missing = bet - money;
message_6 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_6 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Geld, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_6], ephemeral: true })];
}
if (othermoney < bet && bet !== null) {
missing = bet - othermoney;
message_7 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(user.id, "> doesnt have enough Money for that, he is Missing **$").concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_7 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB <@".concat(user.id, "> hat daf\u00FCr nicht genug Geld, im fehlen **").concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_7], ephemeral: true })];
}
if (!bet)
bet = 0;
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('TTT-YES-' + bet)
.setEmoji('1024382942153285632')
.setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('TTT-NO-' + bet)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('TTT-YES-' + bet)
.setEmoji('1024382942153285632')
.setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('TTT-NO-' + bet)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger));
}
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\n\t\t\t\t\u00BB <@".concat(ctx.interaction.user.id, "> challenges you, <@").concat(user.id, "> to a battle of Tic Tac Toe! The Bet is **$").concat(bet, "**.\n\t\t\t\tDo you accept?\n\t\t\t\t\n\t\t\t\t\u00BB This Request expires <t:").concat(Math.floor(+new Date() / 1000) + 29, ":R>\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(ctx.interaction.user.id, "> fordert dich, <@").concat(user.id, "> zu einem Spiel von Tic Tac Toe heraus! Die Wette ist **").concat(bet, "\u20AC**.\n\t\t\t\t\tAkzeptierst du?\n\t\t\t\t\t\n\t\t\t\t\t\u00BB Diese Anfrage wird ung\u00FCltig <t:").concat(Math.floor(+new Date() / 1000) + 29, ":R>\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : ").concat(bet, "\u20AC"));
return [4, ctx.interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row], fetchReply: true })];
case 3:
msg = _a.sent();
ctx.bot.ttt.set('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id, true);
expiration = function () { return __awaiter(_this, void 0, void 0, function () {
return __generator(this, function (_a) {
if (!ctx.bot.ttt.has('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id))
return [2];
ctx.bot.ttt.delete('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id);
{
msg.components[0].components[0].data.disabled = true;
msg.components[0].components[1].data.disabled = true;
msg.components[0].components[0].data.style = 2;
msg.components[0].components[1].data.style = 2;
}
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\u00BB The Request expired.")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription("\u00BB Die Anfrage ist abgelaufen.")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TICTACTOE : ".concat(user.id, " : EXPIRED"));
ctx.interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch(function () { });
return [2];
});
}); };
setTimeout(function () { return expiration(); }, 27000);
return [2];
}
});
});
}
};
//# sourceMappingURL=tictactoe.js.map