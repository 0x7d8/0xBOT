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
var transactions_exports = {};
__export(transactions_exports, {
  get: () => get,
  log: () => log
});
module.exports = __toCommonJS(transactions_exports);
var import_config = __toESM(require("@config"));
var import_pg = __toESM(require("pg"));
var utils = __toESM(require("rjutils-collection"));
const db = new import_pg.default.Pool({
  host: import_config.default.database.oxbot.host,
  database: import_config.default.database.oxbot.database,
  user: import_config.default.database.oxbot.username,
  password: import_config.default.database.oxbot.password,
  port: 5432,
  ssl: true
});
const get = async (transactionId) => {
  const data = await db.query(`select * from usertransactions where id = $1;`, [transactionId]);
  if (data.rowCount !== 1)
    return "N-FOUND";
  return {
    id: data.rows[0].id,
    success: data.rows[0].success,
    timestamp: data.rows[0].timestamp,
    sender: {
      id: data.rows[0].senderid,
      amount: data.rows[0].senderamount,
      type: data.rows[0].sendertype
    },
    reciever: {
      id: data.rows[0].recieverid,
      amount: data.rows[0].recieveramount,
      type: data.rows[0].recievertype
    }
  };
};
const log = async (json) => {
  const transactionId = utils.randomStr({
    length: 20,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: false,
    exclude: ""
  });
  if (json.sender.id === void 0)
    json.sender = {
      id: "empty",
      amount: 0,
      type: "empty"
    };
  if (json.reciever.id === void 0)
    json.reciever = {
      id: "empty",
      amount: 0,
      type: "empty"
    };
  await db.query(`insert into usertransactions values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
    transactionId,
    json.sender.id,
    json.sender.amount,
    json.sender.type,
    json.reciever.id,
    json.reciever.amount,
    json.reciever.type,
    json.success,
    Math.floor(+/* @__PURE__ */ new Date() / 1e3)
  ]);
  return {
    success: true,
    id: transactionId
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get,
  log
});
//# sourceMappingURL=transactions.js.map
