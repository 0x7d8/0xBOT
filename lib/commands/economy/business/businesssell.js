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
var businesssell_exports = {};
__export(businesssell_exports, {
  default: () => businesssell_default
});
module.exports = __toCommonJS(businesssell_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var businesssell_default = {
  data: new import_discord2.SlashCommandBuilder().setName("businesssell").setDMPermission(false).setDescription("SELL YOUR BUSINESS").setDescriptionLocalizations({
    de: "VERKAUFE DEIN GESCH\xC4FT"
  }),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "businesses")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Businesses are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Gesch\xE4fte sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESS : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const business = await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS");
    let cost;
    if (business === "market")
      cost = 15e4;
    if (business === "parking garage")
      cost = 39e4;
    if (business === "car dealership")
      cost = 52e4;
    let name;
    if (business === "market")
      name = "MARKET";
    if (business === "parking garage")
      name = "PARKING GARAGE";
    if (business === "car dealership")
      name = "CAR DEALERSHIP";
    if (ctx.metadata.language === "de") {
      if (business === "market")
        name = "SUPERMARKT";
      if (business === "parking garage")
        name = "PARKHAUS";
      if (business === "car dealership")
        name = "AUTOHAUS";
    }
    if (await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS") === 0) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont own a Business!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt kein Gesch\xE4ft!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESSSELL : ${business} : DONTOWNBUSINESS`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId("BUSINESS-SELL-YES-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382942153285632").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId("BUSINESS-SELL-NO-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId("BUSINESS-SELL-YES-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382942153285632").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId("BUSINESS-SELL-NO-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB SELL BUSINESS").setDescription(`\xBB Do you want to sell your **${name}** for **$${cost / 2}**?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB GESCH\xC4FT VERKAUFEN").setDescription(`\xBB Willst du dein **${name}** f\xFCr **${cost / 2}\u20AC** verkaufen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] BUSINESSSELL : ${name} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=businesssell.js.map
