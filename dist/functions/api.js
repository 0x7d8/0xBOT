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
exports.checkEmail = exports.checkSession = void 0;
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
var discord_js_1 = require("discord.js");
var discord_js_2 = require("discord.js");
var client = new discord_js_2.Client({ intents: [
discord_js_2.GatewayIntentBits.Guilds
] });
client.login(_config_1.default.client.token);
var checkSession = function (accessToken, tokenType, userid, guildid) { return __awaiter(void 0, void 0, void 0, function () {
var axios, dbuser, req, res, guild, user, e_1, guild, user, e_2;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('axios')];
case 1:
axios = (_a.sent()).default;
return [4, db.query("select * from usersessions where userid = $1 and token = $2 and tokentype = $3;", [
userid,
accessToken,
tokenType
])];
case 2:
dbuser = _a.sent();
if (!(dbuser.rowCount === 0 || dbuser.rows[0].expires < Math.floor(+new Date() / 1000))) return [3, 13];
if (!(dbuser.rowCount > 0 && dbuser.rows[0].expires < Math.floor(+new Date() / 1000))) return [3, 4];
return [4, db.query("delete from usersessions where userid = $1 and token = $2;", [
userid,
accessToken
])];
case 3:
_a.sent();
_a.label = 4;
case 4:
_a.trys.push([4, 11, , 12]);
return [4, axios.get('https://discord.com/api/users/@me', {
headers: {
authorization: "".concat(tokenType, " ").concat(accessToken)
}
})];
case 5:
req = _a.sent();
res = req.data;
if (res.id !== userid)
return [2, false];
return [4, client.guilds.fetch(guildid)];
case 6:
guild = _a.sent();
return [4, guild.members.fetch(userid)];
case 7:
user = _a.sent();
if (!user.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) return [3, 9];
return [4, db.query("insert into usersessions values ($1, $2, $3, $4);", [
userid,
accessToken,
tokenType,
(Math.floor(+new Date() / 1000)) + 150
])];
case 8:
_a.sent();
return [2, true];
case 9: return [2, false];
case 10: return [3, 12];
case 11:
e_1 = _a.sent();
return [2, false];
case 12: return [3, 17];
case 13:
_a.trys.push([13, 16, , 17]);
return [4, client.guilds.fetch(guildid)];
case 14:
guild = _a.sent();
return [4, guild.members.fetch(userid)];
case 15:
user = _a.sent();
if (user.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
return [2, true];
}
return [3, 17];
case 16:
e_2 = _a.sent();
return [2, false];
case 17: return [2];
}
});
}); };
exports.checkSession = checkSession;
var mailcache = new Map();
var checkEmail = function (accessToken, tokenType, userid, email) { return __awaiter(void 0, void 0, void 0, function () {
var axios, dbuser, req, res, e_3;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('axios')];
case 1:
axios = (_a.sent()).default;
dbuser = mailcache.get(userid + email);
if (!(typeof dbuser === 'undefined')) return [3, 6];
_a.label = 2;
case 2:
_a.trys.push([2, 4, , 5]);
return [4, axios.get('https://discord.com/api/users/@me', {
headers: {
authorization: "".concat(tokenType, " ").concat(accessToken)
}
})];
case 3:
req = _a.sent();
res = req.data;
if (res.id !== userid)
return [2, false];
if (res.email !== email)
return [2, false];
mailcache.set(userid + email, true);
return [2, true];
case 4:
e_3 = _a.sent();
return [2, false];
case 5: return [3, 7];
case 6: return [2, true];
case 7: return [2];
}
});
}); };
exports.checkEmail = checkEmail;
//# sourceMappingURL=api.js.map