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
name: 'item-yes'
},
execute: function (ctx, itemid, userid, type, amount) {
return __awaiter(this, void 0, void 0, function () {
var message, balance, cost, dopay, _a, _b, name, missing, message_1, oldamount, message_2, transaction, message, businessowner;
return __generator(this, function (_c) {
switch (_c.label) {
case 0:
if (ctx.interaction.user.id !== userid) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB This choice is up to <@".concat(userid, ">!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Diese Frage ist f\u00FCr <@".concat(userid, ">!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] ITEMBUY : NOTSENDER");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 1:
balance = _c.sent();
dopay = false;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())];
case 2:
_a = (_c.sent()) === '0';
if (_a) return [3, 4];
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())];
case 3:
_a = (_c.sent()) === 0;
_c.label = 4;
case 4:
if (!_a) return [3, 5];
if (itemid === 'nbomb')
cost = 500 * amount;
if (itemid === 'mbomb')
cost = 1000 * amount;
if (itemid === 'hbomb')
cost = 5000 * amount;
if (itemid === 'cbomb')
cost = 15000 * amount;
return [3, 7];
case 5:
dopay = true;
_b = Number;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())];
case 6:
cost = _b.apply(void 0, [_c.sent()]) * amount;
_c.label = 7;
case 7:
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMAL BOMB';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMB';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMB';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMB';
if (ctx.metadata.language == 'de') {
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
}
if (!(type === 'buy')) return [3, 12];
if (balance < cost) {
missing = cost - balance;
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
ctx.log(false, "[BTN] ITEMBUY : ".concat(itemid.toUpperCase(), " : NOTENOUGHMONEY : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 'amount')];
case 8:
oldamount = _c.sent();
if ((amount + oldamount) > 15) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Slots for that!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast nicht genug Slots daf\u00FCr!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] ITEMBUY : ".concat(itemid.toUpperCase(), " : MAXSLOTS"));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[1].setStyle(2);
return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: ctx.interaction.user.id,
amount: cost,
type: 'negative'
}, reciever: {
id: "".concat(amount, "x ").concat(itemid.toUpperCase()),
amount: cost,
type: 'positive'
}
})];
case 9:
transaction = _c.sent();
message = void 0;
if (amount === 1) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
.setDescription("\n\t\t\t\t\t\t\u00BB You successfully bought a **".concat(name, "** for **$").concat(cost, "**!\n\t\t\t\t\t\t\n\t\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
.setDescription("\n\t\t\t\t\t\t\t\u00BB Du hast erfolgreich eine **".concat(name, "** f\u00FCr **").concat(cost, "\u20AC** gekauft!\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
.setDescription("\n\t\t\t\t\t\t\u00BB You successfully bought **".concat(amount, "x** **").concat(name, "** for **$").concat(cost, "**!\n\t\t\t\t\t\t\n\t\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
.setDescription("\n\t\t\t\t\t\t\t\u00BB Du hast erfolgreich **".concat(amount, "x** **").concat(name, "** f\u00FCr **").concat(cost, "\u20AC** gekauft!\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
if (!dopay) return [3, 11];
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-OWNER')];
case 10:
businessowner = _c.sent();
if (itemid === 'nbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 250);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 250);
}
if (itemid === 'mbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 750);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 750);
}
if (itemid === 'hbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 2500);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 2500);
}
if (itemid === 'cbomb') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 7500);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-1-EARNING', cost - 7500);
}
_c.label = 11;
case 11:
ctx.bot.items.add(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, amount);
ctx.log(false, "[BTN] ITEMBUY : ".concat(amount, "x : ").concat(itemid.toUpperCase(), " : CONFIRM"));
return [2, ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })];
case 12:
if (type === 'sell') {
}
_c.label = 13;
case 13: return [2];
}
});
});
}
};
//# sourceMappingURL=yes.js.map