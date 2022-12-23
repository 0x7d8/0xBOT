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
.setName('businessbuy')
.setDMPermission(false)
.setDescription('BUY BUSINESSES')
.setDescriptionLocalizations({
de: 'KAUFE GESCHÄFTE'
})
.addStringOption(function (option) {
return option.setName('business')
.setNameLocalizations({
de: 'geschäft'
})
.setDescription('THE BUSINESS')
.setDescriptionLocalizations({
de: 'DAS GESCHÄFT'
})
.setRequired(true)
.addChoices({ name: '🟢 [150000€] SUPERMARKT', value: 'market' }, { name: '🔵 [390000€] PARKHAUS (WIP)', value: 'parking garage' }, { name: '🟡 [520000€] AUTOHAUS', value: 'car dealership' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, business, balance, message_2, businessid, businessowner, oldleft, fetchc, message_3, userbusiness, name_1, message_4, cost, name, missing, message_5, row, message;
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
business = ctx.getOption('business');
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 2:
balance = _a.sent();
if (business === 'parking garage') {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB This Business will be included soon!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Dieses Gesch\u00E4ft wird bald hinzugef\u00FCgt!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSBUY : WIP");
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
if (business === 'market')
businessid = '1';
if (business === 'parking garage')
businessid = '2';
if (business === 'car dealership')
businessid = '3';
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER')];
case 3:
if (!((_a.sent()) !== 0)) return [3, 6];
oldleft = false;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER')];
case 4:
businessowner = _a.sent();
return [4, ctx.interaction.guild.members.fetch(businessowner)];
case 5:
fetchc = _a.sent();
if (typeof fetchc === 'undefined')
oldleft = true;
if (!oldleft) {
if (ctx.interaction.user.id !== businessowner) {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(businessowner, "> already owns this Business!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Dieses Gesch\u00E4ft geh\u00F6rt schon <@".concat(businessowner, ">!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You already own this Business!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Dieses Gesch\u00E4ft geh\u00F6rt schon dir!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, "[CMD] BUSINESSBUY : ".concat(business.toUpperCase(), " : ALREADYOWNED"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
_a.label = 6;
case 6: return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-BUSINESS')];
case 7:
if (!((_a.sent()) !== 0)) return [3, 9];
return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-BUSINESS')];
case 8:
userbusiness = _a.sent();
if (userbusiness === 'market')
name_1 = 'MARKET';
if (userbusiness === 'parking garage')
name_1 = 'PARKING GARAGE';
if (userbusiness === 'car dealership')
name_1 = 'CAR DEALERSHIP';
if (ctx.metadata.language === 'de') {
if (userbusiness === 'market')
name_1 = 'SUPERMARKT';
if (userbusiness === 'parking garage')
name_1 = 'PARKHAUS';
if (userbusiness === 'car dealership')
name_1 = 'AUTOHAUS';
}
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You already own a **".concat(name_1, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du besitzt schon ein **".concat(name_1, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSBUY : ALREADYBUSINESS");
return [2, ctx.interaction.reply({ embeds: [message_4], ephemeral: true })];
case 9:
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
if (balance < cost) {
missing = cost - balance;
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Geld, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSBUY : ".concat(name.toUpperCase(), " : NOTENOUGHMONEY : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_5], ephemeral: true })];
}
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('BUSINESS-BUY-YES-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('BUSINESS-BUY-NO-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('BUSINESS-BUY-YES-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('BUSINESS-BUY-NO-' + business + '-' + ctx.interaction.user.id)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
}
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER');
ctx.bot.businesses.del('u-' + businessowner + '-' + ctx.interaction.guild.id + '-BUSINESS');
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
.setDescription("\u00BB Do you want to buy a **".concat(name, "** for **$").concat(cost, "**?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
.setDescription("\u00BB Willst du ein **".concat(name, "** f\u00FCr **").concat(cost, "\u20AC** kaufen?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSBUY : ".concat(name.toUpperCase(), " : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message], components: [row] })];
}
});
});
}
};
//# sourceMappingURL=businessbuy.js.map