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
    name: "item-no"
  },
  async execute(ctx, itemid, userid, type, amount) {
    let name;
    if (itemid === "nbomb")
      name = "<:NBOMB:1021783222520127508> NORMAL BOMB";
    if (itemid === "mbomb")
      name = "<:MBOMB:1021783295211601940> MEDIUM BOMB";
    if (itemid === "hbomb")
      name = "<:HBOMB:1022102357938536458> HYPER BOMB";
    if (itemid === "cbomb")
      name = "<:CBOMB:1021783405161091162> CRAZY BOMB";
    if (ctx.metadata.language == "de") {
      if (itemid === "nbomb")
        name = "<:NBOMB:1021783222520127508> NORMALE BOMBE";
      if (itemid === "mbomb")
        name = "<:MBOMB:1021783295211601940> MEDIUM BOMBE";
      if (itemid === "hbomb")
        name = "<:HBOMB:1022102357938536458> HYPER BOMBE";
      if (itemid === "cbomb")
        name = "<:CBOMB:1021783405161091162> CRAZY BOMBE";
    }
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] ITEMBUY : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ctx.components.rows[0].components[0].setDisabled(true);
    ctx.components.rows[0].components[1].setDisabled(true);
    ctx.components.rows[0].components[0].setStyle(2);
    if (type === "buy") {
      let message;
      if (amount === 1) {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY ITEM").setDescription(`\xBB <@${ctx.interaction.user.id}> said **NO** to a **${name}**.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GEGENSTAND KAUFEN").setDescription(`\xBB <@${ctx.interaction.user.id}> hat **NEIN** zu einer **${name}** gesagt.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
      } else {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY ITEMS").setDescription(`\xBB <@${ctx.interaction.user.id}> said **NO** to **${amount}x** **${name}**.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GEGENST\xC4NDE KAUFEN").setDescription(`\xBB <@${ctx.interaction.user.id}> hat **NEIN** zu **${amount}x** **${name}** gesagt.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
      }
      ctx.log(false, `[BTN] ITEMBUY : ${amount}x : ${itemid.toUpperCase()} : DENY`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    } else if (type === "sell") {
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=no.js.map
