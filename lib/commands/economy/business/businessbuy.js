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
var businessbuy_exports = {};
__export(businessbuy_exports, {
  default: () => businessbuy_default
});
module.exports = __toCommonJS(businessbuy_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var businessbuy_default = {
  data: new import_discord2.SlashCommandBuilder().setName("businessbuy").setDMPermission(false).setDescription("BUY BUSINESSES").setDescriptionLocalizations({
    de: "KAUFE GESCH\xC4FTE"
  }).addStringOption((option) => option.setName("business").setNameLocalizations({
    de: "gesch\xE4ft"
  }).setDescription("THE BUSINESS").setDescriptionLocalizations({
    de: "DAS GESCH\xC4FT"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} [150000\u20AC] SUPERMARKT", value: "market" },
    { name: "\u{1F535} [390000\u20AC] PARKHAUS (WIP)", value: "parking garage" },
    { name: "\u{1F7E1} [520000\u20AC] AUTOHAUS", value: "car dealership" }
  )),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "businesses")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Businesses are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Gesch\xE4fte sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESS : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const business = ctx.getOption("business");
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    if (business === "parking garage") {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This Business will be included soon!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Dieses Gesch\xE4ft wird bald hinzugef\xFCgt!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESSBUY : WIP`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let businessid;
    if (business === "market")
      businessid = "1";
    if (business === "parking garage")
      businessid = "2";
    if (business === "car dealership")
      businessid = "3";
    let businessowner, oldleft;
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-" + businessid + "-OWNER") !== 0) {
      oldleft = false;
      businessowner = await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-" + businessid + "-OWNER");
      const fetchc = await ctx.interaction.guild.members.fetch(businessowner);
      if (typeof fetchc === "undefined")
        oldleft = true;
      if (!oldleft) {
        let message2;
        if (ctx.interaction.user.id !== businessowner) {
          message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${businessowner}> already owns this Business!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
          if (ctx.metadata.language === "de") {
            message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Dieses Gesch\xE4ft geh\xF6rt schon <@${businessowner}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
          }
        } else {
          message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You already own this Business!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
          if (ctx.metadata.language === "de") {
            message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Dieses Gesch\xE4ft geh\xF6rt schon dir!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
          }
        }
        ctx.log(false, `[CMD] BUSINESSBUY : ${business.toUpperCase()} : ALREADYOWNED`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
    }
    if (await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-BUSINESS") !== 0) {
      const userbusiness = await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-BUSINESS");
      let name2;
      if (userbusiness === "market")
        name2 = "MARKET";
      if (userbusiness === "parking garage")
        name2 = "PARKING GARAGE";
      if (userbusiness === "car dealership")
        name2 = "CAR DEALERSHIP";
      if (ctx.metadata.language === "de") {
        if (userbusiness === "market")
          name2 = "SUPERMARKT";
        if (userbusiness === "parking garage")
          name2 = "PARKHAUS";
        if (userbusiness === "car dealership")
          name2 = "AUTOHAUS";
      }
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You already own a **${name2}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt schon ein **${name2}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESSBUY : ALREADYBUSINESS`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
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
    if (balance < cost) {
      const missing = cost - balance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESSBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId("BUSINESS-BUY-YES-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId("BUSINESS-BUY-NO-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId("BUSINESS-BUY-YES-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId("BUSINESS-BUY-NO-" + business + "-" + ctx.interaction.user.id).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
      );
    }
    ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-" + businessid + "-OWNER");
    ctx.bot.businesses.del("u-" + businessowner + "-" + ctx.interaction.guild.id + "-BUSINESS");
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY BUSINESS").setDescription(`\xBB Do you want to buy a **${name}** for **$${cost}**?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GESCH\xC4FT KAUFEN").setDescription(`\xBB Willst du ein **${name}** f\xFCr **${cost}\u20AC** kaufen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] BUSINESSBUY : ${name.toUpperCase()} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=businessbuy.js.map
