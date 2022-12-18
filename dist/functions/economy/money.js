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
const get = async (userId) => {
    const data = await db.query(`select money from usermoney where userid = $1;`, [userId]);
    if (data.rowCount !== 1)
        return 0;
    return data.rows[0].money;
};
exports.get = get;
const set = async (guildId, userId, value) => {
    const data = await db.query(`select null from usermoney where userid = $1;`, [userId]);
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
            userId,
            value,
            guildId
        ]);
    }
    else {
        if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId]);
        }
        ;
        await db.query(`update usermoney set money = $1 where userid = $2;`, [
            value,
            userId
        ]);
    }
};
exports.set = set;
const add = async (guildId, userId, value) => {
    const data = await db.query(`select null from usermoney where userid = $1;`, [userId]);
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, $2, array[$3]);`, [
            userId,
            value,
            guildId
        ]);
    }
    else {
        if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId]);
        }
        ;
        await db.query(`update usermoney set money = money + $1 where userid = $2;`, [
            value,
            userId
        ]);
    }
};
exports.add = add;
const rem = async (guildId, userId, value) => {
    const data = await db.query(`select null from usermoney where userid = $1;`, [userId]);
    if (data.rowCount !== 1) {
        await db.query(`insert into usermoney values ($1, 0, array[$2]);`, [
            userId,
            guildId
        ]);
    }
    else {
        if (!!guildId && !data.rows[0].guilds.includes(guildId)) {
            await db.query(`update usermoney set guilds = array_append(guilds, $1) where userid = $2;`, [guildId, userId]);
        }
        ;
        await db.query(`update usermoney set money = money - $1 where userid = $2;`, [
            value,
            userId
        ]);
    }
};
exports.rem = rem;
//# sourceMappingURL=money.js.map