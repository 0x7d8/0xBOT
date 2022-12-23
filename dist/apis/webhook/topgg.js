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
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rjweb_server_1 = __importDefault(require("rjweb-server"));
var discord_js_1 = require("discord.js");
module.exports = {
type: rjweb_server_1.default.types.post,
path: '/webhook/topgg',
code: function (ctr) {
return __awaiter(this, void 0, void 0, function () {
var random, extra, message, messageBonus, _a, _b, _c, _d, _e, _f;
return __generator(this, function (_g) {
switch (_g.label) {
case 0:
if (ctr.header.get('authorization') !== ctr.config.web.keys.topgg.webkey)
return [2, ctr.print({ "success": false, "message": 'WRONG AUTHORIZATION' })];
if (!ctr.reqBody.user)
return [2];
random = ctr.bot.random(7500, 15000);
return [4, ctr.bot.votes.get(ctr.reqBody.user + '-A')];
case 1:
if (!(((_g.sent()) + 1) % 10 === 0)) return [3, 3];
return [4, ctr.bot.votes.get(ctr.reqBody.user + '-A')];
case 2:
extra = (((_g.sent()) + 1) * 10000) / 2;
_g.label = 3;
case 3:
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)\n» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
.setFooter({ text: '» ' + ctr.config.version });
return [4, ctr.bot.language.get(ctr.reqBody.user)];
case 4:
if ((_g.sent()) === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription('» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
.setFooter({ text: '» ' + ctr.config.version });
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription('» Thanks for Voting! You got **$' + random + '** from me :)')
.setFooter({ text: '» ' + ctr.config.version });
}
;
_b = (_a = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING'))
.setDescription;
_c = '» Thanks for Voting **';
return [4, ctr.bot.votes.get(ctr.reqBody.user + '-A')];
case 5:
messageBonus = _b.apply(_a, [_c + ((_g.sent()) + 1) + '** times!\nAs A Gift I give you extra **$' + extra + '**!'])
.setFooter({ text: '» ' + ctr.config.version });
return [4, ctr.bot.language.get(ctr.reqBody.user)];
case 6:
if (!((_g.sent()) === 'de')) return [3, 8];
_e = (_d = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING'))
.setDescription;
_f = '» Danke, dass du **';
return [4, ctr.bot.votes.get(ctr.reqBody.user + '-A')];
case 7:
messageBonus = _e.apply(_d, [_f + ((_g.sent()) + 1) + '** mal gevotet hast!\nAls Geschenk gebe ich dir extra **' + extra + '€**!'])
.setFooter({ text: '» ' + ctr.config.version });
_g.label = 8;
case 8: return [4, ctr.bot.money.add(false, ctr.reqBody.user, random)];
case 9:
_g.sent();
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [WEB] VOTED : ' + ctr.reqBody.user + ' : ' + random + '€ : TOPGG');
ctr.client.users.send(ctr.reqBody.user, { embeds: [message] });
return [4, ctr.bot.votes.get(ctr.reqBody.user + '-A')];
case 10:
if (((_g.sent()) + 1) % 10 === 0) {
ctr.bot.money.add(false, ctr.reqBody.user, extra);
ctr.client.users.send(ctr.reqBody.user, { embeds: [messageBonus] });
}
;
ctr.bot.votes.add(ctr.reqBody.user + '-A', 1);
ctr.bot.votes.set(ctr.reqBody.user + '-T', Date.now());
return [2, ctr.print({ "success": true, "message": 'VOTE RECIEVED' })];
}
});
});
}
};
//# sourceMappingURL=topgg.js.map