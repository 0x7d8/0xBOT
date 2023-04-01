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
var carsell_exports = {};
__export(carsell_exports, {
  default: () => carsell_default
});
module.exports = __toCommonJS(carsell_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var carsell_default = {
  data: new import_discord2.SlashCommandBuilder().setName("carsell").setDMPermission(false).setDescription("SELL YOUR CAR").setDescriptionLocalizations({
    de: "VERKAUFE DEIN AUTO"
  }),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "cars")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Cars are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Autos sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CAR : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const car = await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "value");
    let cost;
    if (car === "jeep")
      cost = 15e3;
    if (car === "kia")
      cost = 75e3;
    if (car === "tesla")
      cost = 24e4;
    if (car === "porsche")
      cost = 49e4;
    let name;
    if (car === "jeep")
      name = "2016 JEEP PATRIOT SPORT";
    if (car === "kia")
      name = "2022 KIA SORENTO";
    if (car === "tesla")
      name = "TESLA MODEL Y";
    if (car === "porsche")
      name = "2019 PORSCHE 911 GT2RS";
    if (await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "amount") === 0) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont own a Car!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt kein Auto!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CARSELL : DONTOWNCAR`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId("CAR-SELL-YES-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382942153285632").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId("CAR-SELL-NO-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId("CAR-SELL-YES-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382942153285632").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId("CAR-SELL-NO-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB SELL CAR").setDescription(`\xBB Do you want to sell your **${name}** for **$${cost / 2}**?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB AUTO VERKAUFEN").setDescription(`\xBB Willst du deinen **${name}** f\xFCr **${cost / 2}\u20AC** verkaufen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] CARSELL : ${name} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=carsell.js.map
