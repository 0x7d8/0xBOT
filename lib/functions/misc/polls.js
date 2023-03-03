"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.set = exports.get = void 0;
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
const get = async (messageId, userId) => {
const data = await db.query(`select vote from userpolls where messageid = $1 and userid = $2;`, [messageId, userId]);
if (data.rowCount !== 1)
return '';
return data.rows[0].vote;
};
exports.get = get;
const set = async (messageId, userId, value) => {
const data = await db.query(`select null from userpolls where messageid = $1 and userid = $2;`, [messageId, userId]);
if (data.rowCount !== 1) {
await db.query(`insert into userpolls values ($1, $2, $3)`, [
messageId,
userId,
value
]);
}
else {
await db.query(`update userpolls set vote = $1 where messageId = $2 and userId = $3;`, [
value,
messageId,
userId
]);
}
};
exports.set = set;
const del = async (messageId, userId) => {
await db.query(`delete from userpolls where messageid = $1 and userid = $2;`, [messageId, userId]);
};
exports.del = del;
//# sourceMappingURL=polls.js.map