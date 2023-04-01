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
var stockinfo_exports = {};
__export(stockinfo_exports, {
  default: () => stockinfo_default
});
module.exports = __toCommonJS(stockinfo_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var stockinfo_default = {
  data: new import_discord2.SlashCommandBuilder().setName("stockinfo").setDMPermission(false).setDescription("SEE STOCK PRICES").setDescriptionLocalizations({
    de: "SEHE AKTIEN PREISE"
  }),
  async execute(ctx) {
    const ms = (await import("pretty-ms")).default;
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "stocks")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Stocks are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Aktien sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKINFO : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let stockEmojis = {
      green: "",
      blue: "",
      yellow: "",
      red: "",
      white: "",
      black: "",
      brown: "",
      purple: ""
    };
    let stockList = [
      "green",
      "blue",
      "yellow",
      "red",
      "white",
      "black",
      "brown",
      "purple"
    ];
    stockList.forEach((stock) => {
      if (ctx.client.stocks[stock] > ctx.client.stocks["old" + stock])
        stockEmojis[stock] = "<:UP:1009502422990860350>";
      else if (ctx.client.stocks[stock] < ctx.client.stocks["old" + stock])
        stockEmojis[stock] = "<:DOWN:1009502386320056330>";
      else
        stockEmojis[stock] = "\u{1F9D0}";
    });
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("UPDATE").setCustomId(`STOCKINFO-REFRESH-1`).setStyle(import_discord.ButtonStyle.Primary),
      new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`STOCKINFO-BACK-1`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
      new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`STOCKINFO-NEXT-1`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("AKTUALISIEREN").setCustomId(`STOCKINFO-REFRESH-1`).setStyle(import_discord.ButtonStyle.Primary),
        new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`STOCKINFO-BACK-1`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
        new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`STOCKINFO-NEXT-1`).setStyle(import_discord.ButtonStyle.Secondary)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB THE CURRENT STOCK PRICES").setDescription(`
				\u23F2\uFE0F New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

				\xBB ${stockEmojis["green"]} Green Stock
				\`\`\`$${ctx.client.stocks.green} (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
				\xBB ${stockEmojis["blue"]} Blue Stock
				\`\`\`$${ctx.client.stocks.blue} (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
				\xBB ${stockEmojis["yellow"]} Yellow Stock
				\`\`\`$${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
				\xBB ${stockEmojis["red"]} Red Stock
				\`\`\`$${ctx.client.stocks.red} (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE 1" });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB DIE AKTUELLSTEN AKTIEN PREISE").setDescription(`
					\u23F2\uFE0F Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

					\xBB ${stockEmojis["green"]} Gr\xFCne Aktie
					\`\`\`${ctx.client.stocks.green}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
					\xBB ${stockEmojis["blue"]} Blaue Aktie
					\`\`\`${ctx.client.stocks.blue}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
					\xBB ${stockEmojis["yellow"]} Gelbe Aktie
					\`\`\`${ctx.client.stocks.yellow}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
					\xBB ${stockEmojis["red"]} Rote Aktie
					\`\`\`${ctx.client.stocks.red}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE 1" });
    }
    ctx.log(false, `[CMD] STOCKINFO : 1 : ${ctx.client.stocks.green}\u20AC : ${ctx.client.stocks.blue}\u20AC : ${ctx.client.stocks.yellow}\u20AC : ${ctx.client.stocks.red}\u20AC : ${ctx.client.stocks.white}\u20AC : ${ctx.client.stocks.black}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=stockinfo.js.map
