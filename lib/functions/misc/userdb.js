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
var userdb_exports = {};
__export(userdb_exports, {
  add: () => add,
  get: () => get
});
module.exports = __toCommonJS(userdb_exports);
var import_config = __toESM(require("@config"));
var import_pg = __toESM(require("pg"));
var bot = __toESM(require("@/functions/bot"));
var import_discord = require("discord.js");
const db = new import_pg.default.Pool({
  host: import_config.default.database.oxbot.host,
  database: import_config.default.database.oxbot.database,
  user: import_config.default.database.oxbot.username,
  password: import_config.default.database.oxbot.password,
  port: 5432,
  ssl: true
});
const client = new import_discord.Client({
  intents: [
    import_discord.GatewayIntentBits.Guilds,
    import_discord.GatewayIntentBits.GuildMembers,
    import_discord.GatewayIntentBits.GuildMessages,
    import_discord.GatewayIntentBits.MessageContent
  ]
});
client.login(import_config.default.client.token);
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
    const user = await client.users.fetch(userId).catch(() => {
      cont = false;
    });
    if (cont) {
      bot.userdb.add(user);
      return {
        userid: user.id,
        username: user.username,
        usertag: user.discriminator,
        avatar: user.avatar
      };
    } else
      return;
  }
  return {
    userid: data.rows[0].userid,
    username: data.rows[0].username,
    usertag: data.rows[0].discriminator,
    avatar: data.rows[0].avatar
  };
};
const add = async (json) => {
  const data = await db.query(`select null from userinfos where userid = $1;`, [json.id]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userinfos values ($1, $2, $3, $4)`, [
      json.id,
      json.username,
      json.discriminator,
      json.avatar
    ]);
  } else {
    await db.query(`update userinfos set username = $1, discriminator = $2, avatar = $3 where userid = $4;`, [
      json.username,
      json.discriminator,
      json.avatar,
      json.id
    ]);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  get
});
//# sourceMappingURL=userdb.js.map
