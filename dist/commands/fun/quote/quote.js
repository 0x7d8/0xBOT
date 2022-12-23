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
.setName('quote')
.setDescription('QUOTE SOMETHING')
.setDescriptionLocalizations({
de: 'ZITIERE ETWAS'
})
.setDMPermission(false)
.addStringOption(function (option) {
return option.setName('quote')
.setNameLocalizations({
de: 'zitat'
})
.setDescription('THE QUOTE')
.setDescriptionLocalizations({
de: 'DAS ZITAT'
})
.setRequired(true);
})
.addUserOption(function (option) {
return option.setName('author')
.setNameLocalizations({
de: 'autor'
})
.setDescription('THE AUTHOR')
.setDescriptionLocalizations({
de: 'DER AUTOR'
})
.setRequired(false);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var ms, message_1, quote, author, timeLeft, message_2, message, amount, amount;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('pretty-ms')];
case 1:
ms = (_a.sent()).default;
return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'quotes')];
case 2:
if (!(_a.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Quotes are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Zitate sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] QUOTE : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
quote = ctx.getOption('quote');
author = ctx.interaction.options.getUser("author");
return [4, ctx.bot.cooldown.get(ctx.interaction.user.id, 'quote')];
case 3:
if (!(_a.sent()).onCooldown) return [3, 5];
return [4, ctx.bot.cooldown.get(ctx.interaction.user.id, 'quote')];
case 4:
timeLeft = (_a.sent()).remaining;
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You still have a Cooldown of **".concat(ms(timeLeft, { secondsDecimalDigits: 0 }), "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast leider noch einen Cooldown von **".concat(ms(timeLeft, { secondsDecimalDigits: 0 }), "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] QUOTE : ONCOOLDOWN : ".concat(ms(timeLeft, { secondsDecimalDigits: 0 })));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
case 5:
if (!(!author || ctx.interaction.user.id === author.id)) return [3, 7];
return [4, ctx.bot.quotes.get(ctx.interaction.user.id)];
case 6:
amount = (_a.sent()) + 1;
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » A WISE QUOTE')
.setDescription("\u00BB \"".concat(quote, "\" ~<@").concat(ctx.interaction.user.id, ">"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + amount });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » EIN WEISES ZITAT')
.setDescription("\u00BB \"".concat(quote, "\" ~<@").concat(ctx.interaction.user.id, ">"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » ZITATE: ' + amount });
}
ctx.log(false, "[CMD] QUOTE : ".concat(quote.toUpperCase()));
return [3, 9];
case 7: return [4, ctx.bot.quotes.get(author.id)];
case 8:
amount = (_a.sent()) + 1;
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » A QUOTE')
.setDescription("\u00BB \"".concat(quote, "\" ~<@").concat(author.id, ">"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + amount });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » EIN ZITAT')
.setDescription("\u00BB \"".concat(quote, "\" ~<@").concat(author.id, ">"))
.setFooter({ text: '» ' + ctx.client.config.version + ' » ZITATE: ' + amount });
}
ctx.log(false, "[CMD] QUOTE : ".concat(quote.toUpperCase(), " : ").concat(author.id));
ctx.bot.quotes.add(author.id, 1);
_a.label = 9;
case 9:
ctx.bot.cooldown.set(ctx.interaction.user.id, 'quote', 1 * 60 * 1000);
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=quote.js.map