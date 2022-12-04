"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.set = exports.get = void 0;
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
const get = async (name, type) => {
    const data = await db.query(`select * from stats where name = $1 and type = $2;`, [name, type]);
    if (data.rowCount !== 1)
        return 0;
    return data.rows[0].value;
};
exports.get = get;
const set = async (name, type, value) => {
    const data = await db.query(`select * from stats where name = $1 and type = $2;`, [name, type]);
    if (data.rowCount !== 1) {
        await db.query(`insert into stats values ($1, $2, $3)`, [
            name,
            type,
            value
        ]);
    }
    else {
        await db.query(`update stats set value = $1 where name = $2 and type = $3;`, [
            value,
            name,
            type
        ]);
    }
};
exports.set = set;
const add = async (name, type, value) => {
    const data = await db.query(`select * from stats where name = $1 and type = $2;`, [name, type]);
    if (data.rowCount !== 1) {
        await db.query(`insert into stats values ($1, $2, $3)`, [
            name,
            type,
            value
        ]);
    }
    else {
        await db.query(`update stats set value = value + $1 where name = $2 and type = $3;`, [
            value,
            name,
            type
        ]);
    }
};
exports.add = add;
//# sourceMappingURL=stats.js.map