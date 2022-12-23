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
.setName('itemprice')
.setDMPermission(false)
.setDescription('SET STORE PRICES')
.setDescriptionLocalizations({
de: 'SETZE SHOP PREISE'
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
.addChoices({ name: '💣 [250€-1500€] NORMALE BOMBE', value: 'nbomb' }, { name: '💣 [750€-5000€] MEDIUM BOMBE', value: 'mbomb' }, { name: '💣 [2500€-15000€] HYPER BOMBE', value: 'hbomb' }, { name: '💣 [7500€-20000€] CRAZY BOMBE', value: 'cbomb' });
})
.addIntegerOption(function (option) {
return option.setName('price')
.setNameLocalizations({
de: 'preis'
})
.setDescription('THE NEW PRICE [THE FIRST VALUE IS THE PRODUCTION COST]')
.setDescriptionLocalizations({
de: 'DER NEUE PREIS [DIE ERSTE ZAHL IST DER PRODUKTIONS PREIS]'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, itemid, newprice, message_2, doscream, message_3, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'businesses')];
case 1:
if (!(_a.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Businesses are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Gesch\u00E4fte sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESS : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
itemid = ctx.getOption('item');
newprice = ctx.getOption('price');
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-OWNER')];
case 2:
if ((_a.sent()) !== ctx.interaction.user.id) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont own this Business!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du besitzt dieses Gesch\u00E4ft nicht!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMPRICE : NOTOWNER");
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
doscream = false;
if (itemid === 'nbomb' && !ctx.bot.inRange(newprice, 250, 1500))
doscream = true;
if (itemid === 'mbomb' && !ctx.bot.inRange(newprice, 750, 5000))
doscream = true;
if (itemid === 'hbomb' && !ctx.bot.inRange(newprice, 2500, 15000))
doscream = true;
if (itemid === 'cbomb' && !ctx.bot.inRange(newprice, 7500, 20000))
doscream = true;
if (doscream) {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Please follow the limits seen in the first step!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Bitte folge den Limits zu sehen im ersten Schritt!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMPRICE : ".concat(newprice, " : NOTLIMIT"));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase(), newprice.toString());
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:PARTITION:1024399126403747970> » ITEM PRICES')
.setDescription("\u00BB Successfully set the price to **$".concat(newprice, "**."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:PARTITION:1024399126403747970> » ITEM PREISE')
.setDescription("\u00BB Erfolgreich den Preis auf **".concat(newprice, "\u20AC** gesetzt."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMPRICE : ".concat(itemid.toUpperCase(), " : ").concat(newprice, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
});
});
}
};
//# sourceMappingURL=itemprice.js.map