var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var api_exports = {};
__export(api_exports, {
  checkAuth: () => checkAuth,
  checkSession: () => checkSession,
  users: () => users
});
module.exports = __toCommonJS(api_exports);
var import_axios = __toESM(require("axios"));
var import_config = __toESM(require("@config"));
var import_pg = __toESM(require("pg"));
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
const db = new import_pg.default.Pool({
  host: import_config.default.database.oxbot.host,
  database: import_config.default.database.oxbot.database,
  user: import_config.default.database.oxbot.username,
  password: import_config.default.database.oxbot.password,
  port: 5432,
  ssl: true
});
const client = new import_discord2.Client({ intents: [
  import_discord2.GatewayIntentBits.Guilds
] });
client.login(import_config.default.client.token);
const checkSession = async (accessToken, tokenType, userid, guildid) => {
  const dbuser = await db.query(`select * from usersessions where userid = $1 and token = $2 and tokentype = $3;`, [
    userid,
    accessToken,
    tokenType
  ]);
  if (dbuser.rowCount === 0 || dbuser.rows[0].expires < Math.floor(+/* @__PURE__ */ new Date() / 1e3)) {
    if (dbuser.rowCount > 0 && dbuser.rows[0].expires < Math.floor(+/* @__PURE__ */ new Date() / 1e3)) {
      await db.query(`delete from usersessions where userid = $1 and token = $2;`, [
        userid,
        accessToken
      ]);
    }
    try {
      const req = await import_axios.default.get("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${tokenType} ${accessToken}`
        }
      });
      const res = req.data;
      if (res.id !== userid)
        return false;
      const guild = await client.guilds.fetch(guildid);
      const user = await guild.members.fetch(userid);
      if (user.permissions.has(import_discord.PermissionsBitField.Flags.Administrator)) {
        await db.query(`insert into usersessions values ($1, $2, $3, $4);`, [
          userid,
          accessToken,
          tokenType,
          Math.floor(+/* @__PURE__ */ new Date() / 1e3) + 150
        ]);
        return true;
      } else
        return false;
    } catch (e) {
      return false;
    }
  } else {
    try {
      const guild = await client.guilds.fetch(guildid);
      const user = await guild.members.fetch(userid);
      if (user.permissions.has(import_discord.PermissionsBitField.Flags.Administrator)) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
};
const users = {
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
    } else {
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
  const userInfos = await users.get(authToken);
  if (!userInfos.id)
    return false;
  const dbuser = await db.query(`select * from usersessions where userid = $1 and token = $2 and tokentype = $3;`, [
    userInfos.id,
    userInfos.tokens.access,
    "Bearer"
  ]);
  if (dbuser.rowCount === 0 || dbuser.rows[0].expires < Math.floor(+/* @__PURE__ */ new Date() / 1e3)) {
    if (dbuser.rowCount > 0 && dbuser.rows[0].expires < Math.floor(+/* @__PURE__ */ new Date() / 1e3)) {
      await db.query(`delete from usersessions where userid = $1 and token = $2;`, [
        userInfos.id,
        userInfos.tokens.access
      ]);
    }
    try {
      const guild = await client.guilds.fetch(guildId);
      const user = await guild.members.fetch(userInfos.id);
      if (user.permissions.has(import_discord.PermissionsBitField.Flags.Administrator)) {
        await db.query(`insert into usersessions values ($1, $2, $3, $4);`, [
          userInfos.id,
          userInfos.tokens.access,
          "Bearer",
          Math.floor(+/* @__PURE__ */ new Date() / 1e3) + 150
        ]);
        return true;
      } else
        return false;
    } catch (e) {
      return false;
    }
  } else {
    try {
      const guild = await client.guilds.fetch(guildId);
      const user = await guild.members.fetch(userInfos.id);
      if (user.permissions.has(import_discord.PermissionsBitField.Flags.Administrator)) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkAuth,
  checkSession,
  users
});
//# sourceMappingURL=api.js.map
