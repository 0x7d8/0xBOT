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
var messagesend_exports = {};
__export(messagesend_exports, {
  default: () => messagesend_default
});
module.exports = __toCommonJS(messagesend_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var bot = __toESM(require("@/functions/bot"));
var messagesend_default = {
  name: "MESSAGE SEND",
  event: import_discord2.Events.MessageCreate,
  once: false,
  async execute(message, client) {
    if (!message.guildId)
      return;
    const guildlang = await bot.language.get(message.guildId);
    if (message.content === `<@${client.config.client.id}>`) {
      if (guildlang === "de")
        return message.reply({ content: "Ich nutze Slash Befehle, schreib `/` und seh!" });
      else
        return message.reply({ content: "I use slash commands, type `/` and see!" });
    }
    if (!message.author.bot && Number(message.guildId) > 1e3 && await bot.settings.get(message.guildId, "level")) {
      const oldCache = await bot.stat.get("u-" + message.author.id + "-" + message.guildId + "-C", "msg");
      const oldXP = Math.round(oldCache / 5);
      let oldLevel = 0, oldLevelXP = oldXP;
      while (oldLevelXP >= 500) {
        oldLevel++;
        oldLevelXP -= 500;
      }
      await bot.stat.add(`u-${message.author.id}-TOTAL-A`, "msg", 1);
      await bot.stat.add(`u-${message.author.id}-${message.guildId}-A`, "msg", 1);
      await bot.stat.add(`u-${message.author.id}-TOTAL-C`, "msg", message.content.length > 1e3 ? 100 : message.content.length);
      await bot.stat.add(`u-${message.author.id}-${message.guildId}-C`, "msg", message.content.length > 1e3 ? 100 : message.content.length);
      const newCache = await bot.stat.get("u-" + message.author.id + "-" + message.guildId + "-C", "msg");
      const newXP = Math.round(newCache / 5);
      let newLevel = 0, newLevelXP = newXP;
      while (newLevelXP >= 500) {
        newLevel++;
        newLevelXP -= 500;
      }
      if (oldLevel < newLevel) {
        const row = new import_discord.ActionRowBuilder().addComponents(
          new import_discord.ButtonBuilder().setEmoji("1030476921777180672").setCustomId("rem-levelmsg").setStyle(import_discord.ButtonStyle.Danger)
        );
        let content = `\xBB Good Writing <@${message.author.id}>! You are now Level **${newLevel}**.
To view your level do </level:1030147810194100245>`;
        if (guildlang === "de")
          content = `\xBB Gutes schreiben <@${message.author.id}>! Du bist nun Level **${newLevel}**.
Zum anschauen deines Levels mach </level:1030147810194100245>`;
        return message.reply({ content, components: [row] });
      }
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=messagesend.js.map
