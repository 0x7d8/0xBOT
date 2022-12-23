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
var discord_js_2 = require("discord.js");
exports.default = {
data: {
name: 'rps-yes'
},
execute: function (ctx, bet) {
return __awaiter(this, void 0, void 0, function () {
var cache, description, _a, sender, reciever, balance, otherbalance, message_1, message_2, message_3, missing, message_4, missing, message_5, row, message;
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
ctx.log(false, "[BTN] RPS : YES : NOTALLOWED");
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
ctx.log(false, "[BTN] RPS : ' + reciever + ' : ALREADYLOBBY");
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
ctx.log(false, "[BTN] RPS : ".concat(sender, " : ALREADYLOBBY"));
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
ctx.log(false, "[BTN] RPS : ".concat(reciever, " : ").concat(bet, "\u20AC : NOTENOUGHMONEY"));
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
ctx.log(false, "[BTN] RPS : ".concat(reciever, " : ").concat(bet, "\u20AC : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_5], ephemeral: true })];
}
ctx.bot.rps.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id);
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('🪨 ROCK')
.setCustomId('RPS-1-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('📝 PAPER')
.setCustomId('RPS-2-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('✂️ SCISSORS')
.setCustomId('RPS-3-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('✂️ SCHERE')
.setCustomId('RPS-3-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('🪨 STEIN')
.setCustomId('RPS-1-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('📝 PAPIER')
.setCustomId('RPS-2-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
}
ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet);
ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet);
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
.setDescription("\n\t\t\t\t\u00BB <@".concat(sender, "> is playing Rock Paper Scissors with <@").concat(reciever, ">!\n\t\t\t\tThe Bet is **$").concat(bet, "**\n\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(sender, "> spielt mit <@").concat(reciever, "> Schere Stein Papier!\n\t\t\t\t\tDie Wette ist **").concat(bet, "\u20AC**\n\t\t\t\t")).setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] RPS : ".concat(sender, " : ACCEPT"));
return [2, ctx.interaction.update({ content: '', embeds: [message], components: [row] })];
}
});
});
}
};
//# sourceMappingURL=yes.js.map