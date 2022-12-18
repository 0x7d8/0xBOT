"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rem = exports.add = exports.set = exports.get = void 0;
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
const get = async (userId, stock, type) => {
    const data = await db.query(`select value from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ]);
    if (data.rowCount !== 1 && type === 'used')
        return 0;
    if (data.rowCount !== 1 && type === 'max')
        return 10;
    return Number(data.rows[0].value);
};
exports.get = get;
const set = async (userId, stock, type, value) => {
    const data = await db.query(`select null from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ]);
    if (data.rowCount !== 1) {
        await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
            userId,
            stock,
            type,
            value
        ]);
    }
    else {
        await db.query(`update userstocks set value = $1 where userid = $2 and stock = $3 and type = $4;`, [
            value,
            userId,
            stock,
            type
        ]);
    }
};
exports.set = set;
const add = async (userId, stock, type, value) => {
    const data = await db.query(`select null from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ]);
    if (data.rowCount !== 1) {
        await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
            userId,
            stock,
            type,
            value
        ]);
        if (type === 'max') {
            await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
                userId,
                stock,
                type
            ]);
        }
    }
    else {
        await db.query(`update userstocks set value = value + $1 where userid = $2 and stock = $3 and type = $4;`, [
            value,
            userId,
            stock,
            type
        ]);
    }
};
exports.add = add;
const rem = async (userId, stock, type, value) => {
    const data = await db.query(`select null from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ]);
    if (data.rowCount !== 1) {
        await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
            userId,
            stock,
            type,
            value
        ]);
    }
    else {
        await db.query(`update userstocks set value = value - $1 where userid = $2 and stock = $3 and type = $4;`, [
            value,
            userId,
            stock,
            type
        ]);
        if (type === 'max') {
            await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
                userId,
                stock,
                type
            ]);
        }
    }
};
exports.rem = rem;
//# sourceMappingURL=stocks.js.map