var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mcver_exports = {};
__export(mcver_exports, {
  default: () => mcver_default
});
module.exports = __toCommonJS(mcver_exports);
var import_discord = require("discord.js");
var mcver_default = {
  data: new import_discord.SlashCommandBuilder().setName("mcver").setDMPermission(false).setDescription("GENERATE A MINECRAFT VERSION").setDescriptionLocalizations({
    de: "GENERIERE EINE MINECRAFT VERSION"
  }),
  async execute(ctx) {
    const result = ctx.bot.random(1, 20);
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB RANDOM MINECRAFT VERSION").setDescription(`\xBB I would choose **1.${result}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB ZUF\xC4LLIGE MINECRAFT VERSION").setDescription(`\xBB Ich w\xFCrde **1.${result}** nehmen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] MCVER : 1.${result}`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=mcver.js.map
