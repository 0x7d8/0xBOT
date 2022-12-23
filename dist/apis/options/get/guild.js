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
module.exports = {
type: rjweb_server_1.default.types.get,
path: '/options/guild',
code: function (ctr) {
return __awaiter(this, void 0, void 0, function () {
var response, guildlang, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
var _m, _o;
return __generator(this, function (_p) {
switch (_p.label) {
case 0:
if (!ctr.query.has('id'))
return [2, ctr.print({ "success": false, "message": 'NO ID' })];
if (!ctr.query.has('page'))
return [2, ctr.print({ "success": false, "message": 'NO PAGE' })];
return [4, ctr.api.checkSession(ctr.header.get('accesstoken'), ctr.header.get('tokentype'), ctr.header.get('userid'), ctr.query.get('id'))];
case 1:
if (!(_p.sent()))
return [2, ctr.print({ "success": false, "message": 'PERMISSION DENIED' })];
response = { "success": false, "message": "NOT FOUND" };
if (!(ctr.query.get('page') === 'GENERAL')) return [3, 3];
guildlang = 'ENGLISH';
return [4, ctr.bot.language.get(ctr.query.get('id'))];
case 2:
if ((_p.sent()) === 'de') {
guildlang = 'GERMAN';
}
response = {
"success": true,
"language": guildlang
};
_p.label = 3;
case 3:
if (!(ctr.query.get('page') === 'ECONOMY')) return [3, 12];
_m = {
"success": true
};
_a = "businesses";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'businesses')];
case 4:
_m[_a] = _p.sent();
_b = "items";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'items')];
case 5:
_m[_b] = _p.sent();
_c = "cars";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'cars')];
case 6:
_m[_c] = _p.sent();
_d = "stocks";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'stocks')];
case 7:
_m[_d] = _p.sent();
_e = "luckgames";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'luckgames')];
case 8:
_m[_e] = _p.sent();
_f = "daily";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'daily')];
case 9:
_m[_f] = _p.sent();
_g = "work";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'work')];
case 10:
_m[_g] = _p.sent();
_h = "rob";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'rob')];
case 11:
response = (_m[_h] = _p.sent(),
_m);
_p.label = 12;
case 12:
if (!(ctr.query.get('page') === 'FUN')) return [3, 16];
_o = {
"success": true
};
_j = "levels";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'levels')];
case 13:
_o[_j] = _p.sent();
_k = "quotes";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'quotes')];
case 14:
_o[_k] = _p.sent();
_l = "meme";
return [4, ctr.bot.settings.get(ctr.query.get('id'), 'meme')];
case 15:
response = (_o[_l] = _p.sent(),
_o);
_p.label = 16;
case 16: return [2, ctr.print(response)];
}
});
});
}
};
//# sourceMappingURL=guild.js.map