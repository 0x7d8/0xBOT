var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stockbuy_exports = {};
__export(stockbuy_exports, {
  default: () => stockbuy_default
});
module.exports = __toCommonJS(stockbuy_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var stockbuy_default = {
  data: new import_discord2.SlashCommandBuilder().setName("stockbuy").setDMPermission(false).setDescription("BUY STOCKS").setDescriptionLocalizations({
    de: "KAUFE AKTIEN"
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
    { name: "\u26AB SCHWARZE AKTIE", value: "black" },
    { name: "\u{1F7E4} BRAUNE AKTIE", value: "brown" },
    { name: "\u{1F7E3} LILA AKTIE", value: "purple" }
  )).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "anzahl"
  }).setDescription("THE AMOUNT").setDescriptionLocalizations({
    de: "DIE ANZAHL"
  }).setRequired(true)),
  async execute(ctx) {
    const ms = (await import("pretty-ms")).default;
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "stocks")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Stocks are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Aktien sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKBUY : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const stock = ctx.getOption("stock");
    const amount = ctx.getOption("amount");
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    let name;
    if (stock === "green")
      name = "\u{1F7E2} GREEN";
    if (stock === "blue")
      name = "\u{1F535} BLUE";
    if (stock === "yellow")
      name = "\u{1F7E1} YELLOW";
    if (stock === "red")
      name = "\u{1F534} RED";
    if (stock === "white")
      name = "\u26AA WHITE";
    if (stock === "black")
      name = "\u26AB BLACK";
    if (stock === "brown")
      name = "\u{1F7E4} BROWN";
    if (stock === "purple")
      name = "\u{1F7E3} PURPLE";
    if (ctx.metadata.language === "de") {
      if (stock === "green")
        name = "\u{1F7E2} GR\xDCNE";
      if (stock === "blue")
        name = "\u{1F535} BLAUE";
      if (stock === "yellow")
        name = "\u{1F7E1} GELBE";
      if (stock === "red")
        name = "\u{1F534} ROTE";
      if (stock === "white")
        name = "\u26AA WEI\xDFE";
      if (stock === "black")
        name = "\u26AB SCHWARZE";
      if (stock === "brown")
        name = "\u{1F7E4} BRAUNE";
      if (stock === "purple")
        name = "\u{1F7E3} LILA";
    }
    if (amount < 0) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant buy a negative amount of Stocks!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst keine negativen Anzahlen kaufen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKBUY : NEGATIVESTOCKS : ${amount}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const used = await ctx.bot.stocks.get(ctx.interaction.user.id, stock, "used");
    const max = await ctx.bot.stocks.get(ctx.interaction.user.id, stock, "max");
    if (max < used + amount) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant buy more than **${max}** of this Stock!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst nicht mehr als **${max}** von dieser Aktie kaufen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKBUY : MAX : ${stock.toUpperCase()} : ${amount}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const cost = amount * ctx.client.stocks[stock];
    if (balance < cost) {
      const missing = cost - balance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKBUY : ${stock.toUpperCase()} : ${amount} : ${cost}\u20AC : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("UPDATE").setCustomId(`STOCK-BUY-REFRESH-${stock}-${ctx.interaction.user.id}-${amount}`).setEmoji("1055826473442873385").setStyle(import_discord.ButtonStyle.Primary).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId(`STOCK-BUY-YES-${stock}-${ctx.interaction.user.id}-${amount}`).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId(`STOCK-BUY-NO-${stock}-${ctx.interaction.user.id}-${amount}`).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("AKTUALISIEREN").setCustomId(`STOCK-BUY-REFRESH-${stock}-${ctx.interaction.user.id}-${amount}`).setEmoji("1055826473442873385").setStyle(import_discord.ButtonStyle.Primary).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId(`STOCK-BUY-YES-${stock}-${ctx.interaction.user.id}-${amount}`).setEmoji("1024382935618572299").setStyle(import_discord.ButtonStyle.Success).setDisabled(false),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId(`STOCK-BUY-NO-${stock}-${ctx.interaction.user.id}-${amount}`).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger).setDisabled(false)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY STOCKS").setDescription(`
				\u23F2\uFE0F New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

				\xBB Do you want to buy **${amount}x** **${name}** Stock for **$${cost}**?
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AKTIEN KAUFEN").setDescription(`
					\u23F2\uFE0F Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

					\xBB Willst du **${amount}x** **${name}** Aktie f\xFCr **${cost}\u20AC** kaufen?
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] STOCKBUY : ${stock.toUpperCase()} : ${amount} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=stockbuy.js.map
