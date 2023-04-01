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
var itembuy_exports = {};
__export(itembuy_exports, {
  default: () => itembuy_default
});
module.exports = __toCommonJS(itembuy_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var itembuy_default = {
  data: new import_discord2.SlashCommandBuilder().setName("itembuy").setDMPermission(false).setDescription("BUY ITEMS").setDescriptionLocalizations({
    de: "KAUFE GEGENST\xC4NDE"
  }).addStringOption((option) => option.setName("item").setNameLocalizations({
    de: "gegenstand"
  }).setDescription("THE ITEM").setDescriptionLocalizations({
    de: "DER GEGENSTAND"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F4A3} NORMALE BOMBE", value: "nbomb" },
    { name: "\u{1F4A3} MEDIUM BOMBE", value: "mbomb" },
    { name: "\u{1F4A3} HYPER BOMBE", value: "hbomb" },
    { name: "\u{1F4A3} CRAZY BOMBE", value: "cbomb" }
  )).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "anzahl"
  }).setDescription("THE AMOUNT").setDescriptionLocalizations({
    de: "DIE ANZAHL"
  }).setRequired(false)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "items")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Items are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Items sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, "[CMD] ITEM : DISABLED");
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const itemid = ctx.getOption("item");
    const amount = ctx.getOption("amount");
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    let costmul;
    if (!amount)
      costmul = 1;
    else
      costmul = amount;
    let cost;
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-PRICE-" + itemid.toUpperCase()) === "0" || await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-PRICE-" + itemid.toUpperCase()) === 0) {
      if (itemid === "nbomb")
        cost = 500 * costmul;
      if (itemid === "mbomb")
        cost = 1e3 * costmul;
      if (itemid === "hbomb")
        cost = 5e3 * costmul;
      if (itemid === "cbomb")
        cost = 15e3 * costmul;
    } else {
      cost = Number(await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-PRICE-" + itemid.toUpperCase())) * costmul;
    }
    let name;
    if (itemid === "nbomb")
      name = "<:NBOMB:1021783222520127508> NORMAL BOMB";
    if (itemid === "mbomb")
      name = "<:MBOMB:1021783295211601940> MEDIUM BOMB";
    if (itemid === "hbomb")
      name = "<:HBOMB:1022102357938536458> HYPER BOMB";
    if (itemid === "cbomb")
      name = "<:CBOMB:1021783405161091162> CRAZY BOMB";
    if (ctx.metadata.language === "de") {
      if (itemid === "nbomb")
        name = "<:NBOMB:1021783222520127508> NORMALE BOMBE";
      if (itemid === "mbomb")
        name = "<:MBOMB:1021783295211601940> MEDIUM BOMBE";
      if (itemid === "hbomb")
        name = "<:HBOMB:1022102357938536458> HYPER BOMBE";
      if (itemid === "cbomb")
        name = "<:CBOMB:1021783405161091162> CRAZY BOMBE";
    }
    if (balance < cost) {
      const missing = cost - balance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMBUY : ${itemid.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let pamount;
    if (!amount)
      pamount = 1;
    else
      pamount = amount;
    const oldamount = await ctx.bot.items.get(ctx.interaction.user.id + "-" + itemid.toUpperCase() + "S-" + ctx.interaction.guild.id, "amount");
    if (pamount + oldamount > 15) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Slots for that!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Slots daf\xFCr!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMBUY : ${itemid.toUpperCase()} : MAXSLOTS`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId("ITEM-BUY-YES-" + itemid + "-" + ctx.interaction.user.id + "-" + pamount).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId("ITEM-BUY-NO-" + itemid + "-" + ctx.interaction.user.id + "-" + pamount).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId("ITEM-BUY-YES-" + itemid + "-" + ctx.interaction.user.id + "-" + pamount).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId("ITEM-BUY-NO-" + itemid + "-" + ctx.interaction.user.id + "-" + pamount).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
      );
    }
    let message;
    if (amount === null || amount === 1) {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY ITEM").setDescription(`\xBB Do you want to buy a **${name}** for **$${cost}**?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GEGENSTAND KAUFEN").setDescription(`\xBB Willst du eine **${name}** f\xFCr **${cost}\u20AC** kaufen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY ITEMS").setDescription(`\xBB Do you want to buy **${amount}x** **${name}** for **$${cost}**?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GEGENST\xC4NDE KAUFEN").setDescription(`\xBB Willst du **${amount}x** **${name}** f\xFCr **${cost}\u20AC** kaufen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    ctx.log(false, `[CMD] ITEMBUY : ${pamount}x : ${itemid.toUpperCase()} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=itembuy.js.map
