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
.setName('pay')
.setDescription('GIVE SOMEONE MONEY')
.setDescriptionLocalizations({
de: 'GEBE JEMANDEN GELD'
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
return option.setName('amount')
.setNameLocalizations({
de: 'amount'
})
.setDescription('THE AMOUNT OF MONEY')
.setDescriptionLocalizations({
de: 'DIE amount VON GELD'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var user, amount, balance, message_1, message_2, message_3, missing, message_4, transaction, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
user = ctx.interaction.options.getUser("user");
amount = ctx.getOption('amount');
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 1:
balance = _a.sent();
if (amount < 0) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant send negative Money!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst kein negatives Geld senden!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] PAY : NEGATIVEMONEY : ".concat(amount, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (user.bot) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant give a Bot Money!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst einem Bot kein Geld geben!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] PAY : ".concat(user.id, " : BOT : ").concat(amount, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
if (ctx.interaction.user.id === user.id) {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant pay yourself Money?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst dir selber kein Geld \u00FCberweisen?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] PAY : ".concat(user.id, " : ").concat(amount, "\u20AC : SAMEPERSON"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
if (balance < amount) {
missing = amount - balance;
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
ctx.log(false, "[CMD] PAY : ".concat(user.id, " : NOTENOUGHMONEY : ").concat(amount, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_4], ephemeral: true })];
}
return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: ctx.interaction.user.id,
amount: amount,
type: 'negative'
}, reciever: {
id: user.id,
amount: amount,
type: 'positive'
}
})];
case 2:
transaction = _a.sent();
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » GIVE MONEY')
.setDescription("\n\t\t\t\t\u00BB You gave <@".concat(user.id, "> **$").concat(amount, "**!\n\n\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » GELD GEBEN')
.setDescription("\n\t\t\t\t\t\u00BB Du hast <@".concat(user.id, "> **").concat(amount, "\u20AC** gegeben!\n\n\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
ctx.bot.money.add(ctx.interaction.guild.id, user.id, amount);
ctx.log(false, "[CMD] PAY : ".concat(user.id, " : ").concat(amount, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=pay.js.map