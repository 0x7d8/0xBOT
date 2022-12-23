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
.setName('transactionview')
.setDescription('VIEW A TRANSACTION')
.setDescriptionLocalizations({
de: 'SCHAU EINE TRANSAKTION AN'
})
.setDMPermission(false)
.addStringOption(function (option) {
return option.setName('id')
.setDescription('THE TRANSACTION ID')
.setDescriptionLocalizations({
de: 'DIE TRANSAKTIONS ID'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var transactionId, transaction, message_1, sender, reciever, senderInfo, recieverInfo, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
transactionId = ctx.getOption('id');
return [4, ctx.bot.transactions.get(transactionId)];
case 1:
transaction = _a.sent();
if (transaction === 'N-FOUND') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB This Transaction doesnt exist!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Diese Transaktion existiert nicht!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TRANSACTIONVIEW : NOTEXIST : ".concat(transactionId));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
if (!isNaN(transaction.sender.id.slice(-1))) return [3, 3];
return [4, ctx.bot.userdb.get(transaction.sender.id)];
case 2:
senderInfo = _a.sent();
sender = senderInfo.username + '#' + senderInfo.usertag;
return [3, 4];
case 3:
sender = transaction.sender.id;
_a.label = 4;
case 4:
;
if (!!isNaN(transaction.reciever.id.slice(-1))) return [3, 6];
return [4, ctx.bot.userdb.get(transaction.reciever.id)];
case 5:
recieverInfo = _a.sent();
reciever = recieverInfo.username + '#' + recieverInfo.usertag;
return [3, 7];
case 6:
reciever = transaction.reciever.id;
_a.label = 7;
case 7:
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSACTION INFOS')
.setDescription("\u00BB ID: `".concat(transactionId, "`\n\t\t\t\t<t:").concat(transaction.timestamp, ">\n\n\t\t\t\t\u00BB ").concat(sender, "\n\t\t\t\t**").concat(transaction.sender.type === 'positive' ? '+' : '-', "$").concat(transaction.sender.amount, "**\n\n\t\t\t\t\u00BB ").concat(reciever, "\n\t\t\t\t**").concat(transaction.reciever.type === 'positive' ? '+' : '-', "$").concat(transaction.reciever.amount, "**\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS INFOS')
.setDescription("\u00BB ID: `".concat(transactionId, "`\n\t\t\t\t<t:").concat(transaction.timestamp, ">\n\n\t\t\t\t\u00BB ").concat(sender, "\n\t\t\t\t**").concat(transaction.sender.type === 'positive' ? '+' : '-').concat(transaction.sender.amount, "\u20AC**\n\n\t\t\t\t\u00BB ").concat(reciever, "\n\t\t\t\t**").concat(transaction.reciever.type === 'positive' ? '+' : '-').concat(transaction.reciever.amount, "\u20AC**\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TRANSACTIONVIEW : ".concat(transactionId));
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=transactionview.js.map