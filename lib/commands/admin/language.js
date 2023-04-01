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
var language_exports = {};
__export(language_exports, {
  default: () => language_default
});
module.exports = __toCommonJS(language_exports);
var import_discord = require("discord.js");
var import_v10 = require("discord-api-types/v10");
var language_default = {
  data: new import_discord.SlashCommandBuilder().setName("language").setDescription("CHANGE THE LANGUAGE").setDescriptionLocalizations({
    de: "\xC4NDERE DIE SPRACHE"
  }).setDMPermission(false).addStringOption((option) => option.setName("language").setNameLocalizations({
    de: "sprache"
  }).setDescription("THE LANGUAGE").setDescriptionLocalizations({
    de: "DIE SPRACHE"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F1E9}\u{1F1EA} DEUTSCH", value: "de" },
    { name: "\u{1F1EC}\u{1F1E7} ENGLISH", value: "en" }
  )).setDefaultMemberPermissions(import_v10.PermissionFlagsBits.ManageMessages),
  async execute(ctx) {
    const lang = ctx.getOption("language");
    let langString;
    if (lang === "de")
      langString = "DEUTSCH";
    if (lang === "en")
      langString = "ENGLISH";
    ctx.bot.language.set(ctx.interaction.guild.id, lang);
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB LANGUAGE").setDescription(`\xBB Language successfully set to **${langString}**!`).setFooter({ text: "\xBB " + ctx.client.config.version });
    if (lang === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB SPRACHE").setDescription(`\xBB Sprache erfolgreich auf **${langString}** gesetzt!`).setFooter({ text: "\xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] LANGUAGE : ${langString}`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=language.js.map
