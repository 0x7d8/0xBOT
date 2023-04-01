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
var itemprice_exports = {};
__export(itemprice_exports, {
  default: () => itemprice_default
});
module.exports = __toCommonJS(itemprice_exports);
var import_discord = require("discord.js");
var itemprice_default = {
  data: new import_discord.SlashCommandBuilder().setName("itemprice").setDMPermission(false).setDescription("SET STORE PRICES").setDescriptionLocalizations({
    de: "SETZE SHOP PREISE"
  }).addStringOption((option) => option.setName("item").setNameLocalizations({
    de: "gegenstand"
  }).setDescription("THE ITEM").setDescriptionLocalizations({
    de: "DER GEGENSTAND"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F4A3} [250\u20AC-1500\u20AC] NORMALE BOMBE", value: "nbomb" },
    { name: "\u{1F4A3} [750\u20AC-5000\u20AC] MEDIUM BOMBE", value: "mbomb" },
    { name: "\u{1F4A3} [2500\u20AC-15000\u20AC] HYPER BOMBE", value: "hbomb" },
    { name: "\u{1F4A3} [7500\u20AC-20000\u20AC] CRAZY BOMBE", value: "cbomb" }
  )).addIntegerOption((option) => option.setName("price").setNameLocalizations({
    de: "preis"
  }).setDescription("THE NEW PRICE [THE FIRST VALUE IS THE PRODUCTION COST]").setDescriptionLocalizations({
    de: "DER NEUE PREIS [DIE ERSTE ZAHL IST DER PRODUKTIONS PREIS]"
  }).setRequired(true)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "businesses")) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Businesses are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Gesch\xE4fte sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESS : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const itemid = ctx.getOption("item");
    const newprice = ctx.getOption("price");
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-OWNER") !== ctx.interaction.user.id) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont own this Business!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt dieses Gesch\xE4ft nicht!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMPRICE : NOTOWNER`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let doscream = false;
    if (itemid === "nbomb" && !ctx.bot.inRange(newprice, 250, 1500))
      doscream = true;
    if (itemid === "mbomb" && !ctx.bot.inRange(newprice, 750, 5e3))
      doscream = true;
    if (itemid === "hbomb" && !ctx.bot.inRange(newprice, 2500, 15e3))
      doscream = true;
    if (itemid === "cbomb" && !ctx.bot.inRange(newprice, 7500, 2e4))
      doscream = true;
    if (doscream) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Please follow the limits seen in the first step!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Bitte folge den Limits zu sehen im ersten Schritt!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMPRICE : ${newprice} : NOTLIMIT`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-1-PRICE-" + itemid.toUpperCase(), newprice.toString());
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:PARTITION:1024399126403747970> \xBB ITEM PRICES").setDescription(`\xBB Successfully set the price to **$${newprice}**.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language == "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:PARTITION:1024399126403747970> \xBB ITEM PREISE").setDescription(`\xBB Erfolgreich den Preis auf **${newprice}\u20AC** gesetzt.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] ITEMPRICE : ${itemid.toUpperCase()} : ${newprice}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=itemprice.js.map
