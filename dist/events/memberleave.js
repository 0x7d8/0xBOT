"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
exports.default = {
    name: 'MEMBER LEAVE',
    event: discord_js_1.Events.GuildMemberRemove,
    once: false,
    async execute(interaction) {
        if (!interaction.guild)
            return;
        await db.query(`update usermoney set guilds = array_remove(guilds, $1) where userid = $2;`, [
            interaction.guild.id,
            interaction.user.id
        ]);
    }
};
//# sourceMappingURL=memberleave.js.map