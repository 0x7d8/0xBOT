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
.setName('stocks')
.setDMPermission(false)
.setDescription('SEE STOCKS')
.setDescriptionLocalizations({
de: 'SEHE AKTIEN'
})
.addUserOption(function (option) {
return option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(false);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, user, userobj, green, greenMax, blue, blueMax, yellow, yellowMax, red, redMax, white, whiteMax, black, blackMax, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'stocks')];
case 1:
if (!(_a.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Stocks are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Aktien sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STOCKS : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
user = ctx.interaction.options.getUser("user");
if (!user)
userobj = ctx.interaction.user;
else
userobj = user;
return [4, ctx.bot.stocks.get(userobj.id, 'green', 'used')];
case 2:
green = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'green', 'max')];
case 3:
greenMax = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'blue', 'used')];
case 4:
blue = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'blue', 'max')];
case 5:
blueMax = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'yellow', 'used')];
case 6:
yellow = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'yellow', 'max')];
case 7:
yellowMax = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'red', 'used')];
case 8:
red = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'red', 'max')];
case 9:
redMax = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'white', 'used')];
case 10:
white = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'white', 'max')];
case 11:
whiteMax = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'black', 'used')];
case 12:
black = _a.sent();
return [4, ctx.bot.stocks.get(userobj.id, 'black', 'max')];
case 13:
blackMax = _a.sent();
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » YOUR STOCKS')
.setDescription("\n\t\t\t\t\t\u00BB \uD83D\uDFE2 GREEN STOCKS\n\t\t\t\t\t`".concat(green, "/").concat(greenMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \uD83D\uDD35 BLUE STOCKS\n\t\t\t\t\t`").concat(blue, "/").concat(blueMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \uD83D\uDFE1 YELLOW STOCKS\n\t\t\t\t\t`").concat(yellow, "/").concat(yellowMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \uD83D\uDD34 RED STOCKS\n\t\t\t\t\t`").concat(red, "/").concat(redMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \u26AA WHITE STOCKS\n\t\t\t\t\t`").concat(white, "/").concat(whiteMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \u26AB BLACK STOCKS\n\t\t\t\t\t`").concat(black, "/").concat(blackMax, "`\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DEINE AKTIEN')
.setDescription("\n\t\t\t\t\t\t\u00BB \uD83D\uDFE2 GR\u00DCNE AKTIEN\n\t\t\t\t\t\t`".concat(green, "/").concat(greenMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \uD83D\uDD35 BLAUE AKTIEN\n\t\t\t\t\t\t`").concat(blue, "/").concat(blueMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \uD83D\uDFE1 GELBE AKTIEN\n\t\t\t\t\t\t`").concat(yellow, "/").concat(yellowMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \uD83D\uDD34 ROTE AKTIEN\n\t\t\t\t\t\t`").concat(red, "/").concat(redMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \u26AA WEISSE AKTIEN\n\t\t\t\t\t\t`").concat(white, "/").concat(whiteMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \u26AB SCHWARZE AKTIEN\n\t\t\t\t\t\t`").concat(black, "/").concat(blackMax, "`\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » THE STOCKS OF ' + user.username.toUpperCase())
.setDescription("\n\t\t\t\t\t\u00BB \uD83D\uDFE2 GREEN STOCKS\n\t\t\t\t\t`".concat(green, "/").concat(greenMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \uD83D\uDD35 BLUE STOCKS\n\t\t\t\t\t`").concat(blue, "/").concat(blueMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \uD83D\uDFE1 YELLOW STOCKS\n\t\t\t\t\t`").concat(yellow, "/").concat(yellowMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \uD83D\uDD34 RED STOCKS\n\t\t\t\t\t`").concat(red, "/").concat(redMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \u26AA WHITE STOCKS\n\t\t\t\t\t`").concat(white, "/").concat(whiteMax, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB \u26AB BLACK STOCKS\n\t\t\t\t\t`").concat(black, "/").concat(blackMax, "`\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CHART:1024398298204876941> » DIE AKTIEN VON ' + user.username.toUpperCase())
.setDescription("\n\t\t\t\t\t\t\u00BB \uD83D\uDFE2 GR\u00DCNE AKTIEN\n\t\t\t\t\t\t`".concat(green, "/").concat(greenMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \uD83D\uDD35 BLAUE AKTIEN\n\t\t\t\t\t\t`").concat(blue, "/").concat(blueMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \uD83D\uDFE1 GELBE AKTIEN\n\t\t\t\t\t\t`").concat(yellow, "/").concat(yellowMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \uD83D\uDD34 ROTE AKTIEN\n\t\t\t\t\t\t`").concat(red, "/").concat(redMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \u26AA WEISSE AKTIEN\n\t\t\t\t\t\t`").concat(white, "/").concat(whiteMax, "`\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB \u26AB SCHWARZE AKTIEN\n\t\t\t\t\t\t`").concat(black, "/").concat(blackMax, "`\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, "[CMD] STOCKS : ".concat(green, " : ").concat(blue, " : ").concat(yellow, " : ").concat(red, " : ").concat(white, " : ").concat(black));
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=stocks.js.map