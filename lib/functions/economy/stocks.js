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
var stocks_exports = {};
__export(stocks_exports, {
  add: () => add,
  get: () => get,
  rem: () => rem,
  set: () => set
});
module.exports = __toCommonJS(stocks_exports);
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
const get = async (userId, stock, type) => {
  const data = await db.query(`select value from userstocks where userid = $1 and stock = $2 and type = $3;`, [
    userId,
    stock,
    type
  ]);
  if (data.rowCount !== 1 && type === "used")
    return 0;
  if (data.rowCount !== 1 && type === "max")
    return 10;
  return Number(data.rows[0].value);
};
const set = async (userId, stock, type, value) => {
  const data = await db.query(`select null from userstocks where userid = $1 and stock = $2 and type = $3;`, [
    userId,
    stock,
    type
  ]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
      userId,
      stock,
      type,
      value
    ]);
  } else {
    await db.query(`update userstocks set value = $1 where userid = $2 and stock = $3 and type = $4;`, [
      value,
      userId,
      stock,
      type
    ]);
  }
};
const add = async (userId, stock, type, value) => {
  const data = await db.query(`select null from userstocks where userid = $1 and stock = $2 and type = $3;`, [
    userId,
    stock,
    type
  ]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
      userId,
      stock,
      type,
      value
    ]);
    if (type === "max") {
      await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
        userId,
        stock,
        type
      ]);
    }
  } else {
    await db.query(`update userstocks set value = value + $1 where userid = $2 and stock = $3 and type = $4;`, [
      value,
      userId,
      stock,
      type
    ]);
  }
};
const rem = async (userId, stock, type, value) => {
  const data = await db.query(`select null from userstocks where userid = $1 and stock = $2 and type = $3;`, [
    userId,
    stock,
    type
  ]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
      userId,
      stock,
      type,
      value
    ]);
  } else {
    await db.query(`update userstocks set value = value - $1 where userid = $2 and stock = $3 and type = $4;`, [
      value,
      userId,
      stock,
      type
    ]);
    if (type === "max") {
      await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
        userId,
        stock,
        type
      ]);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  get,
  rem,
  set
});
//# sourceMappingURL=stocks.js.map
