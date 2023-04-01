var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var set_usertransactions_timestamp_bigint_exports = {};
__export(set_usertransactions_timestamp_bigint_exports, {
  default: () => set_usertransactions_timestamp_bigint_default
});
module.exports = __toCommonJS(set_usertransactions_timestamp_bigint_exports);
const migid = 19;
const migna = "SET USERTRANSACTIONS TIMESTAMP BIGINT";
var set_usertransactions_timestamp_bigint_default = {
  data: {
    "name": migna
  },
  async migrate(db) {
    const status = await db.query(`select id from migrations where id = ${migid};`);
    if (status.rowCount !== 1) {
      await db.query(`alter table usertransactions alter column timestamp type bigint;`);
      await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
      return true;
    }
    ;
    return false;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=0019_set-usertransactions-timestamp-bigint.js.map
