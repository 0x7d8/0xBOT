"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
var desc = Object.getOwnPropertyDescriptor(m, k);
if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
  desc = { enumerable: true, get: function() { return m[k]; } };
}
Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
if (mod && mod.__esModule) return mod;
var result = {};
if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
__setModuleDefault(result, mod);
return result;
};
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
var discord_js_1 = require("discord.js");
var promises_1 = require("timers/promises");
var _config_1 = __importDefault(require("@config"));
var pg_1 = __importDefault(require("pg"));
var db = new pg_1.default.Pool({
host: _config_1.default.database.oxbot.host,
database: _config_1.default.database.oxbot.database,
user: _config_1.default.database.oxbot.username,
password: _config_1.default.database.oxbot.password,
port: 5432,
ssl: true
});
var git_commit_count_1 = __importDefault(require("git-commit-count"));
var bot = __importStar(require("@functions/bot.js"));
exports.default = {
name: 'START BOT',
event: discord_js_1.Events.ClientReady,
once: true,
execute: function (client, timed) {
var _a, _b, _c, _d, _e, _f;
return __awaiter(this, void 0, void 0, function () {
var axios, _loop_1;
return __generator(this, function (_g) {
switch (_g.label) {
case 0: return [4, import("axios")];
case 1:
axios = (_g.sent()).default;
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] STARTED AND LOGGED IN AS ").concat((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag, " (").concat(timed, "ms)"));
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [END] $$$$$ LOADED 0xBOT ").concat(_config_1.default.version));
console.log(' ');
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [STA] $$$$$ STARTED LOGGING OF COMMANDS AND ERRORS"));
console.log(' ');
_loop_1 = function () {
var commits, _h, _j, _k, _l, _m, _o, rawvalues, total, req, res;
return __generator(this, function (_p) {
switch (_p.label) {
case 0:
(_b = client.user) === null || _b === void 0 ? void 0 : _b.setActivity(client.guilds.cache.size + ' Servers', { type: discord_js_1.ActivityType.Watching });
return [4, (0, promises_1.setTimeout)(20000)];
case 1:
_p.sent();
return [4, (0, git_commit_count_1.default)()];
case 2:
commits = _p.sent();
(_c = client.user) === null || _c === void 0 ? void 0 : _c.setActivity(commits + ' Commits', { type: discord_js_1.ActivityType.Watching });
return [4, (0, promises_1.setTimeout)(20000)];
case 3:
_p.sent();
if (!((_d = client.user) === null || _d === void 0)) return [3, 4];
_h = void 0;
return [3, 6];
case 4:
_k = (_j = _d).setActivity;
return [4, bot.stat.get('t-all', 'cmd')];
case 5:
_h = _k.apply(_j, [(_p.sent()) + ' Commands Used', { type: discord_js_1.ActivityType.Watching }]);
_p.label = 6;
case 6:
_h;
return [4, (0, promises_1.setTimeout)(10000)];
case 7:
_p.sent();
if (!((_e = client.user) === null || _e === void 0)) return [3, 8];
_l = void 0;
return [3, 10];
case 8:
_o = (_m = _e).setActivity;
return [4, bot.stat.get('t-all', 'btn')];
case 9:
_l = _o.apply(_m, [(_p.sent()) + ' Buttons Clicked', { type: discord_js_1.ActivityType.Watching }]);
_p.label = 10;
case 10:
_l;
return [4, (0, promises_1.setTimeout)(20000)];
case 11:
_p.sent();
return [4, db.query("select * from usermoney;")];
case 12:
rawvalues = _p.sent();
total = 0;
rawvalues.rows.forEach(function (user) { return total += Number(user.money); });
(_f = client.user) === null || _f === void 0 ? void 0 : _f.setActivity('$' + total + ' in Circulation', { type: discord_js_1.ActivityType.Watching });
return [4, (0, promises_1.setTimeout)(20000)];
case 13:
_p.sent();
return [4, axios({
method: 'GET',
url: 'https://status.0xbot.de/api/status-page/heartbeat/all',
validateStatus: false,
headers: {}
})];
case 14:
req = _p.sent();
res = req.data;
client.user.setActivity(Math.round((res.uptimeList['1_24'] * 100) * 100) / 100 + '% Bot Uptime', { type: discord_js_1.ActivityType.Watching });
return [4, (0, promises_1.setTimeout)(20000)];
case 15:
_p.sent();
return [2];
}
});
};
_g.label = 2;
case 2:
if (!!+[]) return [3, 4];
return [5, _loop_1()];
case 3:
_g.sent();
return [3, 2];
case 4: return [2];
}
});
});
}
};
//# sourceMappingURL=ready.js.map