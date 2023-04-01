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
var items_exports = {};
__export(items_exports, {
  add: () => add,
  del: () => del,
  get: () => get,
  rem: () => rem,
  set: () => set
});
module.exports = __toCommonJS(items_exports);
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
const get = async (userId, type) => {
  const data = await db.query(`select value, amount from useritems where userid = $1;`, [userId]);
  if (data.rowCount !== 1)
    return 0;
  if (type === null)
    return data.rows[0];
  else if (type === "value")
    return data.rows[0].value;
  else
    return Number(data.rows[0].amount);
};
const set = async (userId, value, amount) => {
  const data = await db.query(`select null from useritems where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into useritems values ($1, $2, $3)`, [
      userId,
      value,
      amount
    ]);
  } else {
    if (!value) {
      await db.query(`update useritems set amount = $1 where userid = $2;`, [
        amount,
        userId
      ]);
    } else {
      await db.query(`update useritems set value = $1 and amount = $2 where userid = $3;`, [
        value,
        amount,
        userId
      ]);
    }
  }
};
const add = async (userId, amount) => {
  const data = await db.query(`select null from useritems where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into useritems values ($1, 0, $2)`, [
      userId,
      amount
    ]);
  } else {
    await db.query(`update useritems set amount = amount + $1 where userid = $2;`, [
      amount,
      userId
    ]);
  }
};
const rem = async (userId, amount) => {
  const data = await db.query(`select null from useritems where userid = $1;`, [userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into useritems values ($1, 0, 0)`, [
      userId
    ]);
  } else {
    await db.query(`update useritems set amount = amount - $1 where userid = $2;`, [
      amount,
      userId
    ]);
  }
};
const del = async (userId) => {
  await db.query(`delete from useritems where userId = $1;`, [userId]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  del,
  get,
  rem,
  set
});
//# sourceMappingURL=items.js.map
