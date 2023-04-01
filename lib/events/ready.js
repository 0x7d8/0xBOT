var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ready_exports = {};
__export(ready_exports, {
  default: () => ready_default
});
module.exports = __toCommonJS(ready_exports);
var import_discord = require("discord.js");
var import_promises = require("timers/promises");
var import_axios = __toESM(require("axios"));
var import_simple_git = __toESM(require("simple-git"));
var import_config = __toESM(require("@config"));
var import_pg = __toESM(require("pg"));
var bot = __toESM(require("@/functions/bot"));
const git = (0, import_simple_git.default)();
const db = new import_pg.default.Pool({
  host: import_config.default.database.oxbot.host,
  database: import_config.default.database.oxbot.database,
  user: import_config.default.database.oxbot.username,
  password: import_config.default.database.oxbot.password,
  port: 5432,
  ssl: true
});
var ready_default = {
  name: "START BOT",
  event: import_discord.Events.ClientReady,
  once: true,
  async execute(client, timed) {
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] STARTED AND LOGGED IN AS ${client.user?.tag} (${timed}ms)`);
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [END] $$$$$ LOADED 0xBOT ${import_config.default.version}`);
    console.log(" ");
    const dblReq = await (0, import_axios.default)({
      method: "POST",
      url: `https://discordbotlist.com/api/v1/bots/${import_config.default.client.id}/commands`,
      validateStatus: () => true,
      headers: {
        Authorization: import_config.default.web.keys.dbl.apikey
      },
      data: client.commands.map((command) => ({ ...command.data, type: 1 }))
    });
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] [${dblReq.status}] POSTED COMMANDS TO DBL`);
    console.log(" ");
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [STA] $$$$$ STARTED LOGGING OF COMMANDS AND ERRORS`);
    console.log(" ");
    while (!+[]) {
      client.user?.setActivity(`${client.guilds.cache.size} Servers`, { type: import_discord.ActivityType.Watching });
      await (0, import_promises.setTimeout)(2e4);
      client.user?.setActivity(`${(await git.log()).total} Commits`, { type: import_discord.ActivityType.Watching });
      await (0, import_promises.setTimeout)(2e4);
      client.user?.setActivity(`${await bot.stat.get("t-all", "cmd")} Commands Used`, { type: import_discord.ActivityType.Watching });
      await (0, import_promises.setTimeout)(1e4);
      client.user?.setActivity(`${await bot.stat.get("t-all", "btn")} Buttons Clicked`, { type: import_discord.ActivityType.Watching });
      await (0, import_promises.setTimeout)(2e4);
      const rawvalues = await db.query(`select * from usermoney;`);
      let total = 0;
      rawvalues.rows.forEach((user) => total += Number(user.money));
      client.user?.setActivity(`$${total} in Circulation`, { type: import_discord.ActivityType.Watching });
      await (0, import_promises.setTimeout)(2e4);
      try {
        const req = await (0, import_axios.default)({
          method: "GET",
          url: "https://status.0xbot.de/api/status-page/heartbeat/all",
          validateStatus: false,
          headers: {}
        });
        const res = req.data;
        client.user.setActivity(`${Math.round(res.uptimeList["1_24"] * 100 * 100) / 100}% Bot Uptime`, { type: import_discord.ActivityType.Watching });
        await (0, import_promises.setTimeout)(2e4);
      } catch (err) {
      }
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ready.js.map
