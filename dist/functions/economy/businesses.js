"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.rem = exports.add = exports.set = exports.get = void 0;
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
const get = async (userId, type) => {
const data = await db.query(`select txtvalue, intvalue from userbusinesses where userid = $1;`, [userId]);
if (data.rowCount !== 1)
return 0;
if (!type)
return data.rows[0].txtvalue;
else
return Number(data.rows[0].intvalue);
};
exports.get = get;
const set = async (userId, value) => {
const data = await db.query(`select null from userbusinesses where userid = $1;`, [userId]);
if (data.rowCount !== 1) {
await db.query(`insert into userbusinesses values ($1, $2, 0)`, [
userId,
value
]);
}
else {
await db.query(`update userbusinesses set txtvalue = $1 where userid = $2;`, [
value,
userId
]);
}
};
exports.set = set;
const add = async (userId, value) => {
const data = await db.query(`select null from userbusinesses where userid = $1;`, [userId]);
if (data.rowCount !== 1) {
await db.query(`insert into userbusinesses values ($1, 0, $2)`, [
userId,
value
]);
}
else {
await db.query(`update userbusinesses set intvalue = intvalue + $1 where userid = $2;`, [
value,
userId
]);
}
};
exports.add = add;
const rem = async (userId, value) => {
const data = await db.query(`select null from userbusinesses where userid = $1;`, [userId]);
if (data.rowCount !== 1) {
await db.query(`insert into userbusinesses values ($1, 0, 0)`, [
userId
]);
}
else {
await db.query(`update userbusinesses set intvalue = intvalue - $1 where userid = $2;`, [
value,
userId
]);
}
};
exports.rem = rem;
const del = async (userId) => {
await db.query(`delete from userbusinesses where userid = $1;`, [userId]);
};
exports.del = del;
//# sourceMappingURL=businesses.js.map