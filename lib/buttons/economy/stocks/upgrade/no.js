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
var no_exports = {};
__export(no_exports, {
  default: () => no_default
});
module.exports = __toCommonJS(no_exports);
var import_discord = require("discord.js");
var no_default = {
  data: {
    name: "stockupgrade-no"
  },
  async execute(ctx, stock, userid, amount) {
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] STOCKUPGRADE : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    let emoji;
    if (stock === "green")
      emoji = "\u{1F7E2}";
    if (stock === "blue")
      emoji = "\u{1F535}";
    if (stock === "yellow")
      emoji = "\u{1F7E1}";
    if (stock === "red")
      emoji = "\u{1F534}";
    if (stock === "white")
      emoji = "\u26AA";
    if (stock === "black")
      emoji = "\u26AB";
    ctx.components.rows[0].components[0].setDisabled(true);
    ctx.components.rows[0].components[1].setDisabled(true);
    ctx.components.rows[0].components[0].setStyle(2);
    const type = "buy";
    if (type === "buy") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY STOCK SLOTS").setDescription(`\xBB <@${ctx.interaction.user.id}> said **NO** to **${amount}x** ${emoji} Slots.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AKTIEN SLOTS KAUFEN").setDescription(`\xBB <@${ctx.interaction.user.id}> hat **NEIN** zu **${amount}x** ${emoji} Slots gesagt.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] STOCKUPGRADE : ${amount}x : ${stock.toUpperCase()} : DENY`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=no.js.map
