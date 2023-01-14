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
const discord_js_1 = require("discord.js");
const promises_1 = require("timers/promises");
const _config_1 = __importDefault(require("@config"));
const pg_1 = __importDefault(require("pg"));
const db = new pg_1.default.Pool({
host: _config_1.default.database.oxbot.host,
database: _config_1.default.database.oxbot.database,
user: _config_1.default.database.oxbot.username,
password: _config_1.default.database.oxbot.password,
port: 5432,
ssl: true
});
const git_commit_count_1 = __importDefault(require("git-commit-count"));
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
name: 'START BOT',
event: discord_js_1.Events.ClientReady,
once: true,
async execute(client, timed) {
const axios = (await import("axios")).default;
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] STARTED AND LOGGED IN AS ${client.user?.tag} (${timed}ms)`);
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED 0xBOT ${_config_1.default.version}`);
console.log(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED LOGGING OF COMMANDS AND ERRORS`);
console.log(' ');
while (!+[]) {
client.user?.setActivity(client.guilds.cache.size + ' Servers', { type: discord_js_1.ActivityType.Watching });
await (0, promises_1.setTimeout)(20000);
const commits = await (0, git_commit_count_1.default)();
client.user?.setActivity(commits + ' Commits', { type: discord_js_1.ActivityType.Watching });
await (0, promises_1.setTimeout)(20000);
client.user?.setActivity(await bot.stat.get('t-all', 'cmd') + ' Commands Used', { type: discord_js_1.ActivityType.Watching });
await (0, promises_1.setTimeout)(10000);
client.user?.setActivity(await bot.stat.get('t-all', 'btn') + ' Buttons Clicked', { type: discord_js_1.ActivityType.Watching });
await (0, promises_1.setTimeout)(20000);
const rawvalues = await db.query(`select * from usermoney;`);
let total = 0;
rawvalues.rows.forEach((user) => total += Number(user.money));
client.user?.setActivity('$' + total + ' in Circulation', { type: discord_js_1.ActivityType.Watching });
await (0, promises_1.setTimeout)(20000);
const req = await axios({
method: 'GET',
url: 'https://status.0xbot.de/api/status-page/heartbeat/all',
validateStatus: false,
headers: {}
});
const res = req.data;
client.user.setActivity(Math.round((res.uptimeList['1_24'] * 100) * 100) / 100 + '% Bot Uptime', { type: discord_js_1.ActivityType.Watching });
await (0, promises_1.setTimeout)(20000);
}
}
};
