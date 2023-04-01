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
var cooldown_exports = {};
__export(cooldown_exports, {
  get: () => get,
  set: () => set
});
module.exports = __toCommonJS(cooldown_exports);
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
const get = async (userId, name) => {
  const data = await db.query(`select expires from usercooldowns where userid = $1 and name = $2;`, [userId, name]);
  if (data.rowCount !== 1)
    return {
      onCooldown: false,
      remaining: 0
    };
  if (Number(data.rows[0].expires) - Date.now() < 0) {
    await db.query(`delete from usercooldowns where name = $1;`, [name]);
    return {
      onCooldown: false,
      remaining: 0
    };
  }
  return {
    onCooldown: true,
    remaining: Number(data.rows[0].expires) - Date.now()
  };
};
const set = async (userId, name, duration) => {
  const expires = Date.now() + duration;
  await db.query(`insert into usercooldowns values ($1, $2, $3)`, [
    name,
    userId,
    expires
  ]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get,
  set
});
//# sourceMappingURL=cooldown.js.map
