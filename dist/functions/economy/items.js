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
    const data = await db.query(`select value, amount from useritems where userid = $1;`, [userId]);
    if (data.rowCount !== 1)
        return 0;
    if (type === null)
        return data.rows[0];
    else if (type === 'value')
        return data.rows[0].value;
    else
        return Number(data.rows[0].amount);
};
exports.get = get;
const set = async (userId, value, amount) => {
    const data = await db.query(`select null from useritems where userid = $1;`, [userId]);
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, $2, $3)`, [
            userId,
            value,
            amount
        ]);
    }
    else {
        if (!value) {
            await db.query(`update useritems set amount = $1 where userid = $2;`, [
                amount,
                userId
            ]);
        }
        else {
            await db.query(`update useritems set value = $1 and amount = $2 where userid = $3;`, [
                value,
                amount,
                userId
            ]);
        }
    }
};
exports.set = set;
const add = async (userId, amount) => {
    const data = await db.query(`select null from useritems where userid = $1;`, [userId]);
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, 0, $2)`, [
            userId,
            amount
        ]);
    }
    else {
        await db.query(`update useritems set amount = amount + $1 where userid = $2;`, [
            amount,
            userId
        ]);
    }
};
exports.add = add;
const rem = async (userId, amount) => {
    const data = await db.query(`select null from useritems where userid = $1;`, [userId]);
    if (data.rowCount !== 1) {
        await db.query(`insert into useritems values ($1, 0, 0)`, [
            userId
        ]);
    }
    else {
        await db.query(`update useritems set amount = amount - $1 where userid = $2;`, [
            amount,
            userId
        ]);
    }
};
exports.rem = rem;
const del = async (userId) => {
    await db.query(`delete from useritems where userId = $1;`, [userId]);
};
exports.del = del;
//# sourceMappingURL=items.js.map