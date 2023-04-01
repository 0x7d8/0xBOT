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
var quotes_exports = {};
__export(quotes_exports, {
  add: () => add,
  get: () => get,
  rem: () => rem,
  set: () => set
});
module.exports = __toCommonJS(quotes_exports);
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
  const data = await db.query(`select quotes from userquotes where userid = $1;`, [userId]);
  if (data.rowCount !== 1)
    return 0;
  return Number(data.rows[0].quotes);
};
const set = async (userId, value) => {
  const data = await db.query(`select null from userquotes where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userquotes values ($1, $2)`, [
      userId,
      value
    ]);
  } else {
    await db.query(`update userquotes set votes = $1 where userid = $2;`, [
      value,
      userId
    ]);
  }
};
const add = async (userId, value) => {
  const data = await db.query(`select null from userquotes where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userquotes values ($1, $2)`, [
      userId,
      value
    ]);
  } else {
    await db.query(`update userquotes set quotes = quotes + $1 where userid = $2;`, [
      value,
      userId
    ]);
  }
};
const rem = async (userId, value) => {
  const data = await db.query(`select null from userquotes where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userquotes values ($1, 0)`, [
      userId
    ]);
  } else {
    await db.query(`update userquotes set quotes = quotes - $1 where userid = $2;`, [
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
//# sourceMappingURL=quotes.js.map
