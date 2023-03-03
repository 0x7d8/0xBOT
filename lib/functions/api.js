"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.users = exports.checkSession = void 0;
const axios_1 = __importDefault(require("axios"));
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
const req = await axios_1.default.get('https://discord.com/api/users/@me', {
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
exports.users = {
set: async (json) => {
const data = await db.query(`select * from userlogins where id = $1;`, [json.user.id]);
if (data.rowCount !== 1) {
await db.query(`insert into userlogins values ($1, $2, $3, $4, $5, $6, $7, $8)`, [
json.user.id,
json.user.name,
json.user.tag,
json.user.email,
json.user.avatar,
json.auth,
json.tokens.access,
json.tokens.refresh
]);
}
else {
await db.query(`update userlogins set name = $2, tag = $3, email = $4, avatar = $5, authtoken = $6, accesstoken = $7, refreshtoken = $8 where id = $1;`, [
json.user.id,
json.user.name,
json.user.tag,
json.user.email,
json.user.avatar,
json.auth,
json.tokens.access,
json.tokens.refresh
]);
}
},
get: async (authToken) => {
const data = await db.query(`select * from userlogins where authtoken = $1;`, [authToken]);
if (data.rowCount !== 1)
return {
id: null,
name: null,
tag: null,
avatar: null,
email: null,
tokens: {
access: null,
refresh: null
}
};
return {
id: data.rows[0].id,
name: data.rows[0].name,
tag: data.rows[0].tag,
avatar: data.rows[0].avatar,
email: data.rows[0].email,
tokens: {
access: data.rows[0].accesstoken,
refresh: data.rows[0].refreshtoken
}
};
},
rem: async (userId) => {
await db.query(`delete from userlogins where id = $1;`, [userId]);
}
};
const checkAuth = async (authToken, guildId) => {
const userInfos = await exports.users.get(authToken);
if (!userInfos.id)
return false;
const dbuser = await db.query(`select * from usersessions where userid = $1 and token = $2 and tokentype = $3;`, [
userInfos.id,
userInfos.tokens.access,
'Bearer'
]);
if (dbuser.rowCount === 0 || dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
if (dbuser.rowCount > 0 && dbuser.rows[0].expires < Math.floor(+new Date() / 1000)) {
await db.query(`delete from usersessions where userid = $1 and token = $2;`, [
userInfos.id,
userInfos.tokens.access
]);
}
try {
const guild = await client.guilds.fetch(guildId);
const user = await guild.members.fetch(userInfos.id);
if (user.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
await db.query(`insert into usersessions values ($1, $2, $3, $4);`, [
userInfos.id,
userInfos.tokens.access,
'Bearer',
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
const guild = await client.guilds.fetch(guildId);
const user = await guild.members.fetch(userInfos.id);
if (user.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
return true;
}
}
catch (e) {
return false;
}
}
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=api.js.map