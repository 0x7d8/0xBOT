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
    name: "car-no"
  },
  async execute(ctx, car, userid, type) {
    let name;
    if (car === "jeep")
      name = "2016 JEEP PATRIOT SPORT";
    if (car === "kia")
      name = "2022 KIA SORENTO";
    if (car === "audi")
      name = "AUDI R8 COUPE V10";
    if (car === "tesla")
      name = "TESLA MODEL Y";
    if (car === "porsche")
      name = "2019 PORSCHE 911 GT2RS";
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] CAR : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ctx.components.rows[0].components[0].setDisabled(true);
    ctx.components.rows[0].components[1].setDisabled(true);
    ctx.components.rows[0].components[0].setStyle(2);
    if (type === "buy") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY CAR").setDescription(`\xBB <@${ctx.interaction.user.id}> said **NO** to a **${name}**.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AUTO KAUFEN").setDescription(`\xBB <@${ctx.interaction.user.id}> hat **NEIN** zu einem **${name}** gesagt.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] CARBUY : ${name} : DENY`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    } else if (type === "sell") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB SELL CAR").setDescription(`\xBB <@${ctx.interaction.user.id}> said **NO** to selling his **${name}**.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB AUTO VERKAUFEN").setDescription(`\xBB <@${ctx.interaction.user.id}> hat **NEIN** zum verkaufen von seinem **${name}** gesagt.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] CARSELL : ${name} : DENY`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=no.js.map
