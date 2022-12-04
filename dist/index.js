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
module_alias_1.default.addAlias('@utils', __dirname + '/utils');
module_alias_1.default.addAlias('@config', __dirname + '/config.json');
const discord_js_1 = require("discord.js");
const pg_1 = __importDefault(require("pg"));
const getAllFiles_js_1 = require("@utils/getAllFiles.js");
const promises_1 = require("timers/promises");
const _config_1 = __importDefault(require("@config"));
const discord_js_2 = require("discord.js");
const client = new discord_js_2.Client({ intents: [
        discord_js_2.GatewayIntentBits.Guilds
    ] });
client.login(_config_1.default.client.token);
const bot = __importStar(require("@functions/bot.js"));
const stdin = process.openStdin();
stdin.addListener("data", async (input) => {
    const args = input.toString().trim().split(' ');
    console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] RECIEVED COMMAND [' + input.toString().trim().toUpperCase() + ']');
    if (args[0].toUpperCase() === 'ADDBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] ADDED ' + args[2] + '€ TO ' + args[1]);
            bot.money.add(false, args[1].toString(), parseInt(args[2]));
        }
        else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: ADDBAL [USERID] [AMOUNT]');
        }
    }
    if (args[0].toUpperCase() === 'REMBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] REMOVED ' + args[2] + '€ FROM ' + args[1]);
            bot.money.rem(false, args[1].toString(), parseInt(args[2]));
        }
        else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: REMBAL [USERID] [AMOUNT]');
        }
    }
    if (args[0].toUpperCase() === 'SETBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] SET BALANCE OF ' + args[1] + ' TO ' + args[2] + '€');
            bot.money.set(false, args[1].toString(), parseInt(args[2]));
        }
        else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: SETBAL [USERID] [AMOUNT]');
        }
    }
    if (args[0].toUpperCase() === 'EVAL') {
        if (typeof args[1] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] RESULT OF EVAL:');
            args.shift();
            try {
                console.log(await eval(args.join(' ')));
            }
            catch (e) {
                console.log(e);
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] EVAL RETURNED AN ERROR');
            }
        }
        else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: EVAL [COMMAND]');
        }
    }
});
console.log(' ');
console.log('  /$$$$$$            /$$$$$$$   /$$$$$$  /$$$$$$$$');
console.log(' /$$$_  $$          | $$__  $$ /$$__  $$|__  $$__/');
console.log('| $$$$\\ $$ /$$   /$$| $$  \\ $$| $$  \\ $$   | $$   ');
console.log('| $$ $$ $$|  $$ /$$/| $$$$$$$ | $$  | $$   | $$   ');
console.log('| $$\\ $$$$ \\  $$$$/ | $$__  $$| $$  | $$   | $$   ');
console.log('| $$ \\ $$$  |$$  $$ | $$  \\ $$| $$  | $$   | $$   ');
console.log('|  $$$$$$/ /$$/\\  $$| $$$$$$$/|  $$$$$$/   | $$   ');
console.log(' \\______/ |__/  \\__/|_______/  \\______/    |__/   ');
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
const domigrate = async () => { await migrator(db); };
domigrate();
const rjweb_server_1 = __importDefault(require("rjweb-server"));
const website = new rjweb_server_1.default.routeList();
website.static('/', './dashboard/dist', {
    preload: true,
    remHTML: true
});
if (_config_1.default.web.dashboard) {
    rjweb_server_1.default.start({
        bind: '0.0.0.0',
        urls: website,
        pages: {
            async notFound(ctr) {
                return ctr.printFile('./dashboard/dist/index.html');
            }
        }, port: _config_1.default.web.ports.dashboard,
        events: {
            async request(ctr) {
                if (ctr.reqUrl.href.endsWith('.js'))
                    ctr.setHeader('Content-Type', 'text/javascript');
                if (ctr.reqUrl.href.endsWith('.css'))
                    ctr.setHeader('Content-Type', 'text/css');
            }
        }
    }).then((res) => {
        console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED DASHBOARD ON PORT ${res.port}`);
    });
}
const api = new rjweb_server_1.default.routeList();
api.load('./apis');
if (_config_1.default.web.api) {
    rjweb_server_1.default.start({
        bind: '0.0.0.0',
        cors: true,
        urls: api,
        pages: {
            async notFound(ctr) {
                return ctr.print({
                    "success": false,
                    "message": 'NOT FOUND'
                });
            }, async reqError(ctr) {
                ctr.status(500);
                return ctr.print({
                    "success": false,
                    "message": 'SERVER ERROR'
                });
            }
        }, port: _config_1.default.web.ports.api,
        events: {
            async request(ctr) {
                ctr.config = _config_1.default;
                ctr.client = client;
                ctr.bot = bot;
                ctr.db = db;
            }
        }
    }).then((res) => {
        console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED API ON PORT ${res.port}`);
    });
}
const manager = new discord_js_1.ShardingManager('./bot.js', { token: _config_1.default.client.token, shards: 'auto', totalShards: 1 });
manager.spawn().catch(async () => {
    await (0, promises_1.setTimeout)(8500);
    manager.spawn();
});
//# sourceMappingURL=index.js.map