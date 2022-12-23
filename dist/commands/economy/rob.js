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
.setName('rob')
.setDescription('ROB SOMEONE')
.setDescriptionLocalizations({
de: 'RAUBE JEMANDEN AUS'
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
.addStringOption(function (option) {
return option.setName('money')
.setNameLocalizations({
de: 'geld'
})
.setDescription('THE MONEY')
.setDescriptionLocalizations({
de: 'DAS GELD'
})
.setRequired(true)
.addChoices({ name: '💸 [35%] 10€ - 20€', value: '35' }, { name: '🤑 [20%] 30€ - 50€', value: '20' }, { name: '💰 [05%] 60€ - 100€', value: '5' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var ms, message, user, money, moneysnd, moneytar, timeLeft, message, message, message, need, notenoughmoney1, notenoughmoney2, random35, random20, random05, status, amount, punishment, extra, success, failure;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('pretty-ms')];
case 1:
ms = (_a.sent()).default;
return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'rob')];
case 2:
if (!(_a.sent())) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB The **`/rob`** Command is disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Der **`/rob`** Befehl ist auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ROB : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
user = ctx.interaction.options.getUser("user");
money = ctx.getOption('money');
return [4, ctx.bot.money.get(ctx.interaction.user.id)];
case 3:
moneysnd = _a.sent();
return [4, ctx.bot.money.get(user.id)];
case 4:
moneytar = _a.sent();
return [4, ctx.bot.cooldown.get(ctx.interaction.user.id, 'rob')];
case 5:
if (!(_a.sent()).onCooldown) return [3, 7];
return [4, ctx.bot.cooldown.get(ctx.interaction.user.id, 'rob')];
case 6:
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
ctx.log(false, "[CMD] ROB : ONCOOLDOWN : ".concat(ms(timeLeft, { secondsDecimalDigits: 0 })));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
case 7:
if (ctx.interaction.user.id === user.id) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant rob yourself?!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst dich nicht selber ausrauben?!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : ").concat(money, "\u20AC : SAMEPERSON"));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
if (user.bot) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant rob a Bot!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst einem Bot kein Geld klauen!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ROB : ".concat(user, " : BOT"));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
if (money === '35')
need = 20;
if (money === '20')
need = 50;
if (money === '5')
need = 100;
notenoughmoney1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough Money for that, you need atleast **$".concat(need, "**! BRUH."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
notenoughmoney1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast nicht genug Geld daf\u00FCr, du brauchst mindestens **".concat(need, "\u20AC**! BRUH."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
if (money === '35' && moneysnd < 20) {
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })];
}
;
if (money === '20' && moneysnd < 50) {
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })];
}
;
if (money === '5' && moneysnd < 100) {
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })];
}
notenoughmoney2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(user, "> doesnt have enough Money for that, he needs atleast **$").concat(need, "**! LOL."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
notenoughmoney2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB <@".concat(user, "> hat nicht genug Geld daf\u00FCr, er braucht mindestens **").concat(need, "\u20AC**! LOL."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
if (money === '35' && moneytar < 20) {
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })];
}
;
if (money === '20' && moneytar < 50) {
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })];
}
;
if (money === '5' && moneytar < 100) {
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : NOTENOUGHMONEY"));
return [2, ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })];
}
random35 = ctx.bot.random(1, 3);
random20 = ctx.bot.random(1, 5);
random05 = ctx.bot.random(1, 20);
if (money === '35') {
if (random35 == 1) {
status = true;
amount = ctx.bot.random(10, 20);
}
else {
status = false;
amount = ctx.bot.random(10, 20);
}
}
else if (money === '20') {
if (random20 == 1) {
status = true;
amount = ctx.bot.random(30, 50);
}
else {
status = false;
amount = ctx.bot.random(30, 50);
}
}
else {
if (random05 == 1) {
status = true;
amount = ctx.bot.random(50, 100);
}
else {
status = false;
amount = ctx.bot.random(50, 100);
}
}
if (moneysnd > need * 2)
punishment = amount * 2;
else
punishment = amount;
if (amount < 20)
extra = 'MEH.';
if (amount >= 20)
extra = 'NICE.';
if (amount >= 40)
extra = 'WONDERFUL.';
if (amount >= 60)
extra = 'LOL.';
if (amount >= 80)
extra = 'A PRO??!!';
if (ctx.metadata.language === 'de') {
if (amount < 20)
extra = 'NAJA.';
if (amount >= 20)
extra = 'NICE.';
if (amount >= 40)
extra = 'PRIMA.';
if (amount >= 60)
extra = 'LOL.';
if (amount >= 80)
extra = 'EIN PRO??!!';
}
success = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
.setDescription("\u00BB You stole <@".concat(user.id, "> **$").concat(amount, "**! ").concat(extra))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
failure = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
.setDescription("\u00BB You wanted to steal <@".concat(user.id, "> **$").concat(amount, "**, but the Police caught you! You had to pay **$").concat(punishment, "**! KEKW."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
success = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
.setDescription("\u00BB Du hast <@".concat(user.id, "> **").concat(amount, "\u20AC** geklaut! ").concat(extra))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
failure = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
.setDescription("\u00BB Du wolltest <@".concat(user.id, "> **").concat(amount, "\u20AC** klauen, aber die Polizei hat dich erwischt! Du musstest **").concat(punishment, "\u20AC** Strafgeld bezahlen! KEKW."))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
if (!status) {
ctx.bot.cooldown.set(ctx.interaction.user.id, 'rob', 1 * 60 * 1000);
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : ").concat(amount, "\u20AC : FAILURE : ").concat(punishment, "\u20AC"));
ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, punishment);
return [2, ctx.interaction.reply({ embeds: [failure] })];
}
ctx.bot.cooldown.set(ctx.interaction.user.id, 'rob', 1 * 60 * 1000);
ctx.bot.money.rem(ctx.interaction.guild.id, user.id, amount);
ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
ctx.log(false, "[CMD] ROB : ".concat(user.id, " : ").concat(amount, "\u20AC : SUCCESS"));
return [2, ctx.interaction.reply({ embeds: [success] })];
}
});
});
}
};
//# sourceMappingURL=rob.js.map