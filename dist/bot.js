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
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAlias('@interfaces', __dirname + '/interfaces');
module_alias_1.default.addAlias('@functions', __dirname + '/functions');
module_alias_1.default.addAlias('@utils', __dirname + '/utils');
module_alias_1.default.addAlias('@config', __dirname + '/config.json');
var sleep = function (milliseconds) { return Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds); };
var cron = __importStar(require("node-cron"));
var discord_js_1 = require("discord.js");
var getAllFiles_js_1 = require("@utils/getAllFiles.js");
var timer_js_1 = require("@utils/timer.js");
var _config_1 = __importDefault(require("@config"));
var client = new discord_js_1.Client({
intents: [
discord_js_1.GatewayIntentBits.Guilds,
discord_js_1.GatewayIntentBits.GuildMembers,
discord_js_1.GatewayIntentBits.GuildMessages,
discord_js_1.GatewayIntentBits.MessageContent,
discord_js_1.GatewayIntentBits.GuildVoiceStates
]
});
var timer = new timer_js_1.Timer();
var didload = false;
var login = function (client, commandFiles) {
timer.start();
client.login(_config_1.default.client.token).then(function () { return __awaiter(void 0, void 0, void 0, function () {
var commands_1, clientCommands, ready, commands_2, clientCommands, ready;
var _a, _b;
return __generator(this, function (_c) {
switch (_c.label) {
case 0:
if (!_config_1.default.client.quickload) return [3, 3];
timer.stop();
commands_1 = [];
return [4, Promise.all(commandFiles.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
var command;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import(file)];
case 1:
command = (_a.sent()).default.default;
command.data.toJSON();
commands_1.push(command.data.toJSON());
return [2];
}
});
}); }))];
case 1:
_c.sent();
clientCommands = commands_1;
(_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(clientCommands);
return [4, import('./events/ready.js')];
case 2:
ready = (_c.sent()).default.default;
while (!didload) {
sleep(500);
}
return [2, ready.execute(client, timer.getTime())];
case 3:
timer.stop();
commands_2 = [];
return [4, Promise.all(commandFiles.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
var command;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import(file)];
case 1:
command = (_a.sent()).default.default;
command.data.toJSON();
commands_2.push(command.data.toJSON());
return [2];
}
});
}); }))];
case 4:
_c.sent();
clientCommands = commands_2;
(_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.set(clientCommands);
return [4, import('./events/ready.js')];
case 5:
ready = (_c.sent()).default.default;
return [2, ready.execute(client, timer.getTime())];
}
});
}); });
};
var bot = __importStar(require("@functions/bot.js"));
client.config = _config_1.default;
var start = function (db) {
var fileList = [
{
"name": 'EVENTS',
"events": true,
"files": (0, getAllFiles_js_1.getAllFilesFilter)('./events', '.js')
},
{
"name": 'COMMANDS',
"events": false,
"files": (0, getAllFiles_js_1.getAllFilesFilter)('./commands', '.js')
},
{
"name": 'BUTTONS',
"events": false,
"files": (0, getAllFiles_js_1.getAllFilesFilter)('./buttons', '.js')
},
{
"name": 'MODALS',
"events": false,
"files": (0, getAllFiles_js_1.getAllFilesFilter)('./modals', '.js')
}
];
if (_config_1.default.client.quickload)
login(client, (0, getAllFiles_js_1.getAllFilesFilter)('./commands', '.js'));
Promise.all(fileList.map(function (list) { return __awaiter(void 0, void 0, void 0, function () {
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] LOADED ").concat(list.files.length, " ").concat(list.name));
if (!!list.events) return [3, 2];
client[list.name.toLowerCase()] = new discord_js_1.Collection();
return [4, Promise.all(list.files.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
var content;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import(file)];
case 1:
content = (_a.sent()).default.default;
client[list.name.toLowerCase()].set(content.data.name, content);
return [2];
}
});
}); }))];
case 1:
_a.sent();
return [3, 4];
case 2: return [4, Promise.all(list.files.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
var content;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import(file)];
case 1:
content = (_a.sent()).default.default;
if (_config_1.default.client.quickload && content.name.toLowerCase() === 'start bot')
return [2];
if (content.once)
client.once(content.event, function () {
var args = [];
for (var _i = 0; _i < arguments.length; _i++) {
args[_i] = arguments[_i];
}
return content.execute.apply(content, __spreadArray([], __read(args), false));
});
else
client.on(content.event, function () {
var args = [];
for (var _i = 0; _i < arguments.length; _i++) {
args[_i] = arguments[_i];
}
return content.execute.apply(content, __spreadArray(__spreadArray([], __read(args), false), [client], false));
});
return [2];
}
});
}); }))];
case 3:
_a.sent();
_a.label = 4;
case 4: return [2];
}
});
}); }));
console.log(' ');
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [END] $$$$$ LOADED COMMANDS AND EVENTS"));
client.on(discord_js_1.Events.InteractionCreate, function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
var guildlang, votet, votev, lastVote, command, ctx, e_1, e_2, sc, ctx, modal, e_3, e_4, componentRows_1, rowIndex_1, ctx, sc, args, button, choice, buttonId, button, buttonId, button, buttonId, button, button, buttonId, button, buttonId, button, buttonId, button, buttonId, button, button, button, button, button, button, button, e_5, e_6;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit())
return [2];
if (!interaction.guild)
return [2];
bot.userdb.add({
"avatar": (!!interaction.user.avatar) ? interaction.user.avatar : '',
"discriminator": interaction.user.discriminator,
"username": interaction.user.username,
"id": interaction.user.id
});
return [4, bot.language.get(interaction.guild.id)];
case 1:
guildlang = _a.sent();
votet = 'VOTED', votev = true;
return [4, bot.votes.get(interaction.user.id + '-T')];
case 2:
lastVote = _a.sent();
if (lastVote < (Date.now() - 24 * 60 * 60 * 1000)) {
votet = 'NOT VOTED';
votev = false;
}
if (lastVote === 0) {
votet = 'NOT VOTED -> /VOTE';
votev = false;
}
if (guildlang === 'de') {
votet = 'GEVOTED';
if (lastVote < (Date.now() - 24 * 60 * 60 * 1000))
votet = 'NICHT GEVOTET';
if (lastVote === 0)
votet = 'NICHT GEVOTED -> /VOTE';
}
if (interaction.locale === 'de')
bot.language.set(interaction.user.id, 'de');
else
bot.language.set(interaction.user.id, 'en');
if (!interaction.isChatInputCommand()) return [3, 10];
bot.stats('cmd', interaction.user.id, interaction.guild.id);
command = client.commands.get(interaction.commandName);
if (!command)
return [2];
ctx = {
"interaction": interaction,
"db": db,
"bot": bot,
"client": client,
"getOption": function (option) {
if (!interaction.options.get(option))
return null;
else
return interaction.options.get(option).value;
}, "log": function (type, text) {
if (!type)
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(interaction.user.id, " @ ").concat(interaction.guild.id, "] ").concat(text));
else
console.log("[0xBOT] [!] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(interaction.user.id, " @ ").concat(interaction.guild.id, "] ").concat(text));
},
"metadata": {
"vote": {
"text": votet,
"time": lastVote,
"valid": votev
},
"language": guildlang
}
};
_a.label = 3;
case 3:
_a.trys.push([3, 5, , 10]);
return [4, command.execute(ctx)];
case 4:
_a.sent();
return [3, 10];
case 5:
e_1 = _a.sent();
_a.label = 6;
case 6:
_a.trys.push([6, 8, , 9]);
return [4, bot.error(interaction, client, e_1, 'cmd', guildlang, votet)];
case 7:
_a.sent();
return [3, 9];
case 8:
e_2 = _a.sent();
return [3, 9];
case 9: return [3, 10];
case 10:
if (!interaction.isModalSubmit()) return [3, 19];
_a.label = 11;
case 11:
_a.trys.push([11, 14, , 19]);
bot.stats('mod', interaction.user.id, interaction.guild.id);
sc = false;
ctx = {
"interaction": interaction,
"db": db,
"bot": bot,
"client": client,
"log": function (type, text) {
if (!type)
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(interaction.user.id, " @ ").concat(interaction.guild.id, "] ").concat(text));
else
console.log("[0xBOT] [!] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(interaction.user.id, " @ ").concat(interaction.guild.id, "] ").concat(text));
},
"metadata": {
"vote": {
"text": votet,
"time": lastVote,
"valid": votev
},
"language": guildlang
}
};
if (!!sc) return [3, 13];
modal = client.modals.get(interaction.customId);
if (!modal)
return [2];
return [4, modal.execute(ctx)];
case 12:
_a.sent();
_a.label = 13;
case 13: return [2];
case 14:
e_3 = _a.sent();
_a.label = 15;
case 15:
_a.trys.push([15, 17, , 18]);
return [4, bot.error(interaction, client, e_3, 'mod', guildlang, votet)];
case 16:
_a.sent();
return [3, 18];
case 17:
e_4 = _a.sent();
return [3, 18];
case 18: return [3, 19];
case 19:
if (!interaction.isButton()) return [3, 56];
bot.stats('btn', interaction.user.id, interaction.guild.id);
componentRows_1 = [];
rowIndex_1 = 0;
interaction.message.components.forEach(function (row) {
componentRows_1[rowIndex_1] = { "components": [] };
var componentIndex = 0;
row.components.forEach(function (component) {
componentRows_1[rowIndex_1].components[componentIndex++] = discord_js_1.ButtonBuilder.from(component.data);
});
rowIndex_1++;
});
ctx = {
"interaction": interaction,
"db": db,
"bot": bot,
"client": client,
"log": function (type, text) {
if (!type)
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(interaction.user.id, " @ ").concat(interaction.guild.id, "] ").concat(text));
else
console.log("[0xBOT] [!] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [").concat(interaction.user.id, " @ ").concat(interaction.guild.id, "] ").concat(text));
},
"metadata": {
"vote": {
"text": votet,
"time": lastVote,
"valid": votev
},
"language": guildlang
},
"components": {
"rows": componentRows_1,
"getAPI": function () {
var output = [];
var rowIndex = 0;
componentRows_1.forEach(function (row) {
var _a;
output[rowIndex++] = (_a = new discord_js_1.ActionRowBuilder())
.addComponents.apply(_a, __spreadArray([], __read(row.components), false));
});
return output;
}
}
};
_a.label = 20;
case 20:
_a.trys.push([20, 51, , 56]);
sc = false;
args = interaction.customId.split('-');
if (!(args[0] === 'BEG')) return [3, 22];
sc = true;
button = client.buttons.get('beg');
return [4, button.execute(ctx, args[1], Number(args[2]), args[3], args[4])];
case 21:
_a.sent();
_a.label = 22;
case 22:
;
if (!(args[0] === 'RPS')) return [3, 24];
choice = void 0;
buttonId = "rps-choice";
if (args[1] === '1')
choice = 'ROCK';
if (args[1] === '2')
choice = 'PAPER';
if (args[1] === '3')
choice = 'SCISSORS';
if (args[1] === 'YES')
buttonId = "rps-yes";
if (args[1] === 'NO')
buttonId = "rps-no";
sc = true;
button = client.buttons.get(buttonId);
return [4, button.execute(ctx, Number(args[2]), choice)];
case 23:
_a.sent();
_a.label = 24;
case 24:
;
if (!(args[0] === 'MEMORY')) return [3, 26];
buttonId = 'memory-choice';
if (args[1] === 'YES')
buttonId = "memory-yes";
if (args[1] === 'NO')
buttonId = "memory-no";
sc = true;
button = client.buttons.get(buttonId);
return [4, button.execute(ctx, Number(args[2]), Number(args[1]))];
case 25:
_a.sent();
_a.label = 26;
case 26:
;
if (!(args[0] === 'TTT')) return [3, 28];
buttonId = 'ttt-choice';
if (args[1] === 'YES')
buttonId = "ttt-yes";
if (args[1] === 'NO')
buttonId = "ttt-no";
sc = true;
button = client.buttons.get(buttonId);
return [4, button.execute(ctx, Number(args[2]), Number(args[1]))];
case 27:
_a.sent();
_a.label = 28;
case 28:
;
if (!(args[0] === 'STOCKNEXT')) return [3, 30];
sc = true;
button = client.buttons.get('stock-next');
return [4, button.execute(ctx, args[1])];
case 29:
_a.sent();
_a.label = 30;
case 30:
;
if (!(args[0] === 'BUSINESS')) return [3, 32];
buttonId = void 0;
if (args[2] === 'YES')
buttonId = "business-yes";
if (args[2] === 'NO')
buttonId = "business-no";
sc = true;
button = client.buttons.get(buttonId);
return [4, button.execute(ctx, args[3], args[4], args[1].toLowerCase())];
case 31:
_a.sent();
_a.label = 32;
case 32:
;
if (!(args[0] === 'CAR')) return [3, 34];
buttonId = void 0;
if (args[2] === 'YES')
buttonId = "car-yes";
if (args[2] === 'NO')
buttonId = "car-no";
sc = true;
button = client.buttons.get(buttonId);
return [4, button.execute(ctx, args[3], args[4], args[1].toLowerCase())];
case 33:
_a.sent();
_a.label = 34;
case 34:
;
if (!(args[0] === 'ITEM')) return [3, 36];
buttonId = void 0;
if (args[2] === 'YES')
buttonId = "item-yes";
if (args[2] === 'NO')
buttonId = "item-no";
sc = true;
button = client.buttons.get(buttonId);
return [4, button.execute(ctx, args[3], args[4], args[1].toLowerCase(), Number(args[5]))];
case 35:
_a.sent();
_a.label = 36;
case 36:
;
if (!(args[0] === 'STOCKUPGRADE')) return [3, 38];
buttonId = void 0;
if (args[2] === 'YES')
buttonId = "stockupgrade-yes";
if (args[2] === 'NO')
buttonId = "stockupgrade-no";
sc = true;
button = client.buttons.get(buttonId);
return [4, button.execute(ctx, args[3], args[4], Number(args[5]))];
case 37:
_a.sent();
_a.label = 38;
case 38:
;
if (!(args[0] === 'BOMB')) return [3, 40];
sc = true;
button = client.buttons.get('item-bomb');
return [4, button.execute(ctx, args[1], args[2], args[3], args[4], args[5], args[6])];
case 39:
_a.sent();
_a.label = 40;
case 40:
;
if (!(args[0] === 'COUNT')) return [3, 42];
sc = true;
button = client.buttons.get('count');
return [4, button.execute(ctx, args[1].toLowerCase())];
case 41:
_a.sent();
_a.label = 42;
case 42:
;
if (!(args[0] === 'POLL')) return [3, 44];
sc = true;
button = client.buttons.get('poll');
return [4, button.execute(ctx, args[1].toLowerCase())];
case 43:
_a.sent();
_a.label = 44;
case 44:
;
if (!(args[0] === 'COOLDOWNS')) return [3, 46];
sc = true;
button = client.buttons.get('cooldowns');
return [4, button.execute(ctx, args[1], args[2])];
case 45:
_a.sent();
_a.label = 46;
case 46:
;
if (!(args[0] === 'COMMITS')) return [3, 48];
sc = true;
button = void 0;
if (args[1] === 'REFRESH')
button = client.buttons.get('commits-refresh');
else
button = client.buttons.get('commits-page');
return [4, button.execute(ctx, Number(args[2]), Number(args[3]), args[1].toLowerCase())];
case 47:
_a.sent();
_a.label = 48;
case 48:
if (!!sc) return [3, 50];
button = client.buttons.get(interaction.customId);
if (!button)
return [2];
return [4, button.execute(ctx)];
case 49:
_a.sent();
_a.label = 50;
case 50: return [2];
case 51:
e_5 = _a.sent();
_a.label = 52;
case 52:
_a.trys.push([52, 54, , 55]);
return [4, bot.error(interaction, client, e_5, 'btn', guildlang, votet)];
case 53:
_a.sent();
return [3, 55];
case 54:
e_6 = _a.sent();
return [3, 55];
case 55: return [3, 56];
case 56: return [2];
}
});
}); });
console.log(' ');
console.log("[0xBOT] [i] [".concat(new Date().toLocaleTimeString('en-US', { hour12: false }), "] [INF] LOGGING IN..."));
if (!_config_1.default.client.quickload)
login(client, (0, getAllFiles_js_1.getAllFilesFilter)('./commands', '.js'));
else
didload = true;
client.stocks = {
green: 0,
blue: 0,
yellow: 0,
red: 0,
black: 0,
white: 0
};
var dostocks = function () {
client.stocks.oldgreen = client.stocks.green;
client.stocks.green = (Math.floor(Math.random()
* (30 - 25 + 1)) + 25)
* (Math.floor(Math.random()
* (20 - 15 + 1)) + 15)
+ (Math.floor(Math.random()
* (400 - 350 + 1))
+ 350);
client.stocks.oldblue = client.stocks.blue;
client.stocks.blue = (Math.floor(Math.random()
* (70 - 45 + 1)) + 45)
* (Math.floor(Math.random()
* (40 - 30 + 1)) + 30)
- (Math.floor(Math.random()
* (200 - 100 + 1))
+ 100);
client.stocks.oldyellow = client.stocks.yellow;
client.stocks.yellow = (Math.floor(Math.random()
* (90 - 65 + 1)) + 65)
* (Math.floor(Math.random()
* (60 - 50 + 1)) + 50)
+ (Math.floor(Math.random()
* (200 - 100 + 1))
+ 100);
client.stocks.oldred = client.stocks.red;
client.stocks.red = (Math.floor(Math.random()
* (120 - 105 + 1)) + 105)
* (Math.floor(Math.random()
* (80 - 70 + 1)) + 70)
+ (Math.floor(Math.random()
* (400 - 100 + 1))
+ 100);
client.stocks.oldwhite = client.stocks.white;
client.stocks.white = (Math.floor(Math.random()
* (150 - 130 + 1)) + 130)
* (Math.floor(Math.random()
* (120 - 100 + 1)) + 100)
+ (Math.floor(Math.random()
* (600 - 100 + 1))
+ 100);
client.stocks.oldblack = client.stocks.black;
client.stocks.black = (Math.floor(Math.random()
* (250 - 200 + 1)) + 200)
* (Math.floor(Math.random()
* (170 - 150 + 1)) + 150)
+ (Math.floor(Math.random()
* (800 - 200 + 1))
+ 200);
};
dostocks();
cron.schedule('* * * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
return __generator(this, function (_a) {
dostocks();
client.stocks.refresh = Math.floor(+new Date() / 1000) + 60;
return [2];
});
}); });
cron.schedule('*/10 * * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, db.query("delete from usercooldowns where expires / 1000 < extract(epoch from now());")];
case 1:
_a.sent();
return [2];
}
});
}); });
};
exports.start = start;
//# sourceMappingURL=bot.js.map