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
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAlias('@interfaces', __dirname + '/interfaces');
module_alias_1.default.addAlias('@functions', __dirname + '/functions');
module_alias_1.default.addAlias('@assets', __dirname + '/assets');
module_alias_1.default.addAlias('@utils', __dirname + '/utils');
module_alias_1.default.addAlias('@config', __dirname + '/config.json');
const cron = __importStar(require("node-cron"));
const bot_js_1 = require("./bot.js");
const pg_1 = __importDefault(require("pg"));
const getAllFiles_js_1 = require("@utils/getAllFiles.js");
const _config_1 = __importDefault(require("@config"));
const webserver = __importStar(require("rjweb-server"));
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({ intents: [
discord_js_1.GatewayIntentBits.Guilds
] });
client.login(_config_1.default.client.token);
const apiFunctions = __importStar(require("@functions/api.js"));
const botFunctions = __importStar(require("@functions/bot.js"));
const bot = __importStar(require("@functions/bot.js"));
const stdin = process.openStdin();
stdin.addListener("data", async (input) => {
const args = input.toString().trim().split(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] RECIEVED COMMAND [${input.toString().trim().toUpperCase()}]`);
if (args[0].toUpperCase() === 'ADDBAL') {
if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] ADDED ${args[2]}€ TO ${args[1]}`);
bot.money.add(false, args[1].toString(), Number(args[2]));
}
else {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: ADDBAL [USERID] [AMOUNT]`);
}
}
if (args[0].toUpperCase() === 'REMBAL') {
if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] REMOVED ${args[2]}€ FROM ${args[1]}`);
bot.money.rem(false, args[1].toString(), Number(args[2]));
}
else {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: REMBAL [USERID] [AMOUNT]`);
}
}
if (args[0].toUpperCase() === 'SETBAL') {
if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] SET BALANCE OF ${args[1]} TO ${args[2]}€`);
bot.money.set(false, args[1].toString(), Number(args[2]));
}
else {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: SETBAL [USERID] [AMOUNT]`);
}
}
if (args[0].toUpperCase() === 'EVAL') {
if (typeof args[1] !== 'undefined') {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] RESULT OF EVAL:`);
args.shift();
try {
console.log(await eval(args.join(' ')));
}
catch (e) {
console.log(e);
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] EVAL RETURNED AN ERROR`);
}
}
else {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] USAGE: EVAL [COMMAND]`);
}
}
});
{
(async () => {
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
const migrator = async (conn) => {
const migrations = (0, getAllFiles_js_1.getAllFilesFilter)('./migrations', '.js');
for (const file of migrations) {
const migration = (await import(file)).default.default;
const status = await migration.migrate(conn);
if (status)
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] MIGRATED ${migration.data.name}`);
else
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] DIDNT MIGRATE ${migration.data.name}`);
}
};
const db = new pg_1.default.Pool({
host: _config_1.default.database.oxbot.host,
database: _config_1.default.database.oxbot.database,
user: _config_1.default.database.oxbot.username,
password: _config_1.default.database.oxbot.password,
ssl: true,
port: 5432
});
await migrator(db);
const website = new webserver.routeList();
website.static('/', './dashboard/dist', {
preload: true,
remHTML: true,
addTypes: true
});
if (_config_1.default.web.dashboard) {
await webserver.start({
bind: '0.0.0.0',
urls: website,
pages: {
async notFound(ctr) {
return ctr.printFile('./dashboard/dist/index.html');
}
}, events: {
async request(ctr) {
if (!ctr.header.get('user-agent').startsWith('Uptime-Kuma'))
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [WEB] [${ctr.reqUrl.method.toUpperCase()}] ${ctr.reqUrl.pathname}`);
}
}, port: _config_1.default.web.ports.dashboard
}).then((res) => {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED DASHBOARD ON PORT ${res.port}`);
});
}
const rateLimits = new Map();
const api = new webserver.routeList();
api.load('./apis');
if (_config_1.default.web.api) {
await webserver.start({
bind: '0.0.0.0',
cors: true,
proxy: true,
urls: api,
pages: {
async notFound(ctr) {
return ctr.print({
"success": false,
"message": 'NOT FOUND'
}).status(404);
}, async reqError(ctr) {
console.log(ctr.error.stack);
return ctr.print({
"success": false,
"message": 'SERVER ERROR'
}).status(500);
}
}, port: _config_1.default.web.ports.api,
events: {
async request(ctr) {
ctr.setCustom('api', apiFunctions);
ctr.setCustom('bot', botFunctions);
ctr.setCustom('config', _config_1.default);
ctr.setCustom('client', client);
ctr.setCustom('db', db);
if (!ctr.header.get('user-agent').startsWith('Uptime-Kuma'))
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [API] [${ctr.reqUrl.method.toUpperCase()}] ${ctr.reqUrl.pathname}`);
}
}, rateLimits: {
enabled: true,
message: { "success": false, "message": 'RATE LIMITED' },
functions: rateLimits,
list: [
{
path: '/auth',
times: 10,
timeout: 10000
},
{
path: '/fetch',
times: 5,
timeout: 10000
},
{
path: '/check',
times: 5,
timeout: 10000
}
]
}
}).then((res) => {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED API ON PORT ${res.port}`);
});
}
if (_config_1.default.web.stats) {
cron.schedule('0 */1 * * *', async () => {
const axios = (await import('axios')).default;
{
const req = await axios({
method: 'POST',
url: `https://top.gg/api/bots/${_config_1.default.client.id}/stats`,
validateStatus: () => true,
headers: {
Authorization: _config_1.default.web.keys.topgg.apikey
}, data: {
server_count: client.guilds.cache.size
}
});
if (req.status !== 200)
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] FAILED TO POST TOPGG STATS`);
else
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] POSTED TOPGG STATS`);
}
{
const req = await axios({
method: 'POST',
url: `https://discordbotlist.com/api/v1/bots/${_config_1.default.client.id}/stats`,
validateStatus: () => true,
headers: {
Authorization: _config_1.default.web.keys.dbl.apikey
}, data: {
guilds: client.guilds.cache.size
}
});
if (req.status !== 200)
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] FAILED TO POST DBL STATS`);
else
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] [${req.status}] POSTED DBL STATS`);
}
});
}
console.log(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING 0xBOT ${_config_1.default.version}`);
console.log(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING COMMANDS AND EVENTS`);
console.log(' ');
(0, bot_js_1.start)(await db.connect());
})();
}
//# sourceMappingURL=index.js.map