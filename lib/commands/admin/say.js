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
var say_exports = {};
__export(say_exports, {
  default: () => say_default
});
module.exports = __toCommonJS(say_exports);
var import_discord = require("discord.js");
var import_v10 = require("discord-api-types/v10");
var import_discord2 = require("discord.js");
var say_default = {
  data: new import_discord2.SlashCommandBuilder().setName("say").setDescription("SEND A MESSAGE").setDescriptionLocalizations({
    de: "SENDE EINE NACHRICHT"
  }).setDMPermission(false).setDefaultMemberPermissions(import_v10.PermissionFlagsBits.Administrator),
  async execute(ctx) {
    const modal = new import_discord.ModalBuilder().setCustomId("say").setTitle("EMBED CONTENT");
    let titleInput = new import_discord.TextInputBuilder().setCustomId("say-title").setLabel("Please enter the Title of your Embed.").setMinLength(1).setStyle(import_discord.TextInputStyle.Short);
    let contentInput = new import_discord.TextInputBuilder().setCustomId("say-content").setLabel("Please enter the Content of your Embed.").setMinLength(1).setMaxLength(1e3).setStyle(import_discord.TextInputStyle.Paragraph);
    if (ctx.metadata.language === "de") {
      titleInput = new import_discord.TextInputBuilder().setCustomId("say-title").setLabel("Bitte geb den Titel der Embed an.").setMinLength(1).setStyle(import_discord.TextInputStyle.Short);
      contentInput = new import_discord.TextInputBuilder().setCustomId("say-content").setLabel("Bitte geb den Inhalt der Embed an.").setMinLength(1).setMaxLength(1e3).setStyle(import_discord.TextInputStyle.Paragraph);
    }
    const title = new import_discord.ActionRowBuilder().addComponents(titleInput);
    const content = new import_discord.ActionRowBuilder().addComponents(contentInput);
    modal.addComponents(title, content);
    return ctx.interaction.showModal(modal);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=say.js.map
