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
var __read = (this && this.__read) || function (o, n) {
var m = typeof Symbol === "function" && o[Symbol.iterator];
if (!m) return o;
var i = m.call(o), r, ar = [], e;
try {
while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
}
catch (error) { e = { error: error }; }
finally {
try {
if (r && !r.done && (m = i["return"])) m.call(i);
}
finally { if (e) throw e.error; }
}
return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
if (ar || !(i in from)) {
if (!ar) ar = Array.prototype.slice.call(from, 0, i);
ar[i] = from[i];
}
}
return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttt = exports.rps = exports.memory = exports.game = exports.bomb = exports.error = exports.stats = exports.isNumber = exports.getOption = exports.log = exports.random = exports.perCalc = exports.perAdd = exports.inRange = exports.transactions = exports.businesses = exports.stocks = exports.money = exports.items = exports.cooldown = exports.language = exports.settings = exports.userdb = exports.polls = exports.quotes = exports.votes = exports.apis = exports.stat = void 0;
var discord_js_1 = require("discord.js");
var stat = __importStar(require("./stats.js"));
var utils = __importStar(require("rjutils-collection"));
var fs = __importStar(require("fs"));
exports.stat = __importStar(require("./stats.js"));
exports.apis = __importStar(require("./misc/apis.js"));
exports.votes = __importStar(require("./misc/votes.js"));
exports.quotes = __importStar(require("./misc/quotes.js"));
exports.polls = __importStar(require("./misc/polls.js"));
exports.userdb = __importStar(require("./misc/userdb.js"));
exports.settings = __importStar(require("./misc/settings.js"));
exports.language = __importStar(require("./misc/language.js"));
exports.cooldown = __importStar(require("./misc/cooldown.js"));
exports.items = __importStar(require("./economy/items.js"));
exports.money = __importStar(require("./economy/money.js"));
exports.stocks = __importStar(require("./economy/stocks.js"));
exports.businesses = __importStar(require("./economy/businesses.js"));
exports.transactions = __importStar(require("./economy/transactions.js"));
var inRange = function (x, min, max) {
return ((x - min) * (x - max) <= 0);
};
exports.inRange = inRange;
var perAdd = function (value, percent) {
var percentage = ((percent / 100) * value);
return (value + percentage);
};
exports.perAdd = perAdd;
var perCalc = function (newVal, oldVal) {
var res = ((newVal - oldVal) / oldVal) * 100;
res = Math.round(res * 10) / 10;
return (res < 0 ? "" : "+") + res;
};
exports.perCalc = perCalc;
exports.random = utils.randomNum;
var log = function (type, uid, gid, msg) {
if (!type) {
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(uid, " @ ").concat(gid, "] ").concat(msg));
}
else {
console.log("[0xBOT] [!] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(uid, " @ ").concat(gid, "] ").concat(msg));
}
};
exports.log = log;
var getOption = function (interaction, option) {
if (!interaction.options.get(option))
return null;
else
return interaction.options.get(option).value;
};
exports.getOption = getOption;
var isNumber = function (string) {
return __spreadArray([], __read(string), false).every(function (c) { return '0123456789'.includes(c); });
};
exports.isNumber = isNumber;
var stats = function (type, uid, gid) {
stat.add('t-all', type, 1);
stat.add('g-' + gid, type, 1);
stat.add('u-' + uid, type, 1);
};
exports.stats = stats;
var error = function (interaction, client, error, type, language, vote) { return __awaiter(void 0, void 0, void 0, function () {
var errorid, day, month, year, word, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
if (!interaction.guild)
return [2];
errorid = utils.randomStr({
length: 8,
numbers: true,
uppercase: true,
lowercase: true,
symbols: false,
exclude: ''
});
if (!fs.existsSync('logs'))
fs.mkdirSync('logs');
console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :');
console.error(error);
day = ('0' + new Date().getDate()).slice(-2);
month = ('0' + (new Date().getMonth() + 1)).slice(-2);
year = new Date().getFullYear();
fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', '[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :\n');
fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', error.stack + '\n\n');
word = '';
switch (type) {
case 'cmd':
word = 'this Command';
if (language === 'de')
word = 'dieses Befehls';
break;
case 'btn':
word = 'this Button';
if (language === 'de')
word = 'dieses Buttons';
break;
case 'mod':
word = 'this Modal';
if (language === 'de')
word = 'dieser Modal';
break;
default:
word = 'this Event';
if (language === 'de')
word = 'dieses Events';
break;
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription('» <:ERROR:1020414987291861022> An Error has occured while executing ' + word + '.\nThe Error has been logged and will be fixed soon!')
.setFooter({ text: '» ' + vote + ' » ' + client.config.version + ' » ERROR: ' + errorid });
if (language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription('» <:ERROR:1020414987291861022> Ein Fehler ist beim ausführen ' + word + ' aufgetreten.\nDer Fehler wurde geloggt und wird bald behoben!')
.setFooter({ text: '» ' + vote + ' » ' + client.config.version + ' » FEHLER: ' + errorid });
}
return [4, interaction.reply({ embeds: [message], ephemeral: true })];
case 1:
_a.sent();
return [2];
}
});
}); };
exports.error = error;
exports.bomb = new Map();
exports.game = new Map();
exports.memory = new Map();
exports.rps = new Map();
exports.ttt = new Map();
//# sourceMappingURL=bot.js.map