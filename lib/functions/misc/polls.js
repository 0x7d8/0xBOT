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
var polls_exports = {};
__export(polls_exports, {
  del: () => del,
  get: () => get,
  set: () => set
});
module.exports = __toCommonJS(polls_exports);
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
const get = async (messageId, userId) => {
  const data = await db.query(`select vote from userpolls where messageid = $1 and userid = $2;`, [messageId, userId]);
  if (data.rowCount !== 1)
    return "";
  return data.rows[0].vote;
};
const set = async (messageId, userId, value) => {
  const data = await db.query(`select null from userpolls where messageid = $1 and userid = $2;`, [messageId, userId]);
  if (data.rowCount !== 1) {
    await db.query(`insert into userpolls values ($1, $2, $3)`, [
      messageId,
      userId,
      value
    ]);
  } else {
    await db.query(`update userpolls set vote = $1 where messageId = $2 and userId = $3;`, [
      value,
      messageId,
      userId
    ]);
  }
};
const del = async (messageId, userId) => {
  await db.query(`delete from userpolls where messageid = $1 and userid = $2;`, [messageId, userId]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  del,
  get,
  set
});
//# sourceMappingURL=polls.js.map
