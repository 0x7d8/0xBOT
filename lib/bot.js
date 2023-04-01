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
var bot_exports = {};
__export(bot_exports, {
  start: () => start
});
module.exports = __toCommonJS(bot_exports);
var cron = __toESM(require("node-cron"));
var import_discord = require("discord.js");
var import_getAllFiles = require("@/utils/getAllFiles");
var import_timer = require("@/utils/timer");
var import_config = __toESM(require("@config"));
var bot = __toESM(require("@/functions/bot"));
const sleep = (milliseconds) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
const client = new import_discord.Client({
  intents: [
    import_discord.GatewayIntentBits.Guilds,
    import_discord.GatewayIntentBits.GuildMembers,
    import_discord.GatewayIntentBits.GuildMessages,
    import_discord.GatewayIntentBits.MessageContent,
    import_discord.GatewayIntentBits.GuildVoiceStates
  ]
});
const timer = new import_timer.Timer();
let didload = false;
const login = (client2, commandFiles) => {
  timer.start();
  client2.login(import_config.default.client.token).then(async () => {
    if (import_config.default.client.quickload) {
      timer.stop();
      const commands = [];
      await Promise.all(commandFiles.map(async (file) => {
        const command = (await import(file)).default.default;
        command.data.toJSON();
        commands.push(command.data.toJSON());
      }));
      const clientCommands = commands;
      client2.application?.commands.set(clientCommands);
      const ready = (await import("./events/ready.js")).default.default;
      while (!didload) {
        sleep(500);
      }
      return ready.execute(client2, timer.getTime());
    } else {
      timer.stop();
      const commands = [];
      await Promise.all(commandFiles.map(async (file) => {
        const command = (await import(file)).default.default;
        command.data.toJSON();
        commands.push(command.data.toJSON());
      }));
      const clientCommands = commands;
      client2.application?.commands.set(clientCommands);
      const ready = (await import("./events/ready.js")).default.default;
      return ready.execute(client2, timer.getTime());
    }
  });
};
client.config = import_config.default;
const start = (db) => {
  const fileList = [
    {
      "name": "EVENTS",
      "events": true,
      "files": (0, import_getAllFiles.getAllFilesFilter)("./events", ".js")
    },
    {
      "name": "COMMANDS",
      "events": false,
      "files": (0, import_getAllFiles.getAllFilesFilter)("./commands", ".js")
    },
    {
      "name": "BUTTONS",
      "events": false,
      "files": (0, import_getAllFiles.getAllFilesFilter)("./buttons", ".js")
    },
    {
      "name": "MODALS",
      "events": false,
      "files": (0, import_getAllFiles.getAllFilesFilter)("./modals", ".js")
    }
  ];
  if (import_config.default.client.quickload)
    login(client, (0, import_getAllFiles.getAllFilesFilter)("./commands", ".js"));
  Promise.all(fileList.map(async (list) => {
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] LOADED ${list.files.length} ${list.name}`);
    if (!list.events) {
      client[list.name.toLowerCase()] = new import_discord.Collection();
      await Promise.all(list.files.map(async (file) => {
        const content = (await import(file)).default.default;
        client[list.name.toLowerCase()].set(content.data.name, content);
      }));
    } else {
      await Promise.all(list.files.map(async (file) => {
        const content = (await import(file)).default.default;
        if (import_config.default.client.quickload && content.name.toLowerCase() === "start bot")
          return;
        if (content.once)
          client.once(content.event, (...args) => content.execute(...args));
        else
          client.on(content.event, (...args) => content.execute(...args, client));
      }));
    }
  }));
  console.log(" ");
  console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [END] $$$$$ LOADED COMMANDS AND EVENTS`);
  client.on(import_discord.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit())
      return;
    if (!interaction.guild)
      return;
    bot.userdb.add({
      "avatar": !!interaction.user.avatar ? interaction.user.avatar : "",
      "discriminator": interaction.user.discriminator,
      "username": interaction.user.username,
      "id": interaction.user.id
    });
    const guildlang = await bot.language.get(interaction.guild.id);
    let votet = "VOTED", votev = true;
    const lastVote = await bot.votes.get(interaction.user.id + "-T");
    if (lastVote < Date.now() - 24 * 60 * 60 * 1e3) {
      votet = "NOT VOTED";
      votev = false;
    }
    if (lastVote === 0) {
      votet = "NOT VOTED -> /VOTE";
      votev = false;
    }
    if (guildlang === "de") {
      votet = "GEVOTED";
      if (lastVote < Date.now() - 24 * 60 * 60 * 1e3)
        votet = "NICHT GEVOTET";
      if (lastVote === 0)
        votet = "NICHT GEVOTED -> /VOTE";
    }
    if (interaction.locale === "de")
      bot.language.set(interaction.user.id, "de");
    else
      bot.language.set(interaction.user.id, "en");
    if (interaction.isChatInputCommand()) {
      bot.stats("cmd", interaction.user.id, interaction.guild.id);
      const command = client.commands.get(interaction.commandName);
      if (!command)
        return;
      const ctx = {
        "interaction": interaction,
        "db": db,
        "bot": bot,
        "client": client,
        "getOption": (option) => {
          if (!interaction.options.get(option))
            return null;
          else
            return interaction.options.get(option).value;
        },
        "log": (type, text) => {
          if (!type)
            console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`);
          else
            console.log(`[0xBOT] [!] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`);
        },
        "metadata": {
          "vote": {
            "text": votet,
            "time": lastVote,
            "valid": votev
          },
          "language": guildlang
        }
      };
      try {
        await command.execute(ctx);
      } catch (e) {
        try {
          await bot.error(interaction, client, e, "cmd", guildlang, votet);
        } catch (e2) {
        }
      }
    }
    if (interaction.isModalSubmit()) {
      try {
        bot.stats("mod", interaction.user.id, interaction.guild.id);
        let sc = false;
        const ctx = {
          "interaction": interaction,
          "db": db,
          "bot": bot,
          "client": client,
          "log": (type, text) => {
            if (!type)
              console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`);
            else
              console.log(`[0xBOT] [!] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`);
          },
          "metadata": {
            "vote": {
              "text": votet,
              "time": lastVote,
              "valid": votev
            },
            "language": guildlang
          }
        };
        if (!sc) {
          const modal = client.modals.get(interaction.customId);
          if (!modal)
            return;
          await modal.execute(ctx);
        }
        return;
      } catch (e) {
        try {
          await bot.error(interaction, client, e, "mod", guildlang, votet);
        } catch (e2) {
        }
      }
    }
    if (interaction.isButton()) {
      bot.stats("btn", interaction.user.id, interaction.guild.id);
      const componentRows = [];
      let rowIndex = 0;
      interaction.message.components.forEach((row) => {
        componentRows[rowIndex] = { "components": [] };
        let componentIndex = 0;
        row.components.forEach((component) => {
          componentRows[rowIndex].components[componentIndex++] = import_discord.ButtonBuilder.from(component.data);
        });
        rowIndex++;
      });
      const ctx = {
        "interaction": interaction,
        "db": db,
        "bot": bot,
        "client": client,
        "log": (type, text) => {
          if (!type)
            console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`);
          else
            console.log(`[0xBOT] [!] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${interaction.user.id} @ ${interaction.guild.id}] ${text}`);
        },
        "metadata": {
          "vote": {
            "text": votet,
            "time": lastVote,
            "valid": votev
          },
          "language": guildlang
        },
        "components": {
          "rows": componentRows,
          "getAPI": () => {
            const output = [];
            let rowIndex2 = 0;
            componentRows.forEach((row) => {
              output[rowIndex2++] = new import_discord.ActionRowBuilder().addComponents(...row.components);
            });
            return output;
          }
        }
      };
      try {
        let sc = false;
        const args = interaction.customId.split("-");
        if (args[0] === "BEG") {
          sc = true;
          const button = client.buttons.get("beg");
          await button.execute(ctx, args[1], Number(args[2]), args[3], args[4]);
        }
        ;
        if (args[0] === "RPS") {
          let choice;
          let buttonId = "rps-choice";
          if (args[1] === "1")
            choice = "ROCK";
          if (args[1] === "2")
            choice = "PAPER";
          if (args[1] === "3")
            choice = "SCISSORS";
          if (args[1] === "CANCEL")
            buttonId = "rps-cancel";
          if (args[1] === "YES")
            buttonId = "rps-yes";
          if (args[1] === "NO")
            buttonId = "rps-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, Number(args[2]), choice);
        }
        ;
        if (args[0] === "MEMORY") {
          let buttonId = "memory-choice";
          if (args[1] === "CANCEL")
            buttonId = "memory-cancel";
          if (args[1] === "YES")
            buttonId = "memory-yes";
          if (args[1] === "NO")
            buttonId = "memory-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, Number(args[2]), Number(args[1]));
        }
        ;
        if (args[0] === "TTT") {
          let buttonId = "ttt-choice";
          if (args[1] === "CANCEL")
            buttonId = "ttt-cancel";
          if (args[1] === "YES")
            buttonId = "ttt-yes";
          if (args[1] === "NO")
            buttonId = "ttt-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, Number(args[2]), Number(args[1]));
        }
        ;
        if (args[0] === "BUSINESS") {
          let buttonId;
          if (args[2] === "YES")
            buttonId = "business-yes";
          if (args[2] === "NO")
            buttonId = "business-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, args[3], args[4], args[1].toLowerCase());
        }
        ;
        if (args[0] === "CAR") {
          let buttonId;
          if (args[2] === "YES")
            buttonId = "car-yes";
          if (args[2] === "NO")
            buttonId = "car-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, args[3], args[4], args[1].toLowerCase());
        }
        ;
        if (args[0] === "ITEM") {
          let buttonId;
          if (args[2] === "YES")
            buttonId = "item-yes";
          if (args[2] === "NO")
            buttonId = "item-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, args[3], args[4], args[1].toLowerCase(), Number(args[5]));
        }
        ;
        if (args[0] === "STOCKUPGRADE") {
          let buttonId;
          if (args[2] === "YES")
            buttonId = "stockupgrade-yes";
          if (args[2] === "NO")
            buttonId = "stockupgrade-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, args[3], args[4], Number(args[5]));
        }
        ;
        if (args[0] === "BOMB") {
          sc = true;
          const button = client.buttons.get("item-bomb");
          await button.execute(ctx, args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        ;
        if (args[0] === "COUNT") {
          sc = true;
          const button = client.buttons.get("count");
          await button.execute(ctx, args[1].toLowerCase());
        }
        ;
        if (args[0] === "POLL") {
          sc = true;
          const button = client.buttons.get("poll");
          await button.execute(ctx, args[1].toLowerCase());
        }
        ;
        if (args[0] === "COOLDOWNS") {
          sc = true;
          const button = client.buttons.get("cooldowns");
          await button.execute(ctx, args[1], args[2] === "TRUE");
        }
        ;
        if (args[0] === "COMMITS") {
          sc = true;
          let button;
          if (args[1] === "REFRESH")
            button = client.buttons.get("commits-refresh");
          else
            button = client.buttons.get("commits-page");
          await button.execute(ctx, Number(args[2]), Number(args[3]), args[1].toLowerCase());
        }
        ;
        if (args[0] === "STATS") {
          sc = true;
          let button;
          if (args[1] === "REFRESH")
            button = client.buttons.get("stats-refresh");
          else
            button = client.buttons.get("stats-page");
          await button.execute(ctx, args[2], Number(args[3]), args[4] === "TRUE", args[1].toLowerCase());
        }
        ;
        if (args[0] === "STOCKS") {
          sc = true;
          let button;
          if (args[1] === "REFRESH")
            button = client.buttons.get("stocks-refresh");
          else
            button = client.buttons.get("stocks-page");
          await button.execute(ctx, args[2], Number(args[3]), args[4] === "TRUE", args[1].toLowerCase());
        }
        ;
        if (args[0] === "STOCKINFO") {
          sc = true;
          let button;
          if (args[1] === "REFRESH")
            button = client.buttons.get("stockinfo-refresh");
          else
            button = client.buttons.get("stockinfo-page");
          await button.execute(ctx, Number(args[2]), args[1].toLowerCase());
        }
        ;
        if (args[0] === "STOCK") {
          let buttonId;
          if (args[2] === "REFRESH")
            buttonId = "stock-refresh";
          if (args[2] === "YES")
            buttonId = "stock-yes";
          if (args[2] === "NO")
            buttonId = "stock-no";
          sc = true;
          const button = client.buttons.get(buttonId);
          await button.execute(ctx, args[3], args[4], args[1].toLowerCase(), Number(args[5]));
        }
        if (!sc) {
          const button = client.buttons.get(interaction.customId);
          if (!button)
            return;
          await button.execute(ctx);
        }
        return;
      } catch (e) {
        try {
          await bot.error(interaction, client, e, "btn", guildlang, votet);
        } catch (e2) {
        }
      }
    }
  });
  console.log(" ");
  console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [INF] LOGGING IN...`);
  if (!import_config.default.client.quickload)
    login(client, (0, import_getAllFiles.getAllFilesFilter)("./commands", ".js"));
  else
    didload = true;
  client.stocks = {
    green: 0,
    blue: 0,
    yellow: 0,
    red: 0,
    black: 0,
    white: 0,
    brown: 0,
    purple: 0
  };
  const dostocks = () => {
    client.stocks.oldgreen = client.stocks.green;
    client.stocks.green = (Math.floor(Math.random() * (30 - 25 + 1)) + 25) * (Math.floor(Math.random() * (20 - 15 + 1)) + 15) + (Math.floor(Math.random() * (400 - 350 + 1)) + 350);
    client.stocks.oldblue = client.stocks.blue;
    client.stocks.blue = (Math.floor(Math.random() * (70 - 45 + 1)) + 45) * (Math.floor(Math.random() * (40 - 30 + 1)) + 30) - (Math.floor(Math.random() * (200 - 100 + 1)) + 100);
    client.stocks.oldyellow = client.stocks.yellow;
    client.stocks.yellow = (Math.floor(Math.random() * (90 - 65 + 1)) + 65) * (Math.floor(Math.random() * (60 - 50 + 1)) + 50) + (Math.floor(Math.random() * (200 - 100 + 1)) + 100);
    client.stocks.oldred = client.stocks.red;
    client.stocks.red = (Math.floor(Math.random() * (120 - 105 + 1)) + 105) * (Math.floor(Math.random() * (80 - 70 + 1)) + 70) + (Math.floor(Math.random() * (400 - 100 + 1)) + 100);
    client.stocks.oldwhite = client.stocks.white;
    client.stocks.white = (Math.floor(Math.random() * (150 - 130 + 1)) + 130) * (Math.floor(Math.random() * (120 - 100 + 1)) + 100) + (Math.floor(Math.random() * (600 - 100 + 1)) + 100);
    client.stocks.oldblack = client.stocks.black;
    client.stocks.black = (Math.floor(Math.random() * (250 - 200 + 1)) + 200) * (Math.floor(Math.random() * (170 - 150 + 1)) + 150) + (Math.floor(Math.random() * (800 - 200 + 1)) + 200);
    client.stocks.oldbrown = client.stocks.brown;
    client.stocks.brown = (Math.floor(Math.random() * (270 - 200 + 1)) + 300) * (Math.floor(Math.random() * (200 - 150 + 1)) + 250) + (Math.floor(Math.random() * (1e3 - 200 + 1)) + 200);
    client.stocks.oldpurple = client.stocks.purple;
    client.stocks.purple = (Math.floor(Math.random() * (290 - 200 + 1)) + 350) * (Math.floor(Math.random() * (220 - 150 + 1)) + 300) + (Math.floor(Math.random() * (1200 - 200 + 1)) + 200);
  };
  dostocks();
  cron.schedule("* * * * *", async () => {
    dostocks();
    client.stocks.refresh = Math.floor(+/* @__PURE__ */ new Date() / 1e3) + 60;
  });
  cron.schedule("*/10 * * * *", async () => {
    await db.query(`delete from usercooldowns where expires / 1000 < extract(epoch from now());`);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  start
});
//# sourceMappingURL=bot.js.map
