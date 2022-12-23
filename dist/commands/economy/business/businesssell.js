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
.setName('businesssell')
.setDMPermission(false)
.setDescription('SELL YOUR BUSINESS')
.setDescriptionLocalizations({
de: 'VERKAUFE DEIN GESCHÄFT'
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, business, cost, name, message_2, row, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'businesses')];
case 1:
if (!(_a.sent())) {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Businesses are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Gesch\u00E4fte sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESS : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS')];
case 2:
business = _a.sent();
if (business === 'market')
cost = 150000;
if (business === 'parking garage')
cost = 390000;
if (business === 'car dealership')
cost = 520000;
if (business === 'market')
name = 'MARKET';
if (business === 'parking garage')
name = 'PARKING GARAGE';
if (business === 'car dealership')
name = 'CAR DEALERSHIP';
if (ctx.metadata.language === 'de') {
if (business === 'market')
name = 'SUPERMARKT';
if (business === 'parking garage')
name = 'PARKHAUS';
if (business === 'car dealership')
name = 'AUTOHAUS';
}
return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS')];
case 3:
if ((_a.sent()) === 0) {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont own a Business!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du besitzt kein Gesch\u00E4ft!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSSELL : ".concat(business, " : DONTOWNBUSINESS"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('BUSINESS-SELL-YES-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382942153285632')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('BUSINESS-SELL-NO-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('BUSINESS-SELL-YES-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382942153285632')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('BUSINESS-SELL-NO-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
}
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL BUSINESS')
.setDescription("\u00BB Do you want to sell your **".concat(name, "** for **$").concat(cost / 2, "**?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » GESCHÄFT VERKAUFEN')
.setDescription("\u00BB Willst du dein **".concat(name, "** f\u00FCr **").concat(cost / 2, "\u20AC** verkaufen?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSSELL : ".concat(name, " : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message], components: [row] })];
}
});
});
}
};
//# sourceMappingURL=businesssell.js.map