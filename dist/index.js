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
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAlias('@interfaces', __dirname + '/interfaces');
module_alias_1.default.addAlias('@functions', __dirname + '/functions');
module_alias_1.default.addAlias('@utils', __dirname + '/utils');
module_alias_1.default.addAlias('@config', __dirname + '/config.json');
var cron = __importStar(require("node-cron"));
var bot_js_1 = require("./bot.js");
var pg_1 = __importDefault(require("pg"));
var getAllFiles_js_1 = require("@utils/getAllFiles.js");
var _config_1 = __importDefault(require("@config"));
var rjweb_server_1 = __importDefault(require("rjweb-server"));
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({ intents: [
discord_js_1.GatewayIntentBits.Guilds
] });
client.login(_config_1.default.client.token);
var bot = __importStar(require("@functions/bot.js"));
var stdin = process.openStdin();
stdin.addListener("data", function (input) { return __awaiter(void 0, void 0, void 0, function () {
var args, _a, _b, e_1;
return __generator(this, function (_c) {
switch (_c.label) {
case 0:
args = input.toString().trim().split(' ');
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] RECIEVED COMMAND [' + input.toString().trim().toUpperCase() + ']');
if (args[0].toUpperCase() === 'ADDBAL') {
if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] ADDED ' + args[2] + '€ TO ' + args[1]);
bot.money.add(false, args[1].toString(), Number(args[2]));
}
else {
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: ADDBAL [USERID] [AMOUNT]');
}
}
if (args[0].toUpperCase() === 'REMBAL') {
if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] REMOVED ' + args[2] + '€ FROM ' + args[1]);
bot.money.rem(false, args[1].toString(), Number(args[2]));
}
else {
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: REMBAL [USERID] [AMOUNT]');
}
}
if (args[0].toUpperCase() === 'SETBAL') {
if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] SET BALANCE OF ' + args[1] + ' TO ' + args[2] + '€');
bot.money.set(false, args[1].toString(), Number(args[2]));
}
else {
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: SETBAL [USERID] [AMOUNT]');
}
}
if (!(args[0].toUpperCase() === 'EVAL')) return [3, 6];
if (!(typeof args[1] !== 'undefined')) return [3, 5];
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] RESULT OF EVAL:');
args.shift();
_c.label = 1;
case 1:
_c.trys.push([1, 3, , 4]);
_b = (_a = console).log;
return [4, eval(args.join(' '))];
case 2:
_b.apply(_a, [_c.sent()]);
return [3, 4];
case 3:
e_1 = _c.sent();
console.log(e_1);
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] EVAL RETURNED AN ERROR');
return [3, 4];
case 4: return [3, 6];
case 5:
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: EVAL [COMMAND]');
_c.label = 6;
case 6: return [2];
}
});
}); });
{
(function () { return __awaiter(void 0, void 0, void 0, function () {
var migrator, db, domigrate, website, api;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
console.log(' ');
console.log('  /$$$$$$/$$$$$$$   /$$$$$$  /$$$$$$$$');
console.log(' /$$$_  $$  | $$__  $$ /$$__  $$|__  $$__/');
console.log('| $$$$\\ $$ /$$   /$$| $$  \\ $$| $$  \\ $$   | $$   ');
console.log('| $$ $$ $$|  $$ /$$/| $$$$$$$ | $$  | $$   | $$   ');
console.log('| $$\\ $$$$ \\  $$$$/ | $$__  $$| $$  | $$   | $$   ');
console.log('| $$ \\ $$$  |$$  $$ | $$  \\ $$| $$  | $$   | $$   ');
console.log('|  $$$$$$/ /$$/\\  $$| $$$$$$$/|  $$$$$$/   | $$   ');
console.log(' \\______/ |__/  \\__/|_______/  \\______/|__/   ');
console.log(' ');
console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
console.log(' ');
migrator = function (conn) { return __awaiter(void 0, void 0, void 0, function () {
var migrations, migrations_1, migrations_1_1, file, migration, status_1, e_2_1;
var e_2, _a;
return __generator(this, function (_b) {
switch (_b.label) {
case 0:
migrations = (0, getAllFiles_js_1.getAllFilesFilter)('./migrations', '.js');
_b.label = 1;
case 1:
_b.trys.push([1, 7, 8, 9]);
migrations_1 = __values(migrations), migrations_1_1 = migrations_1.next();
_b.label = 2;
case 2:
if (!!migrations_1_1.done) return [3, 6];
file = migrations_1_1.value;
return [4, import(file)];
case 3:
migration = (_b.sent()).default.default;
return [4, migration.migrate(conn)];
case 4:
status_1 = _b.sent();
if (status_1)
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] MIGRATED ").concat(migration.data.name));
else
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] DIDNT MIGRATE ").concat(migration.data.name));
_b.label = 5;
case 5:
migrations_1_1 = migrations_1.next();
return [3, 2];
case 6: return [3, 9];
case 7:
e_2_1 = _b.sent();
e_2 = { error: e_2_1 };
return [3, 9];
case 8:
try {
if (migrations_1_1 && !migrations_1_1.done && (_a = migrations_1.return)) _a.call(migrations_1);
}
finally { if (e_2) throw e_2.error; }
return [7];
case 9: return [2];
}
});
}); };
db = new pg_1.default.Pool({
host: _config_1.default.database.oxbot.host,
database: _config_1.default.database.oxbot.database,
user: _config_1.default.database.oxbot.username,
password: _config_1.default.database.oxbot.password,
ssl: true,
port: 5432
});
domigrate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, migrator(db)];
case 1:
_a.sent();
return [2];
}
}); }); };
return [4, domigrate()];
case 1:
_a.sent();
website = new rjweb_server_1.default.routeList();
website.static('/', './dashboard/dist', {
preload: true,
remHTML: true
});
if (!_config_1.default.web.dashboard) return [3, 3];
return [4, rjweb_server_1.default.start({
bind: '0.0.0.0',
urls: website,
pages: {
notFound: function (ctr) {
return __awaiter(this, void 0, void 0, function () {
return __generator(this, function (_a) {
return [2, ctr.printFile('./dashboard/dist/index.html')];
});
});
}
}, port: _config_1.default.web.ports.dashboard,
events: {
request: function (ctr) {
return __awaiter(this, void 0, void 0, function () {
return __generator(this, function (_a) {
if (ctr.reqUrl.href.endsWith('.js'))
ctr.setHeader('Content-Type', 'text/javascript');
if (ctr.reqUrl.href.endsWith('.css'))
ctr.setHeader('Content-Type', 'text/css');
return [2];
});
});
}
}
}).then(function (res) {
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [STA] $$$$$ STARTED DASHBOARD ON PORT ").concat(res.port));
})];
case 2:
_a.sent();
_a.label = 3;
case 3:
api = new rjweb_server_1.default.routeList();
api.load('./apis');
if (!_config_1.default.web.api) return [3, 5];
return [4, rjweb_server_1.default.start({
bind: '0.0.0.0',
cors: true,
urls: api,
pages: {
notFound: function (ctr) {
return __awaiter(this, void 0, void 0, function () {
return __generator(this, function (_a) {
return [2, ctr.print({
"success": false,
"message": 'NOT FOUND'
})];
});
});
},
reqError: function (ctr) {
return __awaiter(this, void 0, void 0, function () {
return __generator(this, function (_a) {
console.log(ctr.error.stack);
ctr.status(500);
return [2, ctr.print({
"success": false,
"message": 'SERVER ERROR'
})];
});
});
}
}, port: _config_1.default.web.ports.api,
events: {
request: function (ctr) {
return __awaiter(this, void 0, void 0, function () {
var _a, _b;
return __generator(this, function (_c) {
switch (_c.label) {
case 0:
_a = ctr;
return [4, import('./functions/api.js')];
case 1:
_a.api = (_c.sent()).default;
_b = ctr;
return [4, import('./functions/bot.js')];
case 2:
_b.bot = (_c.sent()).default;
ctr.config = _config_1.default;
ctr.client = client;
ctr.db = db;
return [2];
}
});
});
}
}
}).then(function (res) {
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [STA] $$$$$ STARTED API ON PORT ").concat(res.port));
})];
case 4:
_a.sent();
_a.label = 5;
case 5:
if (_config_1.default.web.stats) {
cron.schedule('0 */1 * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
var axios, req, req;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('axios')];
case 1:
axios = (_a.sent()).default;
return [4, axios({
method: 'POST',
url: "https://top.gg/api/bots/".concat(_config_1.default.client.id, "/stats"),
validateStatus: false,
headers: {
"Authorization": _config_1.default.web.keys.topgg.apikey
}, data: {
"server_count": client.guilds.cache.size,
"shard_count": 1
}
})];
case 2:
req = _a.sent();
if (req.status !== 200)
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] [").concat(req.status, "] FAILED TO POST TOPGG STATS"));
else
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] [").concat(req.status, "] POSTED TOPGG STATS"));
return [4, axios({
method: 'POST',
url: "https://discordbotlist.com/api/v1/bots/".concat(_config_1.default.client.id, "/stats"),
validateStatus: false,
headers: {
"Authorization": _config_1.default.web.keys.dbl.apikey
}, data: {
"guilds": client.guilds.cache.size
}
})];
case 3:
req = _a.sent();
if (req.status !== 200)
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] [").concat(req.status, "] FAILED TO POST DBL STATS"));
else
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] [").concat(req.status, "] POSTED DBL STATS"));
return [2];
}
});
}); });
}
console.log(' ');
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [STA] $$$$$ LOADING 0xBOT ").concat(_config_1.default.version));
console.log(' ');
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [STA] $$$$$ LOADING COMMANDS AND EVENTS"));
console.log(' ');
(0, bot_js_1.start)(db);
return [2];
}
});
}); })();
}
//# sourceMappingURL=index.js.map