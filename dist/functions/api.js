"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = exports.checkSession = void 0;
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
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const client = new discord_js_2.Client({ intents: [
discord_js_2.GatewayIntentBits.Guilds
] });
client.login(_config_1.default.client.token);
const checkSession = async (accessToken, tokenType, userid, guildid) => {
const axios = (await import('axios')).default;
const dbuser = await db.query(`select * from usersessions where userid = $1 and token = $2 and tokentype = $3;`, [
userid,
accessToken,
tokenType
]);
if (dbuser.rowCount === 0 || dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
if (dbuser.rowCount > 0 && dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
await db.query(`delete from usersessions where userid = $1 and token = $2;`, [
userid,
accessToken
]);
}
try {
const req = await axios.get('https://discord.com/api/users/@me', {
headers: {
authorization: `${tokenType} ${accessToken}`
}
});
const res = req.data;
if (res.id !== userid)
return false;
const guild = await client.guilds.fetch(guildid);
const user = await guild.members.fetch(userid);
if (user.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
await db.query(`insert into usersessions values ($1, $2, $3, $4);`, [
userid,
accessToken,
tokenType,
(Math.floor(+new Date() / 1000)) + 150
]);
return true;
}
else
return false;
}
catch (e) {
return false;
}
}
else {
try {
const guild = await client.guilds.fetch(guildid);
const user = await guild.members.fetch(userid);
if (user.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
return true;
}
}
catch (e) {
return false;
}
}
};
exports.checkSession = checkSession;
const mailcache = new Map();
const checkEmail = async (accessToken, tokenType, userid, email) => {
const axios = (await import('axios')).default;
const dbuser = mailcache.get(userid + email);
if (typeof dbuser === 'undefined') {
try {
const req = await axios.get('https://discord.com/api/users/@me', {
headers: {
authorization: `${tokenType} ${accessToken}`
}
});
const res = req.data;
if (res.id !== userid)
return false;
if (res.email !== email)
return false;
mailcache.set(userid + email, true);
return true;
}
catch (e) {
return false;
}
}
else
return true;
};
exports.checkEmail = checkEmail;
//# sourceMappingURL=api.js.map