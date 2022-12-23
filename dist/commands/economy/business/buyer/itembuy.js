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
.setName('itembuy')
.setDMPermission(false)
.setDescription('BUY ITEMS')
.setDescriptionLocalizations({
de: 'KAUFE GEGENSTÄNDE'
})
.addStringOption(function (option) {
return option.setName('item')
.setNameLocalizations({
de: 'gegenstand'
})
.setDescription('THE ITEM')
.setDescriptionLocalizations({
de: 'DER GEGENSTAND'
})
.setRequired(true)
.addChoices({ name: '💣 NORMALE BOMBE', value: 'nbomb' }, { name: '💣 MEDIUM BOMBE', value: 'mbomb' }, { name: '💣 HYPER BOMBE', value: 'hbomb' }, { name: '💣 CRAZY BOMBE', value: 'cbomb' });
})
.addIntegerOption(function (option) {
return option.setName('amount')
.setNameLocalizations({
de: 'anzahl'
})
.setDescription('THE AMOUNT')
.setDescriptionLocalizations({
de: 'DIE ANZAHL'
})
.setRequired(false);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, itemid, amount, balance, costmul, cost, _a, _b, name, missing, message_2, pamount, oldamount, message_3, row, message;
return __generator(this, function (_c) {
switch (_c.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'items')];
case 1:
if (!(_c.sent())) {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Items are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Items sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, '[CMD] ITEM : DISABLED');
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
itemid = ctx.getOption('item');
amount = ctx.getOption('amount');
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 2:
balance = _c.sent();
if (!amount)
costmul = 1;
else
costmul = amount;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())];
case 3:
_a = (_c.sent()) === '0';
if (_a) return [3, 5];
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())];
case 4:
_a = (_c.sent()) === 0;
_c.label = 5;
case 5:
if (!_a) return [3, 6];
if (itemid === 'nbomb')
cost = 500 * costmul;
if (itemid === 'mbomb')
cost = 1000 * costmul;
if (itemid === 'hbomb')
cost = 5000 * costmul;
if (itemid === 'cbomb')
cost = 15000 * costmul;
return [3, 8];
case 6:
_b = Number;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())];
case 7:
cost = _b.apply(void 0, [_c.sent()]) * costmul;
_c.label = 8;
case 8:
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMAL BOMB';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMB';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMB';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMB';
if (ctx.metadata.language === 'de') {
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
}
if (balance < cost) {
missing = cost - balance;
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you are missing **$".concat(missing, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast daf\u00FCr nicht genug Geld, dir fehlen **".concat(missing, "\u20AC**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMBUY : ".concat(itemid.toUpperCase(), " : NOTENOUGHMONEY : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
if (!amount)
pamount = 1;
else
pamount = amount;
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 'amount')];
case 9:
oldamount = _c.sent();
if ((pamount + oldamount) > 15) {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Slots for that!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast nicht genug Slots daf\u00FCr!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMBUY : ".concat(itemid.toUpperCase(), " : MAXSLOTS"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('ITEM-BUY-YES-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('ITEM-BUY-NO-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('ITEM-BUY-YES-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
.setEmoji('1024382935618572299')
.setStyle(discord_js_1.ButtonStyle.Success)
.setDisabled(false), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('ITEM-BUY-NO-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger)
.setDisabled(false));
}
if (amount === null || amount === 1) {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
.setDescription("\u00BB Do you want to buy a **".concat(name, "** for **$").concat(cost, "**?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
.setDescription("\u00BB Willst du eine **".concat(name, "** f\u00FCr **").concat(cost, "\u20AC** kaufen?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
.setDescription("\u00BB Do you want to buy **".concat(amount, "x** **").concat(name, "** for **$").concat(cost, "**?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
.setDescription("\u00BB Willst du **".concat(amount, "x** **").concat(name, "** f\u00FCr **").concat(cost, "\u20AC** kaufen?"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, "[CMD] ITEMBUY : ".concat(pamount, "x : ").concat(itemid.toUpperCase(), " : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message], components: [row] })];
}
});
});
}
};
//# sourceMappingURL=itembuy.js.map