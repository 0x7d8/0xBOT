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
.setName('work')
.setDMPermission(false)
.setDescription('WORK FOR MONEY')
.setDescriptionLocalizations({
de: 'ARBEITE FÜR GELD'
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var ms, message, random, timeLeft, message, job, result, carboost, carboostam, car, extra, resultcar, transaction, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('pretty-ms')];
case 1:
ms = (_a.sent()).default;
return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'work')];
case 2:
if (!(_a.sent())) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB The **`/work`** Command is disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Der **`/work`** Befehl ist auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] WORK : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
random = ctx.bot.random(1, 4);
return [4, ctx.bot.cooldown.get(ctx.interaction.user.id, 'work')];
case 3:
if (!(_a.sent()).onCooldown) return [3, 5];
return [4, ctx.bot.cooldown.get(ctx.interaction.user.id, 'work')];
case 4:
timeLeft = (_a.sent()).remaining;
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You still have a Cooldown of **".concat(ms(timeLeft, { secondsDecimalDigits: 0 }), "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast leider noch einen Cooldown von **".concat(ms(timeLeft, { secondsDecimalDigits: 0 }), "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] WORK : ONCOOLDOWN : ".concat(ms(timeLeft, { secondsDecimalDigits: 0 })));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
case 5:
job = void 0, result = void 0;
if (random === 1)
job = 'PROGRAMMER';
result = ctx.bot.random(75, 200);
if (random === 2)
job = 'CLEANER';
result = ctx.bot.random(50, 100);
if (random === 3)
job = 'MCDONALDS WORKER';
result = ctx.bot.random(30, 120);
if (random === 4)
job = 'PAINTER';
result = ctx.bot.random(200, 500);
if (ctx.metadata.language === 'de') {
if (random === 1)
job = 'PROGRAMMIERER';
if (random === 2)
job = 'HAUSMEISTER';
if (random === 3)
job = 'MCDONALDS KASSIERER';
if (random === 4)
job = 'KÜNSTLER';
}
carboost = false;
carboostam = void 0;
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value')];
case 6:
car = _a.sent();
if (!(car !== 0)) return [3, 8];
carboost = true;
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount')];
case 7:
carboostam = _a.sent();
_a.label = 8;
case 8:
extra = void 0;
if (!carboost) {
if (result < 40)
extra = 'MEH.';
if (result >= 40)
extra = 'NICE.';
if (result >= 60)
extra = 'GREAT.';
if (result >= 80)
extra = 'WONDERFUL!';
if (result >= 100)
extra = 'WOW!';
if (ctx.metadata.language === 'de') {
if (result < 40)
extra = 'MEH.';
if (result >= 40)
extra = 'NICE.';
if (result >= 60)
extra = 'PRIMA.';
if (result >= 80)
extra = 'TOLL!';
if (result >= 100)
extra = 'WOW!';
}
}
else {
if (result < 40)
extra = 'MEH.\n**+' + carboostam + '%** thanks to your Car!';
if (result >= 40)
extra = 'NICE.\n**+' + carboostam + '%** thanks to your Car!';
if (result >= 60)
extra = 'GREAT.\n**+' + carboostam + '%** thanks to your Car!';
if (result >= 80)
extra = 'WONDERFUL!\n**+' + carboostam + '%** thanks to your Car!';
if (result >= 100)
extra = 'WOW!\n**+' + carboostam + '%** thanks to your Car!';
if (ctx.metadata.language === 'de') {
if (result < 40)
extra = 'MEH.\n**+' + carboostam + '%** wegen deinem Auto!';
if (result >= 40)
extra = 'NICE.\n**+' + carboostam + '%** wegen deinem Auto!';
if (result >= 60)
extra = 'PRIMA.\n**+' + carboostam + '%** wegen deinem Auto!';
if (result >= 80)
extra = 'TOLL!\n**+' + carboostam + '%** wegen deinem Auto!';
if (result >= 100)
extra = 'WOW!\n**+' + carboostam + '%** wegen deinem Auto!';
}
}
resultcar = void 0;
if (!carboost)
resultcar = result;
else
resultcar = Math.round(ctx.bot.perAdd(result, carboostam));
return [4, ctx.bot.transactions.log({
success: true,
sender: {
id: 'WORK',
amount: resultcar,
type: 'negative'
}, reciever: {
id: ctx.interaction.user.id,
amount: resultcar,
type: 'positive'
}
})];
case 9:
transaction = _a.sent();
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:HAMMER:1024388163747184662> » WORK')
.setDescription("\n\t\t\t\t\t\u00BB You work as **".concat(job, "** and earn **$").concat(resultcar, "**! ").concat(extra, "\n\n\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:HAMMER:1024388163747184662> » ARBEIT')
.setDescription("\n\t\t\t\t\t\t\u00BB Du arbeitest als **".concat(job, "** und verdienst **").concat(resultcar, "\u20AC**! ").concat(extra, "\n\n\t\t\t\t\t\tID: ").concat(transaction.id, "\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, resultcar);
ctx.log(false, "[CMD] WORK : ".concat(resultcar, "\u20AC"));
ctx.bot.cooldown.set(ctx.interaction.user.id, 'work', 60 * 45 * 1000);
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=work.js.map