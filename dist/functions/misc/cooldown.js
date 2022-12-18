"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = void 0;
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
const get = async (userId, name) => {
    const data = await db.query(`select expires from usercooldowns where userid = $1 and name = $2;`, [userId, name]);
    if (data.rowCount !== 1)
        return {
            onCooldown: false,
            remaining: 0
        };
    if (Number(data.rows[0].expires) - Date.now() < 0) {
        await db.query(`delete from usercooldowns where name = $1;`, [name]);
        return {
            onCooldown: false,
            remaining: 0
        };
    }
    return {
        onCooldown: true,
        remaining: Number(data.rows[0].expires) - Date.now()
    };
};
exports.get = get;
const set = async (userId, name, duration) => {
    const expires = Date.now() + duration;
    await db.query(`insert into usercooldowns values ($1, $2, $3)`, [
        name,
        userId,
        expires
    ]);
};
exports.set = set;
//# sourceMappingURL=cooldown.js.map