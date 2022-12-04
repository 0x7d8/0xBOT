"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = void 0;
// Connect to Database
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
// Get Function
const get = async (guildId, setting) => {
    const data = await db.query(`select * from guildsettings where guildid = $1 and setting = $2;`, [guildId, setting]);
    if (data.rowCount !== 1)
        return true;
    return data.rows[0].value;
};
exports.get = get;
// Set Function
const set = async (guildId, setting, value) => {
    const data = await db.query(`select * from guildsettings where guildid = $1 and setting = $2;`, [guildId, setting]);
    if (data.rowCount !== 1) {
        await db.query(`insert into guildsettings values ($1, $2, $3)`, [
            guildId,
            setting,
            value
        ]);
    }
    else {
        await db.query(`update guildsettings set value = $1 where guildid = $2 and setting = $3;`, [
            value,
            guildId,
            setting
        ]);
    }
};
exports.set = set;
//# sourceMappingURL=settings.js.map