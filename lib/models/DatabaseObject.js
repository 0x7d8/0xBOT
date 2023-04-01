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
var DatabaseObject_exports = {};
__export(DatabaseObject_exports, {
  default: () => DatabaseObject
});
module.exports = __toCommonJS(DatabaseObject_exports);
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
class DatabaseObject {
  /** Use an Object Matching the Search */
  async useControl(search) {
    let iteration = 0, whereIteration = 0;
    const whereClause = Object.keys(search).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(search).length ? "" : " and ")
    );
    this.where = search;
    const { rows } = await db.query(`select * from ${this.infos.table} where ${whereClause.join("")} limit 1`, [
      ...Object.keys(search).map((key) => search[key])
    ]);
    if (rows.length > 0)
      this.data = this.mapColumnsToObject(rows[0]);
    else
      this.data = this.default;
    return { "@": this, ...this.data };
  }
  /** Save an Object */
  async save() {
    let iteration = 0, updateIteration = 0, whereIteration = 0;
    const updateData = this.mapObjectToColumns(this.data);
    const updateClause = Object.keys(updateData).map(
      (key) => `${key} = $${++iteration}` + (++updateIteration === Object.keys(updateData).length ? "" : ", ")
    );
    const whereClause = Object.keys(this.where).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? "" : " and ")
    );
    return await db.query(`update ${this.infos.table} set ${updateClause.join("")} where ${whereClause.join("")}`, [
      ...Object.keys(updateData).map((key) => updateData[key]),
      ...Object.keys(this.where).map((key) => this.where[key])
    ]);
  }
  /** Update an Object Matching the Search */
  async update(data) {
    let iteration = 0, updateIteration = 0, whereIteration = 0;
    const updateData = this.mapObjectToColumns(data);
    const updateClause = Object.keys(updateData).map(
      (key) => `${key} = $${++iteration}` + (++updateIteration === Object.keys(updateData).length ? "" : ", ")
    );
    const whereClause = Object.keys(this.where).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? "" : " and ")
    );
    return await db.query(`update ${this.infos.table} set ${updateClause.join("")} where ${whereClause.join("")}`, [
      ...Object.keys(updateData).map((key) => updateData[key]),
      ...Object.keys(this.where).map((key) => this.where[key])
    ]);
  }
  /** Delete an Object */
  async delete() {
    let iteration = 0, whereIteration = 0;
    const whereClause = Object.keys(this.where).map(
      (key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? "" : " and ")
    );
    return await db.query(`delete from ${this.infos.table} where ${whereClause.join("")}`, [
      ...Object.keys(this.where).map((key) => this.where[key])
    ]);
  }
  mapObjectToColumns(object) {
    const result = {};
    Object.keys(object).forEach((key) => {
      if (typeof this.infos.mapping[key] === "object") {
        Object.keys(this.infos.mapping[key]).forEach((k) => {
          result[this.infos.mapping[key][k]] = object[key][k];
        });
      } else
        result[this.infos.mapping[key]] = object[key];
    });
    return result;
  }
  mapColumnsToObject(columns) {
    const result = {};
    Object.keys(this.infos.mapping).forEach((key) => {
      if (key in columns)
        result[key] = columns[key];
      else if (typeof this.infos.mapping[key] === "object") {
        result[key] = {};
        Object.keys(this.infos.mapping[key]).forEach((k) => {
          if (k in columns)
            result[key][k] = columns[k];
          else
            result[key][k] = columns[this.infos.mapping[key][k]];
        });
      } else
        result[key] = columns[this.infos.mapping[key]];
    });
    return result;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=DatabaseObject.js.map
