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
var carbuy_exports = {};
__export(carbuy_exports, {
  default: () => carbuy_default
});
module.exports = __toCommonJS(carbuy_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var carbuy_default = {
  data: new import_discord2.SlashCommandBuilder().setName("carbuy").setDMPermission(false).setDescription("BUY CARS").setDescriptionLocalizations({
    de: "KAUFE AUTOS"
  }).addStringOption((option) => option.setName("car").setNameLocalizations({
    de: "auto"
  }).setDescription("THE CAR").setDescriptionLocalizations({
    de: "DAS AUTO"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} 2016 JEEP PATRIOT SPORT", value: "jeep" },
    { name: "\u{1F535} 2022 KIA SORENTO", value: "kia" },
    { name: "\u{1F7E1} AUDI R8 COUPE V10", value: "audi" },
    { name: "\u{1F7E0} TESLA MODEL Y", value: "tesla" },
    { name: "\u{1F534} 2019 PORSCHE 911 GT2RS", value: "porsche" }
  )),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "cars")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Cars are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Autos sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CAR : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const car = ctx.getOption("car");
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    let cost;
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-PRICE-" + car.toUpperCase()) === "0" || await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-PRICE-" + car.toUpperCase()) === 0) {
      if (car === "jeep")
        cost = 15e3;
      if (car === "kia")
        cost = 75e3;
      if (car === "audi")
        cost = 16e4;
      if (car === "tesla")
        cost = 24e4;
      if (car === "porsche")
        cost = 49e4;
    } else {
      cost = await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-PRICE-" + car.toUpperCase());
    }
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
    if (balance < cost) {
      const missing = cost - balance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CARBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "amount") !== 0) {
      const dbcar = await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "value");
      if (dbcar === "jeep")
        name = "2016 JEEP PATRIOT SPORT";
      if (dbcar === "kia")
        name = "2022 KIA SORENTO";
      if (dbcar === "audi")
        name = "AUDI R8 COUPE V10";
      if (dbcar === "tesla")
        name = "TESLA MODEL Y";
      if (dbcar === "porsche")
        name = "2019 PORSCHE 911 GT2RS";
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You already own a **${name}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt schon einen **${name}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CARBUY : ALREADYOWNCAR : ${name}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId("CAR-BUY-YES-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId("CAR-BUY-NO-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId("CAR-BUY-YES-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId("CAR-BUY-NO-" + car + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY CAR").setDescription(`\xBB Do you want to buy a **${name}** for **$${cost}**?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AUTO KAUFEN").setDescription(`\xBB Willst du einen **${name}** f\xFCr **${cost}\u20AC** kaufen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] CARBUY : ${name.toUpperCase()} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=carbuy.js.map
