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
.setName('leveltop')
.setDMPermission(false)
.setDescription('SEE THE TOP LEVELS')
.setDescriptionLocalizations({
de: 'SEHE DIE TOP LEVEL'
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var embedDesc, count, rawvalues, _a, _b, element, formattedcount, cache, XP, level, levelXP, message;
var e_1, _c;
return __generator(this, function (_d) {
switch (_d.label) {
case 0: return [4, ctx.interaction.deferReply()];
case 1:
_d.sent();
embedDesc = '';
count = 0;
return [4, ctx.db.query("select * from stats where name like $1 and type = 'msg' order by value desc;", ['%' + ctx.interaction.guild.id + '-C'])];
case 2:
rawvalues = _d.sent();
try {
for (_a = __values(rawvalues.rows), _b = _a.next(); !_b.done; _b = _a.next()) {
element = _b.value;
count++;
formattedcount = count.toString();
cache = element.name.split('-');
XP = Math.round(element.value / 5);
level = 0, levelXP = XP;
while (levelXP >= 500) {
level++;
levelXP -= 500;
}
if (count < 10)
formattedcount = '0' + count;
if (cache[1] !== ctx.interaction.user.id)
embedDesc += "`".concat(formattedcount, ".` \u00BB <@").concat(cache[1], "> (**LVL ").concat(level, ", ").concat(XP, " XP**)\n");
else
embedDesc += "**`".concat(formattedcount, ".`** \u00BB <@").concat(cache[1], "> (**LVL ").concat(level, ", ").concat(XP, " XP**)\n");
}
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
try {
if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
}
finally { if (e_1) throw e_1.error; }
}
;
if (embedDesc === '') {
embedDesc = 'Nothing to Display.';
if (ctx.metadata.language === 'de') {
embedDesc = 'Nichts zum Anzeigen.';
}
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » TOP LEVELS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » TOP LEVEL')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] LEVELTOP");
return [2, ctx.interaction.editReply({ embeds: [message] }).catch(function () { })];
}
});
});
}
};
//# sourceMappingURL=leveltop.js.map