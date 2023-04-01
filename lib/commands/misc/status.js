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
var status_exports = {};
__export(status_exports, {
  default: () => status_default
});
module.exports = __toCommonJS(status_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var status_default = {
  data: new import_discord2.SlashCommandBuilder().setName("status").setDMPermission(false).setDescription("GO TO THE STATUS PAGE").setDescriptionLocalizations({
    de: "GEHE ZUR STATUS SEITE"
  }),
  async execute(ctx) {
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("GO").setURL("https://status.0xbot.de").setStyle(import_discord.ButtonStyle.Link)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("LOS").setURL("https://status.0xbot.de").setStyle(import_discord.ButtonStyle.Link)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB STATUS").setDescription(`\xBB Click below to go to the Status Page!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB STATUS").setDescription(`\xBB Klicke unten um zur Status Seite zu gehen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] STATUS`);
    await ctx.interaction.reply({ embeds: [message], components: [row], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=status.js.map
