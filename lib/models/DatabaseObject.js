"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = __importDefault(require("@config"));
const pg_1 = __importDefault(require("pg"));
const db = new pg_1.default.Pool({
host: _config_1.default.database.oxbot.host,
database: _config_1.default.database.oxbot.database,
user: _config_1.default.database.oxbot.username,
password: _config_1.default.database.oxbot.password,
port: 5432,
ssl: true
});
class DatabaseObject {
async useControl(search) {
let iteration = 0, whereIteration = 0;
const whereClause = Object.keys(search).map((key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(search).length ? '' : ' and '));
this.where = search;
const { rows } = await db.query(`select * from ${this.infos.table} where ${whereClause.join('')} limit 1`, [
...Object.keys(search).map((key) => search[key])
]);
if (rows.length > 0)
this.data = this.mapColumnsToObject(rows[0]);
else
this.data = this.default;
return { '@': this, ...this.data };
}
async save() {
let iteration = 0, updateIteration = 0, whereIteration = 0;
const updateData = this.mapObjectToColumns(this.data);
const updateClause = Object.keys(updateData).map((key) => `${key} = $${++iteration}` + (++updateIteration === Object.keys(updateData).length ? '' : ', '));
const whereClause = Object.keys(this.where).map((key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? '' : ' and '));
return await db.query(`update ${this.infos.table} set ${updateClause.join('')} where ${whereClause.join('')}`, [
...Object.keys(updateData).map((key) => updateData[key]),
...Object.keys(this.where).map((key) => this.where[key])
]);
}
async update(data) {
let iteration = 0, updateIteration = 0, whereIteration = 0;
const updateData = this.mapObjectToColumns(data);
const updateClause = Object.keys(updateData).map((key) => `${key} = $${++iteration}` + (++updateIteration === Object.keys(updateData).length ? '' : ', '));
const whereClause = Object.keys(this.where).map((key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? '' : ' and '));
return await db.query(`update ${this.infos.table} set ${updateClause.join('')} where ${whereClause.join('')}`, [
...Object.keys(updateData).map((key) => updateData[key]),
...Object.keys(this.where).map((key) => this.where[key])
]);
}
async delete() {
let iteration = 0, whereIteration = 0;
const whereClause = Object.keys(this.where).map((key) => `${key} = $${++iteration}` + (++whereIteration === Object.keys(this.where).length ? '' : ' and '));
return await db.query(`delete from ${this.infos.table} where ${whereClause.join('')}`, [
...Object.keys(this.where).map((key) => this.where[key])
]);
}
mapObjectToColumns(object) {
const result = {};
Object.keys(object).forEach((key) => {
if (typeof this.infos.mapping[key] === 'object') {
Object.keys(this.infos.mapping[key]).forEach((k) => {
result[this.infos.mapping[key][k]] = object[key][k];
});
}
else
result[this.infos.mapping[key]] = object[key];
});
return result;
}
mapColumnsToObject(columns) {
const result = {};
Object.keys(this.infos.mapping).forEach((key) => {
if (key in columns)
result[key] = columns[key];
else if (typeof this.infos.mapping[key] === 'object') {
result[key] = {};
Object.keys(this.infos.mapping[key]).forEach((k) => {
if (k in columns)
result[key][k] = columns[k];
else
result[key][k] = columns[this.infos.mapping[key][k]];
});
}
else
result[key] = columns[this.infos.mapping[key]];
});
return result;
}
}
exports.default = DatabaseObject;
//# sourceMappingURL=DatabaseObject.js.map