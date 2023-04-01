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
var refresh_exports = {};
__export(refresh_exports, {
  default: () => refresh_default
});
module.exports = __toCommonJS(refresh_exports);
var import_discord = require("discord.js");
var refresh_default = {
  data: {
    name: "stockinfo-refresh"
  },
  async execute(ctx, pageNumber) {
    const ms = (await import("pretty-ms")).default;
    ctx.components.rows[0].components[0].setCustomId(`STOCKINFO-REFRESH-${pageNumber}`);
    ctx.components.rows[0].components[1].setCustomId(`STOCKINFO-BACK-${pageNumber}`);
    ctx.components.rows[0].components[2].setCustomId(`STOCKINFO-NEXT-${pageNumber}`);
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
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB THE CURRENT STOCK PRICES").setDescription(`
				\u23F2\uFE0F New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

        ${pageNumber === 1 ? `\xBB ${stockEmojis["green"]} Green Stock
            \`\`\`$${ctx.client.stocks.green} (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
            \xBB ${stockEmojis["blue"]} Blue Stock
            \`\`\`$${ctx.client.stocks.blue} (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
            \xBB ${stockEmojis["yellow"]} Yellow Stock
            \`\`\`$${ctx.client.stocks.yellow} (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
						\xBB ${stockEmojis["red"]} Red Stock
            \`\`\`$${ctx.client.stocks.red} (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`` : pageNumber === 2 ? `\xBB ${stockEmojis["white"]} White Stock
            \`\`\`$${ctx.client.stocks.white} (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)\`\`\`
            \xBB ${stockEmojis["black"]} Black Stock
            \`\`\`$${ctx.client.stocks.black} (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)\`\`\`
						\xBB ${stockEmojis["brown"]} Brown Stock
            \`\`\`$${ctx.client.stocks.brown} (${ctx.bot.perCalc(ctx.client.stocks.brown, ctx.client.stocks.oldbrown)}%)\`\`\`
						\xBB ${stockEmojis["purple"]} Purple Stock
            \`\`\`$${ctx.client.stocks.purple} (${ctx.bot.perCalc(ctx.client.stocks.purple, ctx.client.stocks.oldpurple)}%)\`\`\`` : ""}
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE " + pageNumber });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB DIE AKTUELLSTEN AKTIEN PREISE").setDescription(`
					\u23F2\uFE0F Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

					${pageNumber === 1 ? `\xBB ${stockEmojis["green"]} Gr\xFCne Aktie
              \`\`\`${ctx.client.stocks.green}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.green, ctx.client.stocks.oldgreen)}%)\`\`\`
              \xBB ${stockEmojis["blue"]} Blaue Aktie
              \`\`\`${ctx.client.stocks.blue}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.blue, ctx.client.stocks.oldblue)}%)\`\`\`
              \xBB ${stockEmojis["yellow"]} Gelbe Aktie
              \`\`\`${ctx.client.stocks.yellow}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.yellow, ctx.client.stocks.oldyellow)}%)\`\`\`
							\xBB ${stockEmojis["red"]} Rote Aktie
              \`\`\`${ctx.client.stocks.red}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.red, ctx.client.stocks.oldred)}%)\`\`\`` : pageNumber === 2 ? `\xBB ${stockEmojis["white"]} Wei\xDFe Aktie
              \`\`\`${ctx.client.stocks.white}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.white, ctx.client.stocks.oldwhite)}%)\`\`\`
              \xBB ${stockEmojis["black"]} Schwarze Aktie
              \`\`\`${ctx.client.stocks.black}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.black, ctx.client.stocks.oldblack)}%)\`\`\`
							\xBB ${stockEmojis["brown"]} Braune Aktie
              \`\`\`${ctx.client.stocks.brown}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.brown, ctx.client.stocks.oldbrown)}%)\`\`\`
							\xBB ${stockEmojis["purple"]} Lila Aktie
              \`\`\`${ctx.client.stocks.purple}\u20AC (${ctx.bot.perCalc(ctx.client.stocks.purple, ctx.client.stocks.oldpurple)}%)\`\`\`` : ""}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE " + pageNumber });
    }
    ctx.log(false, `[BTN] STOCKINFO : REFRESH : ${pageNumber}`);
    return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=refresh.js.map
