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
var carprice_exports = {};
__export(carprice_exports, {
  default: () => carprice_default
});
module.exports = __toCommonJS(carprice_exports);
var import_discord = require("discord.js");
var carprice_default = {
  data: new import_discord.SlashCommandBuilder().setName("carprice").setDMPermission(false).setDescription("SET CAR PRICES").setDescriptionLocalizations({
    de: "SETZE AUTO PREISE"
  }).addStringOption((option) => option.setName("car").setNameLocalizations({
    de: "auto"
  }).setDescription("THE CAR").setDescriptionLocalizations({
    de: "DAS AUTO"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} [5000\u20AC-15000\u20AC] 2016 JEEP PATRIOT SPORT", value: "jeep" },
    { name: "\u{1F535} [50000\u20AC-90000\u20AC] 2022 KIA SORENTO", value: "kia" },
    { name: "\u{1F7E1} [140000\u20AC-200000\u20AC] AUDI R8 COUPE V10", value: "audi" },
    { name: "\u{1F7E0} [220000\u20AC-260000\u20AC] TESLA MODEL Y", value: "tesla" },
    { name: "\u{1F534} [400000\u20AC-500000\u20AC] 2019 PORSCHE 911 GT2RS", value: "porsche" }
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
    const car = ctx.getOption("car");
    const newprice = ctx.getOption("price");
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-OWNER") !== ctx.interaction.user.id) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont own this Business!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt dieses Gesch\xE4ft nicht!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CARPRICE : NOTOWNER`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let doscream = false;
    if (car === "jeep" && !ctx.bot.inRange(newprice, 5e3, 15e3))
      doscream = true;
    if (car === "kia" && !ctx.bot.inRange(newprice, 5e4, 9e4))
      doscream = true;
    if (car === "audi" && !ctx.bot.inRange(newprice, 14e4, 2e5))
      doscream = true;
    if (car === "tesla" && !ctx.bot.inRange(newprice, 22e4, 26e4))
      doscream = true;
    if (car === "porsche" && !ctx.bot.inRange(newprice, 4e5, 5e5))
      doscream = true;
    if (doscream) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Please follow the limits seen in the first step!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Bitte folge den Limits zu sehen im ersten Schritt!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CARPRICE : ${newprice} : NOTLIMIT`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-3-PRICE-" + car.toUpperCase(), newprice.toString());
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:PARTITION:1024399126403747970> \xBB CAR PRICES").setDescription(`\xBB Successfully set the price to **$${newprice}**.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:PARTITION:1024399126403747970> \xBB AUTO PREISE").setDescription(`\xBB Erfolgreich den Preis auf **${newprice}\u20AC** gesetzt.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] CARPRICE : ${car.toUpperCase()} : ${newprice}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=carprice.js.map
