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
var money_exports = {};
__export(money_exports, {
  add: () => add,
  get: () => get,
  rem: () => rem,
  set: () => set
});
module.exports = __toCommonJS(money_exports);
var import_config = __toESM(require("@config"));
var import_pg = __toESM(require("pg"));
const db = new import_pg.default.Pool({
  host: import_config.default.database.oxbot.host,
  database: import_config.default.database.oxbot.database,
  user: import_config.default.database.oxbot.username,
  password: import_config.default.database.oxbot.password,
  port: 5432,
  ssl: true
});
const get = async (userId) => {
  const data = await db.query(`select money from usermoney where userid = $1;`, [userId]);
  if (data.rowCount !== 1)
    return 0;
  return data.rows[0].money;
};
const set = async (guildId, userId, value) => {
  const data = await db.query(`select guilds from usermoney where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
      userId,
      value,
      guildId
    ]);
  } else {
    if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
      await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId]);
    }
    ;
    await db.query(`update usermoney set money = $1 where userid = $2;`, [
      value,
      userId
    ]);
  }
};
const add = async (guildId, userId, value) => {
  const data = await db.query(`select guilds from usermoney where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
      userId,
      value,
      guildId
    ]);
  } else {
    if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
      await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId]);
    }
    ;
    await db.query(`update usermoney set money = money + $1 where userid = $2;`, [
      value,
      userId
    ]);
  }
};
const rem = async (guildId, userId, value) => {
  const data = await db.query(`select guilds from usermoney where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into usermoney values ($1, 0, array[$2]);`, [
      userId,
      guildId
    ]);
  } else {
    if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
      await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId]);
    }
    ;
    await db.query(`update usermoney set money = money - $1 where userid = $2;`, [
      value,
      userId
    ]);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  get,
  rem,
  set
});
//# sourceMappingURL=money.js.map
