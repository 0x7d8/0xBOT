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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
if (ar || !(i in from)) {
if (!ar) ar = Array.prototype.slice.call(from, 0, i);
ar[i] = from[i];
}
}
return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var discord_js_2 = require("discord.js");
var promises_1 = require("timers/promises");
exports.default = {
data: {
name: 'memory-yes'
},
execute: function (ctx, bet) {
return __awaiter(this, void 0, void 0, function () {
var cache, description, _a, sender, reciever, balance, otherbalance, message_1, message_2, message_3, missing, message_4, missing, message_5, row1, row2, row3, row4, emojis, emojis2, emojilistraw, copied, emojilist, i, randomIndex, emojistate, emojinumber, skipother, rdo, message, i;
var _this = this;
return __generator(this, function (_b) {
switch (_b.label) {
case 0:
cache = ctx.interaction.message.embeds;
description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
_a = __read(description, 2), sender = _a[0], reciever = _a[1];
return [4, ctx.bot.money.get(reciever)];
case 1:
balance = _b.sent();
return [4, ctx.bot.money.get(sender)];
case 2:
otherbalance = _b.sent();
if (ctx.interaction.user.id !== reciever) {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(reciever, "> has to decide this!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB <@".concat(reciever, "> muss das entscheiden!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] MEMORY : YES : NOTALLOWED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (ctx.bot.game.has('PLAYING-' + reciever)) {
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
ctx.log(false, "[BTN] MEMORY : ".concat(reciever, " : ALREADYLOBBY"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
if (ctx.bot.game.has('PLAYING-' + sender)) {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(sender, "> is already in a Lobby!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB <@".concat(sender, "> ist schon in einer Lobby!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] MEMORY : ".concat(sender, " : ALREADYLOBBY"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
if (balance < bet) {
missing = bet - balance;
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Geld, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] MEMORY : ".concat(reciever, " : ").concat(bet, "\u20AC : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_4], ephemeral: true })];
}
if (otherbalance < bet) {
missing = bet - otherbalance;
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(sender, "> doesnt have enough Money, he is Missing **$").concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB <@".concat(sender, "> hat nicht genug Geld, im fehlen **").concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] MEMORY : ".concat(reciever, " : ").concat(bet, "\u20AC : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_5], ephemeral: true })];
}
return [4, ctx.interaction.deferUpdate()];
case 3:
_b.sent();
ctx.bot.memory.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id);
row1 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-1-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-2-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-3-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-4-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-5-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
row2 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-6-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-7-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-8-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-9-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-10-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
row3 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-11-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-12-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-13-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-14-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-15-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
row4 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-16-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-17-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-18-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-19-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1020411843644243998')
.setCustomId('MEMORY-20-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
ctx.bot.game.set('PLAYING-' + sender, 'MEMORY');
ctx.bot.game.set('PLAYING-' + reciever, 'MEMORY');
ctx.bot.memory.set('A_PLAYERSELECT-' + sender, 0);
ctx.bot.memory.set('A_PLAYERSELECT-' + reciever, 0);
ctx.bot.memory.set('POINTS-' + sender, 0);
ctx.bot.memory.set('POINTS-' + reciever, 0);
ctx.bot.memory.set('E_PLAYERSELECT-' + sender, []);
ctx.bot.memory.set('E_PLAYERSELECT-' + reciever, []);
ctx.bot.memory.set('B_PLAYERSELECT-' + reciever, []);
ctx.bot.memory.set('B_PLAYERSELECT-' + sender, []);
ctx.bot.memory.set('C_PLAYERSELECT-' + reciever, []);
ctx.bot.memory.set('C_PLAYERSELECT-' + sender, []);
emojis = [];
emojis2 = [];
emojilistraw = [
"1017444934904729611",
"1017445104685961236",
"1017444736610619453",
"1017445667347636294",
"1017445007910772766",
"1017445430310752336",
"1017445761291669604",
"1017444837257134100",
"1017444467353063474",
"1017445246516334653",
"1017445352078590093",
"1017847213067604009",
"1018083730688057394",
"1018079045461741569",
"1018079408185163796",
"1018927449368703098",
"1014209756103184455",
"1014209757214679121",
"1018928177353072700",
"1018930597856559144",
"1019235162569068615",
"1014209765431324733",
"1019238968346284084",
"1019239168573968385",
"1019247388587728936",
"1019247603843596368",
"1019247987970560010",
"1019248618709983283",
"1019248854694109276",
"1019249349890429101",
"1019250108681949315",
"1019250327440068671",
"1019251675644559500",
"1019253539471642694",
"1019254370124173352",
"1019254562214903869",
"1023932900749627483",
"1023933347078094891",
"790990037982248971",
];
copied = __spreadArray([], __read(emojilistraw), false);
emojilist = [];
for (i = 0; i < 10; i++) {
randomIndex = Math.floor(Math.random() * copied.length);
emojilist.push(copied[randomIndex]);
copied.splice(randomIndex, 1);
}
emojistate = false, emojinumber = 1, skipother = false;
rdo = function () { return __awaiter(_this, void 0, void 0, function () {
var emojirandom, emoji, _a, _b, _c, _d;
return __generator(this, function (_e) {
switch (_e.label) {
case 0:
if (!(emojistate == false)) return [3, 8];
emojirandom = ctx.bot.random(1, 10);
return [4, emojilist[emojirandom - 1]];
case 1:
emoji = _e.sent();
skipother = false;
if (!(typeof emoji !== 'undefined' && typeof emojinumber !== 'undefined')) return [3, 7];
if (!!emojis.includes(emoji)) return [3, 4];
_a = emojis;
_b = emojinumber - 1;
return [4, emoji];
case 2:
_a[_b] = _e.sent();
return [4, (0, promises_1.setTimeout)(25)];
case 3:
_e.sent();
ctx.bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString());
emojinumber = emojinumber + 1;
if (emojinumber > 20) {
emojistate = true;
return [2];
}
skipother = true;
_e.label = 4;
case 4:
if (!(!emojis2.includes(emoji) && skipother != true)) return [3, 7];
_c = emojis2;
_d = emojinumber - 1;
return [4, emoji];
case 5:
_c[_d] = _e.sent();
return [4, (0, promises_1.setTimeout)(25)];
case 6:
_e.sent();
ctx.bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString());
emojinumber = emojinumber + 1;
if (emojinumber > 20) {
emojistate = true;
return [2];
}
_e.label = 7;
case 7: return [3, 0];
case 8: return [2];
}
});
}); };
return [4, rdo()];
case 4:
_b.sent();
ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet);
ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet);
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription("\n\t\t\t\t\u00BB <@".concat(sender, "> is playing Memory with <@").concat(reciever, ">!\n\t\t\t\tThe Bet is **$").concat(bet, "**\n\t\t\t\t\n\t\t\t\t\uD83D\uDD35 \u00BB Points of <@").concat(sender, "> are **0**\n\t\t\t\t\uD83D\uDD34 \u00BB Points of <@").concat(reciever, "> are **0**\n\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version + ' » CURRENT TURN: 🔵' });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(sender, "> spielt mit <@").concat(reciever, "> Memory!\n\t\t\t\t\tDie Wette ist **").concat(bet, "\u20AC**\n\t\t\t\t\t\n\t\t\t\t\t\uD83D\uDD35 \u00BB Punkte von <@").concat(sender, "> sind **0**\n\t\t\t\t\t\uD83D\uDD34 \u00BB Punkte von <@").concat(reciever, "> sind **0**\n\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version + ' » AM ZUG: 🔵' });
}
ctx.bot.memory.set('TURN-' + sender, sender);
for (i = 0; i < 20; i++) {
ctx.bot.memory.set('STYLE-' + (i + 1) + '-' + sender, discord_js_1.ButtonStyle.Secondary);
ctx.bot.memory.set('DISABLED-' + (i + 1) + '-' + sender, false);
ctx.bot.memory.set('D_EMOJI-' + (i + 1) + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' });
}
ctx.log(false, "[BTN] MEMORY : ".concat(sender, " : ACCEPT"));
return [2, ctx.interaction.editReply({ content: '', embeds: [message], components: [row1, row2, row3, row4] })];
}
});
});
}
};
//# sourceMappingURL=yes.js.map