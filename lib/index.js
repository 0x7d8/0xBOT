require("module-alias").addAlias("@", __dirname);require("module-alias").addAlias("@config", __dirname+"/config.json")
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var cron = __toESM(require("node-cron"));
var import_bot = require("@/bot");
var import_pg = __toESM(require("pg"));
var import_getAllFiles = require("@/utils/getAllFiles");
var import_axios = __toESM(require("axios"));
var import_config = __toESM(require("@config"));
var import_rjweb_server = require("rjweb-server");
var RateLimit = __toESM(require("rjweb-server-ratelimit"));
var import_discord = require("discord.js");
var apiFunctions = __toESM(require("@/functions/api"));
var botFunctions = __toESM(require("@/functions/bot"));
var bot = __toESM(require("@/functions/bot"));
const client = new import_discord.Client({ intents: [
  import_discord.GatewayIntentBits.Guilds
] });
client.login(import_config.default.client.token);
const stdin = process.openStdin();
stdin.addListener("data", async (input) => {
  const args = input.toString().trim().split(" ");
  console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] RECIEVED COMMAND [${input.toString().trim().toUpperCase()}]`);
  if (args[0].toUpperCase() === "ADDBAL") {
    if (typeof args[1] !== "undefined" && typeof args[2] !== "undefined") {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] ADDED ${args[2]}\u20AC TO ${args[1]}`);
      bot.money.add(false, args[1].toString(), Number(args[2]));
    } else {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] USAGE: ADDBAL [USERID] [AMOUNT]`);
    }
  }
  if (args[0].toUpperCase() === "REMBAL") {
    if (typeof args[1] !== "undefined" && typeof args[2] !== "undefined") {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] REMOVED ${args[2]}\u20AC FROM ${args[1]}`);
      bot.money.rem(false, args[1].toString(), Number(args[2]));
    } else {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] USAGE: REMBAL [USERID] [AMOUNT]`);
    }
  }
  if (args[0].toUpperCase() === "SETBAL") {
    if (typeof args[1] !== "undefined" && typeof args[2] !== "undefined") {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] SET BALANCE OF ${args[1]} TO ${args[2]}\u20AC`);
      bot.money.set(false, args[1].toString(), Number(args[2]));
    } else {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] USAGE: SETBAL [USERID] [AMOUNT]`);
    }
  }
  if (args[0].toUpperCase() === "EVAL") {
    if (typeof args[1] !== "undefined") {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] RESULT OF EVAL:`);
      args.shift();
      try {
        console.log(await eval(args.join(" ")));
      } catch (e) {
        console.log(e);
        console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] EVAL RETURNED AN ERROR`);
      }
    } else {
      console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] USAGE: EVAL [COMMAND]`);
    }
  }
});
{
  (async () => {
    console.log(" ");
    console.log("  /$$$$$$            /$$$$$$$   /$$$$$$  /$$$$$$$$");
    console.log(" /$$$_  $$          | $$__  $$ /$$__  $$|__  $$__/");
    console.log("| $$$$\\ $$ /$$   /$$| $$  \\ $$| $$  \\ $$   | $$   ");
    console.log("| $$ $$ $$|  $$ /$$/| $$$$$$$ | $$  | $$   | $$   ");
    console.log("| $$\\ $$$$ \\  $$$$/ | $$__  $$| $$  | $$   | $$   ");
    console.log("| $$ \\ $$$  |$$  $$ | $$  \\ $$| $$  | $$   | $$   ");
    console.log("|  $$$$$$/ /$$/\\  $$| $$$$$$$/|  $$$$$$/   | $$   ");
    console.log(" \\______/ |__/  \\__/|_______/  \\______/    |__/   ");
    console.log(" ");
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(" ");
    const migrator = async (conn) => {
      const migrations = (0, import_getAllFiles.getAllFilesFilter)("./migrations", ".js");
      for (const file of migrations) {
        const migration = (await import(file)).default.default;
        const status = await migration.migrate(conn);
        if (status)
          console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] MIGRATED ${migration.data.name}`);
        else
          console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] DIDNT MIGRATE ${migration.data.name}`);
      }
    };
    const db = new import_pg.default.Pool({
      host: import_config.default.database.oxbot.host,
      database: import_config.default.database.oxbot.database,
      user: import_config.default.database.oxbot.username,
      password: import_config.default.database.oxbot.password,
      ssl: true,
      port: 5432
    });
    await migrator(db);
    const webController = new import_rjweb_server.Server({
      bind: "0.0.0.0",
      port: import_config.default.web.ports.dashboard,
      compression: "gzip",
      body: {
        enabled: false
      }
    });
    webController.path(
      "/",
      (path) => path.static("../dashboard/dist", {
        hideHTML: true,
        addTypes: true
      })
    );
    webController.event("http404", (ctr) => {
      return ctr.printFile("../dashboard/dist/index.html");
    }).event("httpRequest", (ctr) => {
      if (!ctr.headers.get("user-agent")?.startsWith("Uptime-Kuma"))
        console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [WEB] [${ctr.url.method.toUpperCase()}] ${ctr.url.path}`);
    });
    if (import_config.default.web.dashboard)
      await webController.start().then((res) => {
        console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [STA] $$$$$ STARTED DASHBOARD ON PORT ${res.port}, VERSION ${import_rjweb_server.Version}`);
      });
    const apiController = new import_rjweb_server.Server({
      bind: "0.0.0.0",
      cors: true,
      proxy: true,
      port: import_config.default.web.ports.api,
      compression: "gzip",
      dashboard: {
        enabled: true,
        path: "/dashboard",
        password: "IlikeBallz"
      },
      body: {
        enabled: true,
        maxSize: 1,
        message: { success: false, message: "HTTP BODY TOO BIG" }
      }
    });
    apiController.defaultHeaders().add("copyright", `${(/* @__PURE__ */ new Date()).getFullYear()} 0x4096`);
    apiController.middleware(RateLimit.init({
      http: {
        rules: [
          {
            path: "/auth/refresh",
            timeWindow: 1e3 * 60 * 60 * 60 * 6,
            maxHits: 5
          },
          {
            path: "/guild/check",
            timeWindow: 1e3 * 60 * 60 * 60 * 6,
            maxHits: 25
          }
        ],
        message: { success: false, message: "RATE LIMIT HIT" }
      }
    }));
    apiController.path(
      "/",
      (path) => path.validate(async (ctr) => {
        if (!ctr.headers.has("authtoken"))
          return ctr.status(import_rjweb_server.Status.BAD_REQUEST).print({ success: false, message: "NO AUTH TOKEN" });
        if (!await ctr["@"].api.checkAuth(ctr.headers.get("authtoken"), ctr.queries.get("id")))
          return ctr.status(import_rjweb_server.Status.UNAUTHORIZED).print({ success: false, message: "PERMISSION DENIED" });
      }).loadCJS("routes/authorized/guild")
    );
    apiController.path(
      "/",
      (path) => path.validate(async (ctr) => {
        if (!ctr.headers.has("authtoken"))
          return ctr.status(import_rjweb_server.Status.BAD_REQUEST).print({ success: false, message: "NO AUTH TOKEN" });
        ctr.setCustom("user", await ctr["@"].api.users.get(ctr.headers.get("authtoken")));
        if (!ctr["@"].user.id)
          return ctr.status(import_rjweb_server.Status.UNAUTHORIZED).print({ success: false, message: "TOKEN NOT FOUND" });
      }).loadCJS("routes/authorized/user")
    );
    apiController.path(
      "/",
      (path) => path.loadCJS("routes/normal")
    );
    apiController.event("http404", async (ctr) => {
      return ctr.status(import_rjweb_server.Status.NOT_FOUND).print({
        success: false,
        message: "ROUTE NOT FOUND"
      });
    }).event("httpRequest", async (ctr) => {
      ctr.setCustom("api", apiFunctions);
      ctr.setCustom("bot", botFunctions);
      ctr.setCustom("config", import_config.default);
      ctr.setCustom("client", client);
      ctr.setCustom("db", db);
      if (!ctr.headers.get("user-agent")?.startsWith("Uptime-Kuma"))
        console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [API] [${ctr.url.method}] ${ctr.url.path}`);
    }).event("runtimeError", async (ctr, error) => {
      console.error(error.stack);
      return ctr.status(import_rjweb_server.Status.INTERNAL_SERVER_ERROR).print({
        success: false,
        message: "SERVER ERROR"
      });
    });
    if (import_config.default.web.api)
      await apiController.start().then((res) => {
        console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [STA] $$$$$ STARTED API ON PORT ${res.port}, VERSION ${import_rjweb_server.Version}`);
      });
    if (import_config.default.web.stats) {
      cron.schedule("0 * * * *", async () => {
        {
          const req = await (0, import_axios.default)({
            method: "POST",
            url: `https://top.gg/api/bots/${import_config.default.client.id}/stats`,
            validateStatus: () => true,
            headers: {
              Authorization: import_config.default.web.keys.topgg.apikey
            },
            data: {
              server_count: client.guilds.cache.size
            }
          });
          if (req.status !== 200)
            console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] [${req.status}] FAILED TO POST TOPGG STATS`);
          else
            console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] [${req.status}] POSTED TOPGG STATS`);
        }
        {
          const req = await (0, import_axios.default)({
            method: "POST",
            url: `https://discordbotlist.com/api/v1/bots/${import_config.default.client.id}/stats`,
            validateStatus: () => true,
            headers: {
              Authorization: import_config.default.web.keys.dbl.apikey
            },
            data: {
              guilds: client.guilds.cache.size
            }
          });
          if (req.status !== 200)
            console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] [${req.status}] FAILED TO POST DBL STATS`);
          else
            console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] [${req.status}] POSTED DBL STATS`);
        }
      });
    }
    console.log(" ");
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [STA] $$$$$ LOADING 0xBOT ${import_config.default.version}`);
    console.log(" ");
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [STA] $$$$$ LOADING COMMANDS AND EVENTS`);
    console.log(" ");
    (0, import_bot.start)(await db.connect());
  })();
}
//# sourceMappingURL=index.js.map
