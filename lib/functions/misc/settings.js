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
var settings_exports = {};
__export(settings_exports, {
  get: () => get,
  set: () => set
});
module.exports = __toCommonJS(settings_exports);
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
const get = async (guildId, setting) => {
  const data = await db.query(`select value from guildsettings where guildid = $1 and setting = $2;`, [guildId, setting]);
  if (data.rowCount !== 1)
    return true;
  return data.rows[0].value;
};
const set = async (guildId, setting, value) => {
  const data = await db.query(`select null from guildsettings where guildid = $1 and setting = $2;`, [guildId, setting]);
  if (data.rowCount !== 1) {
    await db.query(`insert into guildsettings values ($1, $2, $3)`, [
      guildId,
      setting,
      value
    ]);
  } else {
    await db.query(`update guildsettings set value = $1 where guildid = $2 and setting = $3;`, [
      value,
      guildId,
      setting
    ]);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get,
  set
});
//# sourceMappingURL=settings.js.map
