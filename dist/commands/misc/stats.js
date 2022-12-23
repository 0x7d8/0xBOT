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
.setName('stats')
.setDMPermission(false)
.setDescription('SEE STATS')
.setDescriptionLocalizations({
de: 'SEHE STATISTIKEN'
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var totalcmd, guildcmd, usercmd, totalbtn, guildbtn, userbtn, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.stat.get('t-all', 'cmd')];
case 1:
totalcmd = _a.sent();
return [4, ctx.bot.stat.get('g-' + ctx.interaction.guild.id, 'cmd')];
case 2:
guildcmd = _a.sent();
return [4, ctx.bot.stat.get('u-' + ctx.interaction.user.id, 'cmd')];
case 3:
usercmd = _a.sent();
return [4, ctx.bot.stat.get('t-all', 'btn')];
case 4:
totalbtn = _a.sent();
return [4, ctx.bot.stat.get('g-' + ctx.interaction.guild.id, 'btn')];
case 5:
guildbtn = _a.sent();
return [4, ctx.bot.stat.get('u-' + ctx.interaction.user.id, 'btn')];
case 6:
userbtn = _a.sent();
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » BOT STATISTICS')
.setDescription("\n\t\t\t\t\t**\u00BB\u00BB COMMAND STATS**\n\t\t\t\t\t\u00BB GLOBAL\n\t\t\t\t\t`".concat(totalcmd, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB THIS SERVER\n\t\t\t\t\t`").concat(guildcmd, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB YOU IN TOTAL\n\t\t\t\t\t`").concat(usercmd, "`\n\t\t\t\t\t\n\t\t\t\t\t**\u00BB\u00BB BUTTON STATS**\n\t\t\t\t\t\u00BB GLOBAL\n\t\t\t\t\t`").concat(totalbtn, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB THIS SERVER\n\t\t\t\t\t`").concat(guildbtn, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB YOU IN TOTAL\n\t\t\t\t\t`").concat(userbtn, "`\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » BOT STATISTIKEN')
.setDescription("\n\t\t\t\t\t**\u00BB\u00BB BEFEHL STATS**\n\t\t\t\t\t\u00BB GLOBAL\n\t\t\t\t\t`".concat(totalcmd, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB DIESER SERVER\n\t\t\t\t\t`").concat(guildcmd, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB DU INSGESAMT\n\t\t\t\t\t`").concat(usercmd, "`\n\t\t\t\t\t\n\t\t\t\t\t**\u00BB\u00BB BUTTON STATS**\n\t\t\t\t\t\u00BB GLOBAL\n\t\t\t\t\t`").concat(totalbtn, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB DIESER SERVER\n\t\t\t\t\t`").concat(guildbtn, "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB DU INSGESAMT\n\t\t\t\t\t`").concat(userbtn, "`\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] STATS");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
});
});
}
};
//# sourceMappingURL=stats.js.map