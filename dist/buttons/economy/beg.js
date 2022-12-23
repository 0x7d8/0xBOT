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
data: {
name: 'beg'
},
execute: function (ctx, reciever, amount, reasontype, reason) {
return __awaiter(this, void 0, void 0, function () {
var balance, args, total, missing, message_1, message_2, transaction, message, rmessage;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 1:
balance = _a.sent();
args = ctx.interaction.message.embeds[0].description.split('**');
total = Number(args[1].match(/\d+/g)) + amount;
if (balance < amount) {
missing = amount - balance;
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Geld, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] BEG : ".concat(reciever, " : ").concat(amount, "\u20AC : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (ctx.interaction.user.id == reciever) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant give yourself Money?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst dir selber kein Geld geben?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] BEG : ".concat(reciever, " : ").concat(amount, "\u20AC : SAMEPERSON"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: ctx.interaction.user.id,
amount: amount,
type: 'negative'
}, reciever: {
id: reciever,
amount: amount,
type: 'positive'
}
})];
case 2:
transaction = _a.sent();
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
ctx.bot.money.add(ctx.interaction.guild.id, reciever, amount);
if (reasontype !== 'SET') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(reciever, "> needs Money!\n\t\t\t\t\tTotal Earnings: **$").concat(total, "**\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription("\n\t\t\t\t\t\t\u00BB <@".concat(reciever, "> braucht Geld!\n\t\t\t\t\t\tInsgesamte Einnahmen: **").concat(total, "\u20AC**\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(reciever, "> needs Money!\n\t\t\t\t\tTotal Earnings: **$").concat(total, "**\n\t\t\t\t\t*\"").concat(reason, "\"*\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription("\n\t\t\t\t\t\t\u00BB <@".concat(reciever, "> braucht Geld!\n\t\t\t\t\t\tInsgesamte Einnahmen: **").concat(total, "\u20AC**\n\t\t\t\t\t\t*\"").concat(reason, "\"*\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
;
rmessage = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BEGGING')
.setDescription("\n\t\t\t\t\u00BB <@".concat(ctx.interaction.user.id, "> gave <@").concat(reciever, "> **$").concat(amount, "**!\n\t\t\t\t\n\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
rmessage = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » BETTELN')
.setDescription("\n\t\t\t\t\t\u00BB <@".concat(ctx.interaction.user.id, "> hat <@").concat(reciever, "> **").concat(amount, "\u20AC** gegeben!\n\t\t\t\t\t\n\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] BEG : ".concat(reciever, " : ").concat(amount, "\u20AC"));
return [4, ctx.interaction.reply({ embeds: [rmessage] })];
case 3:
_a.sent();
return [2, ctx.interaction.message.edit({ embeds: [message] }).catch(function () { })];
}
});
});
}
};
//# sourceMappingURL=beg.js.map