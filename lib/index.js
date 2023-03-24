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
module_alias_1.default.addAlias('@', __dirname + '/');
module_alias_1.default.addAlias('@config', __dirname + '/config.json');
const cron = __importStar(require("node-cron"));
const bot_1 = require("./bot");
const pg_1 = __importDefault(require("pg"));
const getAllFiles_1 = require("@/utils/getAllFiles");
const axios_1 = __importDefault(require("axios"));
const _config_1 = __importDefault(require("@config"));
const rjweb_server_1 = require("rjweb-server");
const rjweb_server_ratelimit_1 = require("rjweb-server-ratelimit");
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({ intents: [
discord_js_1.GatewayIntentBits.Guilds
] });
client.login(_config_1.default.client.token);
const apiFunctions = __importStar(require("@/functions/api"));
const botFunctions = __importStar(require("@/functions/bot"));
const bot = __importStar(require("@/functions/bot"));
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
const migrations = (0, getAllFiles_1.getAllFilesFilter)('./migrations', '.js');
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
const webController = new rjweb_server_1.Server({
bind: '0.0.0.0',
port: _config_1.default.web.ports.dashboard,
compression: 'gzip',
body: {
enabled: false
}
});
webController.path('/', (path) => path
.static('dashboard/dist', {
hideHTML: true,
addTypes: true
}));
webController.event('http404', (ctr) => {
return ctr.printFile('./dashboard/dist/index.html');
}).event('httpRequest', (ctr) => {
if (!ctr.headers.get('user-agent')?.startsWith('Uptime-Kuma'))
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [WEB] [${ctr.url.method.toUpperCase()}] ${ctr.url.pathname}`);
});
if (_config_1.default.web.dashboard)
await webController.start().then((res) => {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED DASHBOARD ON PORT ${res.port}, VERSION ${rjweb_server_1.Version}`);
});
const apiController = new rjweb_server_1.Server({
bind: '0.0.0.0',
cors: true,
proxy: true,
port: _config_1.default.web.ports.api,
compression: 'gzip',
dashboard: {
enabled: true,
path: '/upturned-precision-garnet'
}, body: {
enabled: true,
maxSize: 1,
message: { success: false, message: 'HTTP BODY TOO BIG' }
}
});
apiController.defaultHeaders()
.add('copyright', `${new Date().getFullYear()} 0x4096`);
apiController.middleware((0, rjweb_server_ratelimit_1.Init)({
rules: [
{
path: '/auth/refresh',
timeWindow: (1000 * 60 * 60 * 60 * 6),
maxHits: 5,
message: { success: false, message: 'RATE LIMIT HIT' }
},
{
path: '/guild/check',
timeWindow: (1000 * 60 * 60 * 60 * 6),
maxHits: 25,
message: { success: false, message: 'RATE LIMIT HIT' }
}
]
}));
apiController.path('/', (path) => path
.validate(async (ctr) => {
if (!ctr.headers.has('authtoken'))
return ctr.status(422).print({ success: false, message: 'NO AUTH TOKEN' });
if (!await ctr['@'].api.checkAuth(ctr.headers.get('authtoken'), ctr.queries.get('id')))
return ctr.status(401).print({ success: false, message: 'PERMISSION DENIED' });
})
.loadCJS('routes/authorized/guild'));
apiController.path('/', (path) => path
.validate(async (ctr) => {
if (!ctr.headers.has('authtoken'))
return ctr.status(422).print({ success: false, message: 'NO AUTH TOKEN' });
ctr.setCustom('user', await ctr['@'].api.users.get(ctr.headers.get('authtoken')));
if (!ctr["@"].user.id)
return ctr.status(401).print({ success: false, message: 'TOKEN NOT FOUND' });
})
.loadCJS('routes/authorized/user'));
apiController.path('/', (path) => path
.loadCJS('routes/normal'));
apiController.event('http404', async (ctr) => {
return ctr.status(404).print({
success: false,
message: 'ROUTE NOT FOUND'
});
}).event('httpRequest', async (ctr) => {
ctr.setCustom('api', apiFunctions);
ctr.setCustom('bot', botFunctions);
ctr.setCustom('config', _config_1.default);
ctr.setCustom('client', client);
ctr.setCustom('db', db);
if (!ctr.headers.get('user-agent')?.startsWith('Uptime-Kuma'))
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [API] [${ctr.url.method}] ${ctr.url.pathname}`);
}).event('runtimeError', async (ctr, error) => {
console.error(error.stack);
return ctr.status(500).print({
success: false,
message: 'SERVER ERROR'
});
});
if (_config_1.default.web.api)
await apiController.start().then((res) => {
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED API ON PORT ${res.port}, VERSION ${rjweb_server_1.Version}`);
});
if (_config_1.default.web.stats) {
cron.schedule('0 * * * *', async () => {
{
const req = await (0, axios_1.default)({
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
const req = await (0, axios_1.default)({
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
(0, bot_1.start)(await db.connect());
})();
}
//# sourceMappingURL=index.js.map