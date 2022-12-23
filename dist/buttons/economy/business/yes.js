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
name: 'business-yes'
},
execute: function (ctx, business, userid, type) {
return __awaiter(this, void 0, void 0, function () {
var balance, businessid, cost, name, message, missing, message_1, userbusiness, name_1, message_2, transaction, message, business_1, businessid_1, cost_1, message_3, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 1:
balance = _a.sent();
if (business === 'market')
businessid = '1';
if (business === 'parking garage')
businessid = '2';
if (business === 'car dealership')
businessid = '3';
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
if (ctx.metadata.language == 'de') {
if (business === 'market')
name = 'SUPERMARKT';
if (business === 'parking garage')
name = 'PARKHAUS';
if (business === 'car dealership')
name = 'AUTOHAUS';
}
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
ctx.log(false, "[BTN] BUSINESSBUY : NOTSENDER");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
if (!(type === 'buy')) return [3, 6];
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
ctx.log(false, "[BTN] BUSINESSBUY : ".concat(name.toUpperCase(), " : NOTENOUGHMONEY : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS')];
case 2:
if (!((_a.sent()) !== 0)) return [3, 4];
return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS')];
case 3:
userbusiness = _a.sent();
if (userbusiness === 'market')
name_1 = 'MARKET';
if (userbusiness === 'parking garage')
name_1 = 'PARKING GARAGE';
if (userbusiness === 'car dealership')
name_1 = 'CAR DEALERSHIP';
if (ctx.metadata.language == 'de') {
if (userbusiness === 'market')
name_1 = 'SUPERMARKT';
if (userbusiness === 'parking garage')
name_1 = 'PARKHAUS';
if (userbusiness === 'car dealership')
name_1 = 'AUTOHAUS';
}
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You already own a **".concat(name_1, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du besitzt schon ein **".concat(name_1, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] BUSINESSBUY : ALREADYBUSINESS");
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
case 4:
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
id: "1x ".concat(business.toUpperCase()),
amount: cost,
type: 'positive'
}
})];
case 5:
transaction = _a.sent();
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER', ctx.interaction.user.id);
ctx.bot.businesses.set('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS', business);
if (business === 'market') {
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-NBOMB', '500');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-MBOMB', '1500');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-HBOMB', '5000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-1-PRICE-CBOMB', '15000');
}
if (business === 'car dealership') {
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-JEEP', '10000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-KIA', '75000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-AUDI', '180000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-TESLA', '250000');
ctx.bot.businesses.set('g-' + ctx.interaction.guild.id + '-3-PRICE-PORSCHE', '520000');
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
.setDescription("\u00BB You successfully bought a **".concat(name, "** for **$").concat(cost, "**!\n\nID: ").concat(transaction.id))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
.setDescription("\u00BB Du hast erfolgreich ein **".concat(name, "** f\u00FCr **").concat(cost, "\u20AC** gekauft!\n\nID: ").concat(transaction.id))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] BUSINESSBUY : ".concat(name, " : CONFIRM"));
return [2, ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })];
case 6:
if (!(type === 'sell')) return [3, 9];
return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS')];
case 7:
business_1 = _a.sent();
if (business_1 === 'market')
businessid_1 = '1';
if (business_1 === 'parking garage')
businessid_1 = '2';
if (business_1 === 'car dealership')
businessid_1 = '3';
if (business_1 === 'market')
cost_1 = 150000;
if (business_1 === 'parking garage')
cost_1 = 390000;
if (business_1 === 'car dealership')
cost_1 = 520000;
return [4, ctx.bot.businesses.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS', false)];
case 8:
if ((_a.sent()) === 0) {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont own a Business!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du besitzt kein Gesch\u00E4ft!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSSELL : DONTOWNBUSINESS");
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[1].setStyle(2);
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » SELL BUSINESS')
.setDescription("\u00BB You successfully sold your **".concat(name, "** for **$").concat(cost_1 / 2, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT VERKAUFEN')
.setDescription("\u00BB Du hast erfolgreich dein **".concat(name, "** f\u00FCr **").concat(cost_1 / 2, "\u20AC** verkauft!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, (cost_1 / 2));
ctx.bot.businesses.del('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-BUSINESS');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-' + businessid_1 + '-OWNER');
if (business_1 === 'market') {
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-NBOMB');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-MBOMB');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-HBOMB');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-1-PRICE-CBOMB');
}
if (business_1 === 'car dealership') {
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-JEEP');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-KIA');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-AUDI');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-TESLA');
ctx.bot.businesses.del('g-' + ctx.interaction.guild.id + '-3-PRICE-PORSCHE');
}
ctx.log(false, "[BTN] BUSINESSSELL : ".concat(name, " : CONFIRM"));
return [2, ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })];
case 9: return [2];
}
});
});
}
};
//# sourceMappingURL=yes.js.map