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
var stockupgrade_exports = {};
__export(stockupgrade_exports, {
  default: () => stockupgrade_default
});
module.exports = __toCommonJS(stockupgrade_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var stockupgrade_default = {
  data: new import_discord2.SlashCommandBuilder().setName("stockupgrade").setDMPermission(false).setDescription("BUY STOCK SLOTS").setDescriptionLocalizations({
    de: "KAUFE AKTIEN SLOTS"
  }).addStringOption((option) => option.setName("stock").setNameLocalizations({
    de: "aktie"
  }).setDescription("THE STOCK").setDescriptionLocalizations({
    de: "DIE AKTIE"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} GR\xDCNE AKTIE", value: "green" },
    { name: "\u{1F535} BLAUE AKTIE", value: "blue" },
    { name: "\u{1F7E1} GELBE AKTIE", value: "yellow" },
    { name: "\u{1F534} ROTE AKTIE", value: "red" },
    { name: "\u26AA WEISSE AKTIE", value: "white" },
    { name: "\u26AB SCHWARZE AKTIE", value: "black" }
  )).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "anzahl"
  }).setDescription("THE SLOTS").setDescriptionLocalizations({
    de: "DIE SLOTS"
  }).setRequired(true)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "stocks")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Stocks are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Aktien sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKUPGRADE : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const stock = ctx.getOption("stock");
    const amount = ctx.getOption("amount");
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    let baseCost;
    if (stock === "green")
      baseCost = 15e3;
    if (stock === "blue")
      baseCost = 2e4;
    if (stock === "yellow")
      baseCost = 25e3;
    if (stock === "red")
      baseCost = 3e4;
    if (stock === "white")
      baseCost = 35e3;
    if (stock === "black")
      baseCost = 4e4;
    const cost = amount * baseCost;
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
    if (balance < cost) {
      const missing = cost - balance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKUPGRADE : ${stock.toUpperCase()} : ${amount}x : ${cost}\u20AC : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId("STOCKUPGRADE-BUY-YES-" + stock + "-" + ctx.interaction.user.id + "-" + amount).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId("STOCKUPGRADE-BUY-NO-" + stock + "-" + ctx.interaction.user.id + "-" + amount).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId("STOCKUPGRADE-BUY-YES-" + stock + "-" + ctx.interaction.user.id + "-" + amount).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId("STOCKUPGRADE-BUY-NO-" + stock + "-" + ctx.interaction.user.id + "-" + amount).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY STOCK SLOTS").setDescription(`\xBB Do you want to buy **${amount}x** ${emoji} for **$${cost}**?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AKTIEN SLOTS KAUFEN").setDescription(`\xBB Willst du **${amount}x** ${emoji} f\xFCr **${cost}\u20AC** kaufen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] STOCKUPGRADE : ${amount}x : ${stock.toUpperCase()} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=stockupgrade.js.map
