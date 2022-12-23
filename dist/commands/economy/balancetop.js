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
var __values = (this && this.__values) || function(o) {
var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
if (m) return m.call(o);
if (o && typeof o.length === "number") return {
next: function () {
if (o && i >= o.length) o = void 0;
return { value: o && o[i++], done: !o };
}
};
throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('balancetop')
.setDMPermission(false)
.setDescription('SEE THE TOP BALANCE')
.setDescriptionLocalizations({
de: 'SEHE DEN KONTOSTAND'
})
.addStringOption(function (option) {
return option.setName('list')
.setNameLocalizations({
de: 'liste'
})
.setDescription('THE LIST')
.setDescriptionLocalizations({
de: 'DIE LISTE'
})
.setRequired(true)
.addChoices({ name: '🌍 GLOBAL', value: 'global' }, { name: '🏘️ SERVER', value: 'server' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var listtype, embedDesc, count, rawvalues, _a, _b, element, skip, userinfo, formattedcount, e_1_1, rawvalues, _c, _d, element, formattedcount, message;
var e_1, _e, e_2, _f;
return __generator(this, function (_g) {
switch (_g.label) {
case 0:
listtype = ctx.getOption('list');
return [4, ctx.interaction.deferReply()];
case 1:
_g.sent();
embedDesc = '';
count = 0;
if (!(listtype === 'global')) return [3, 11];
return [4, ctx.db.query("select * from usermoney order by money DESC")];
case 2:
rawvalues = _g.sent();
_g.label = 3;
case 3:
_g.trys.push([3, 8, 9, 10]);
_a = __values(rawvalues.rows), _b = _a.next();
_g.label = 4;
case 4:
if (!!_b.done) return [3, 7];
element = _b.value;
if (count >= 10)
return [3, 7];
skip = false;
return [4, ctx.bot.userdb.get(element.userid)];
case 5:
userinfo = _g.sent();
if (!skip) {
count++;
formattedcount = count.toString();
if (count < 10)
formattedcount = '0' + count;
if (element.userid !== ctx.interaction.user.id)
embedDesc += "`".concat(formattedcount, ".` \u00BB ").concat(userinfo.username, "#").concat(userinfo.usertag, " (**").concat(element.money, "\u20AC**)\n");
else
embedDesc += "**`".concat(formattedcount, ".`** \u00BB ").concat(userinfo.username, "#").concat(userinfo.usertag, " (**").concat(element.money, "\u20AC**)\n");
}
_g.label = 6;
case 6:
_b = _a.next();
return [3, 4];
case 7: return [3, 10];
case 8:
e_1_1 = _g.sent();
e_1 = { error: e_1_1 };
return [3, 10];
case 9:
try {
if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
}
finally { if (e_1) throw e_1.error; }
return [7];
case 10: return [3, 13];
case 11: return [4, ctx.db.query("select * from usermoney where $1 = any(guilds) order by money DESC limit 10", [ctx.interaction.guild.id])];
case 12:
rawvalues = _g.sent();
try {
for (_c = __values(rawvalues.rows), _d = _c.next(); !_d.done; _d = _c.next()) {
element = _d.value;
count++;
formattedcount = count.toString();
if (count < 10)
formattedcount = '0' + count;
if (element.userid !== ctx.interaction.user.id)
embedDesc += "`".concat(formattedcount, ".` \u00BB <@").concat(element.userid, "> (**").concat(element.money, "\u20AC**)\n");
else
embedDesc += "**`".concat(formattedcount, ".`** \u00BB <@").concat(element.userid, "> (**").concat(element.money, "\u20AC**)\n");
}
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
try {
if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
}
finally { if (e_2) throw e_2.error; }
}
_g.label = 13;
case 13:
;
if (embedDesc === '') {
embedDesc = 'Nothing to Display.';
if (ctx.metadata.language === 'de') {
embedDesc = 'Nichts zum Anzeigen.';
}
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » TOP BALANCES [' + listtype.toUpperCase() + ']')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE [' + listtype.toUpperCase() + ']')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BALANCETOP : ".concat(listtype.toString().toUpperCase()));
return [2, ctx.interaction.editReply({ embeds: [message] }).catch(function () { })];
}
});
});
}
};
//# sourceMappingURL=balancetop.js.map