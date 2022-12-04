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
exports.add = exports.get = void 0;
// Connect to Database
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
// Login
const bot = __importStar(require("@functions/bot.js"));
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ]
});
client.login(_config_1.default.client.token);
// Get Function
const get = async (userId) => {
    const data = await db.query(`select * from userinfos where userid = $1;`, [userId]);
    if (!bot.isNumber(userId))
        return {
            userid: userId,
            username: "unknown",
            usertag: "unknown",
            avatar: "unknown"
        };
    if (data.rowCount !== 1) {
        let cont = true;
        const user = await client.users.fetch(userId).catch(() => { cont = false; });
        if (cont) {
            bot.userdb.add(user);
            return {
                userid: user.id,
                username: user.username,
                usertag: user.discriminator,
                avatar: user.avatar
            };
        }
        else
            return;
    }
    return {
        userid: data.rows[0].userid,
        username: data.rows[0].username,
        usertag: data.rows[0].discriminator,
        avatar: data.rows[0].avatar
    };
};
exports.get = get;
// Add Function
const add = async (json) => {
    const data = await db.query(`select * from userinfos where userid = $1;`, [json.id]);
    if (data.rowCount !== 1) {
        await db.query(`insert into userinfos values ($1, $2, $3, $4)`, [
            json.id,
            json.username,
            json.discriminator,
            json.avatar
        ]);
    }
    else {
        await db.query(`update userinfos set username = $1, discriminator = $2, avatar = $3 where userid = $4;`, [
            json.username,
            json.discriminator,
            json.avatar,
            json.id
        ]);
    }
};
exports.add = add;
//# sourceMappingURL=userdb.js.map