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
    name: "stock-refresh"
  },
  async execute(ctx, stock, userid, type, amount) {
    const ms = (await import("pretty-ms")).default;
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
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] STOCK : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ctx.components.rows[0].components[0].setDisabled(true);
    ctx.components.rows[0].components[1].setDisabled(true);
    ctx.components.rows[0].components[2].setDisabled(true);
    ctx.components.rows[0].components[0].setStyle(2);
    ctx.components.rows[0].components[1].setStyle(2);
    const cost = amount * ctx.client.stocks[stock];
    if (type === "buy") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY STOCKS").setDescription(`
					\u23F2\uFE0F New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

					\xBB Do you want to buy **${amount}x** **${name}** Stock for **$${cost}**?
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AKTIEN KAUFEN").setDescription(`
						\u23F2\uFE0F Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

						\xBB Willst du **${amount}x** **${name}** Aktie f\xFCr **${cost}\u20AC** kaufen?
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKBUY : REFRESH : ${stock.toUpperCase()} : ${amount} : ${cost}\u20AC`);
      return ctx.interaction.update({ embeds: [message] });
    } else if (type === "sell") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB SELL STOCKS").setDescription(`
					\u23F2\uFE0F New Prices in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

					\xBB Do you want to sell **${amount}x** **${name}** Stock for **$${cost}**?
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AKTIEN VERKAUFEN").setDescription(`
						\u23F2\uFE0F Neue Preise in **${ms((ctx.client.stocks.refresh - Math.floor(+/* @__PURE__ */ new Date() / 1e3)) * 1e3, { secondsDecimalDigits: 0 })}**

						\xBB Willst du **${amount}x** **${name}** Aktie f\xFCr **${cost}\u20AC** verkaufen?
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKSELL : REFRESH : ${stock.toUpperCase()} : ${amount} : ${cost}\u20AC`);
      return ctx.interaction.update({ embeds: [message] });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=refresh.js.map
