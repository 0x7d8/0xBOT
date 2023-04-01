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
  apis: () => apis,
  bomb: () => bomb,
  businesses: () => businesses,
  cooldown: () => cooldown,
  error: () => error,
  game: () => game,
  getOption: () => getOption,
  inRange: () => inRange,
  isNumber: () => isNumber,
  items: () => items,
  language: () => language,
  log: () => log,
  memory: () => memory,
  money: () => money,
  perAdd: () => perAdd,
  perCalc: () => perCalc,
  polls: () => polls,
  quotes: () => quotes,
  random: () => random,
  rps: () => rps,
  settings: () => settings,
  stat: () => stat2,
  stats: () => stats,
  stocks: () => stocks,
  transactions: () => transactions,
  ttt: () => ttt,
  userdb: () => userdb,
  votes: () => votes
});
module.exports = __toCommonJS(bot_exports);
var import_discord = require("discord.js");
var stat = __toESM(require("./stats"));
var utils = __toESM(require("rjutils-collection"));
var fs = __toESM(require("fs"));
var stat2 = __toESM(require("./stats"));
var apis = __toESM(require("./misc/apis"));
var votes = __toESM(require("./misc/votes"));
var quotes = __toESM(require("./misc/quotes"));
var polls = __toESM(require("./misc/polls"));
var userdb = __toESM(require("./misc/userdb"));
var settings = __toESM(require("./misc/settings"));
var language = __toESM(require("./misc/language"));
var cooldown = __toESM(require("./misc/cooldown"));
var items = __toESM(require("./economy/items"));
var money = __toESM(require("./economy/money"));
var stocks = __toESM(require("./economy/stocks"));
var businesses = __toESM(require("./economy/businesses"));
var transactions = __toESM(require("./economy/transactions"));
const inRange = (x, min, max) => {
  return (x - min) * (x - max) <= 0;
};
const perAdd = (value, percent) => {
  const percentage = percent / 100 * value;
  return value + percentage;
};
const perCalc = (newVal, oldVal) => {
  let res = (newVal - oldVal) / oldVal * 100;
  res = Math.round(res * 10) / 10;
  return (res < 0 ? "" : "+") + res;
};
const random = utils.randomNum;
const log = (type, uid, gid, msg) => {
  if (!type)
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${uid} @ ${gid}] ${msg}`);
  else
    console.log(`[0xBOT] [!] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [${uid} @ ${gid}] ${msg}`);
};
const getOption = (interaction, option) => {
  if (!interaction.options.get(option))
    return null;
  else
    return interaction.options.get(option).value;
};
const isNumber = (string) => {
  return [...string].every((c) => "0123456789".includes(c));
};
const stats = (type, uid, gid) => {
  stat.add("t-all", type, 1);
  stat.add("g-" + gid, type, 1);
  stat.add("u-" + uid, type, 1);
};
const error = async (interaction, client, error2, type, language2, vote) => {
  if (!interaction.guild)
    return;
  const errorid = utils.randomStr({
    length: 8,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: false,
    exclude: ""
  });
  if (!fs.existsSync("logs"))
    fs.mkdirSync("logs");
  console.log("[0xBOT] [!] [" + (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false }) + "] [" + interaction.user.id + " @ " + interaction.guild.id + "] [" + type.toUpperCase() + "] ERROR : " + errorid + " :");
  console.error(error2);
  const day = ("0" + (/* @__PURE__ */ new Date()).getDate()).slice(-2);
  const month = ("0" + ((/* @__PURE__ */ new Date()).getMonth() + 1)).slice(-2);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  fs.appendFileSync(`logs/error${day}-${month}-${year}.log`, "[0xBOT] [!] [" + (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false }) + "] [" + interaction.user.id + " @ " + interaction.guild.id + "] [" + type.toUpperCase() + "] ERROR : " + errorid + " :\n");
  fs.appendFileSync(`logs/error${day}-${month}-${year}.log`, error2.stack + "\n\n");
  let word = "";
  switch (type) {
    case "cmd":
      word = "this Command";
      if (language2 === "de")
        word = "dieses Befehls";
      break;
    case "btn":
      word = "this Button";
      if (language2 === "de")
        word = "dieses Buttons";
      break;
    case "mod":
      word = "this Modal";
      if (language2 === "de")
        word = "dieser Modal";
      break;
    default:
      word = "this Event";
      if (language2 === "de")
        word = "dieses Events";
      break;
  }
  let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`
			\xBB <:ERROR:1020414987291861022> An Error has occured while executing ${word}.
			The Error has been logged and will be fixed soon!
		`).setFooter({ text: "\xBB " + vote + " \xBB " + client.config.version + " \xBB ERROR: " + errorid });
  if (language2 === "de") {
    message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`
				\xBB <:ERROR:1020414987291861022> Ein Fehler ist beim ausf\xFChren ${word} aufgetreten.
				Der Fehler wurde geloggt und wird bald behoben!
			`).setFooter({ text: "\xBB " + vote + " \xBB " + client.config.version + " \xBB FEHLER: " + errorid });
  }
  await interaction.reply({ embeds: [message], ephemeral: true });
};
const bomb = /* @__PURE__ */ new Map();
const game = /* @__PURE__ */ new Map();
const memory = /* @__PURE__ */ new Map();
const rps = /* @__PURE__ */ new Map();
const ttt = /* @__PURE__ */ new Map();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apis,
  bomb,
  businesses,
  cooldown,
  error,
  game,
  getOption,
  inRange,
  isNumber,
  items,
  language,
  log,
  memory,
  money,
  perAdd,
  perCalc,
  polls,
  quotes,
  random,
  rps,
  settings,
  stat,
  stats,
  stocks,
  transactions,
  ttt,
  userdb,
  votes
});
//# sourceMappingURL=bot.js.map
