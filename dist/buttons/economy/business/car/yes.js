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
name: 'car-yes'
},
execute: function (ctx, car, userid, type) {
return __awaiter(this, void 0, void 0, function () {
var balance, carvalue, cost, dopay, _a, _b, name, message, missing, message_1, dbcar, message_2, transaction, message, businessowner, message_3, message;
return __generator(this, function (_c) {
switch (_c.label) {
case 0: return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 1:
balance = _c.sent();
if (car === 'jeep')
carvalue = 25;
if (car === 'kia')
carvalue = 50;
if (car === 'audi')
carvalue = 75;
if (car === 'tesla')
carvalue = 100;
if (car === 'porsche')
carvalue = 200;
dopay = false;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase())];
case 2:
_a = (_c.sent()) === '0';
if (_a) return [3, 4];
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase())];
case 3:
_a = (_c.sent()) === 0;
_c.label = 4;
case 4:
if (!_a) return [3, 5];
if (car === 'jeep')
cost = 15000;
if (car === 'kia')
cost = 75000;
if (car === 'audi')
cost = 150000;
if (car === 'tesla')
cost = 240000;
if (car === 'porsche')
cost = 490000;
return [3, 8];
case 5:
if (!(type === 'buy')) return [3, 7];
_b = Number;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-PRICE-' + car.toUpperCase())];
case 6:
cost = _b.apply(void 0, [_c.sent()]);
dopay = true;
return [3, 8];
case 7:
if (car === 'jeep')
cost = 15000;
if (car === 'kia')
cost = 75000;
if (car === 'audi')
cost = 150000;
if (car === 'tesla')
cost = 240000;
if (car === 'porsche')
cost = 490000;
_c.label = 8;
case 8:
if (car === 'jeep')
name = '2016 JEEP PATRIOT SPORT';
if (car === 'kia')
name = '2022 KIA SORENTO';
if (car === 'audi')
name = 'AUDI R8 COUPE V10';
if (car === 'tesla')
name = 'TESLA MODEL Y';
if (car === 'porsche')
name = '2019 PORSCHE 911 GT2RS';
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
ctx.log(false, "[BTN] CARBUY : NOTSENDER");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
if (!(type === 'buy')) return [3, 15];
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
ctx.log(false, "[BTN] CARBUY : ".concat(name.toUpperCase(), " : NOTENOUGHMONEY : ").concat(cost, "\u20AC"));
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount')];
case 9:
if (!((_c.sent()) !== 0)) return [3, 11];
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value')];
case 10:
dbcar = _c.sent();
if (dbcar == 'jeep')
name = '2016 JEEP PATRIOT SPORT';
if (dbcar == 'kia')
name = '2022 KIA SORENTO';
if (dbcar == 'audi')
name = 'AUDI R8 COUPE V10';
if (dbcar == 'tesla')
name = 'TESLA MODEL Y';
if (dbcar == 'porsche')
name = '2019 PORSCHE 911 GT2RS';
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You already own a **".concat(name, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du besitzt schon einen **".concat(name, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] CARBUY : ALREADYOWNCAR : ".concat(name));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
case 11:
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
id: "1x ".concat(car.toUpperCase()),
amount: cost,
type: 'positive'
}
})];
case 12:
transaction = _c.sent();
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
.setDescription("\n\t\t\t\t\t\u00BB You successfully bought a **".concat(name, "** for **$").concat(cost, "**!\n\t\t\t\t\t\n\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language == 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
.setDescription("\n\t\t\t\t\t\t\u00BB Du hast erfolgreich einen **".concat(name, "** f\u00FCr **").concat(cost, "\u20AC** gekauft!\n\t\t\t\t\t\t\n\t\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
if (!dopay) return [3, 14];
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-3-OWNER')];
case 13:
businessowner = _c.sent();
if (car === 'jeep') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 5000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 5000);
}
if (car === 'kia') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 50000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 50000);
}
if (car === 'audi') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 150000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 150000);
}
if (car === 'tesla') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 220000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 260000);
}
if (car === 'porsche') {
ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 400000);
ctx.bot.businesses.add('g-' + ctx.interaction.guild.id + '-3-EARNING', cost - 500000);
}
_c.label = 14;
case 14:
ctx.bot.items.set(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, car, carvalue);
ctx.log(false, "[BTN] CARBUY : ".concat(name, " : CONFIRM"));
return [2, ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })];
case 15:
if (!(type === 'sell')) return [3, 17];
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount')];
case 16:
if ((_c.sent()) === 0) {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont own a Car!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du besitzt kein Auto!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] CARSELL : DONTOWNCAR");
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[1].setStyle(2);
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
.setDescription("\u00BB You successfully sold your **".concat(name, "** for **$").concat(cost / 2, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
.setDescription("\u00BB Du hast erfolgreich deinen **".concat(name, "** f\u00FCr **").concat(cost / 2, "\u20AC** verkauft!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, (cost / 2));
ctx.bot.items.del(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id);
ctx.log(false, "[BTN] CARSELL : ".concat(name, " : CONFIRM"));
return [2, ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })];
case 17: return [2];
}
});
});
}
};
//# sourceMappingURL=yes.js.map