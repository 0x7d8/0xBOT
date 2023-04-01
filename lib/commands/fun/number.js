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
var number_exports = {};
__export(number_exports, {
  default: () => number_default
});
module.exports = __toCommonJS(number_exports);
var import_discord = require("discord.js");
var number_default = {
  data: new import_discord.SlashCommandBuilder().setName("number").setDMPermission(false).setDescription("GENERATE A NUMBER").setDescriptionLocalizations({
    de: "GENERIERE EINE NUMMER"
  }).addIntegerOption((option) => option.setName("min").setDescription("THE MIN AMOUNT").setDescriptionLocalizations({
    de: "DAS MINIMUM"
  }).setRequired(true)).addIntegerOption((option) => option.setName("max").setDescription("THE MAX AMOUNT").setDescriptionLocalizations({
    de: "DAS MAXIMUM"
  }).setRequired(true)),
  async execute(ctx) {
    const min = ctx.getOption("min");
    const max = ctx.getOption("max");
    const res = ctx.bot.random(min, max);
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB RANDOM NUMBER").setDescription(`\xBB Between **${min}** and **${max}** I choose **${res}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB ZUF\xC4LLIGE NUMMER").setDescription(`\xBB Zwischen **${min}** und **${max}** w\xE4hle ich **${res}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] NUMBER : ${min} : ${max} : ${res}`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=number.js.map
