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
var refresh_exports = {};
__export(refresh_exports, {
  default: () => refresh_default
});
module.exports = __toCommonJS(refresh_exports);
var import_discord = require("discord.js");
var refresh_default = {
  data: {
    name: "stocks-refresh"
  },
  async execute(ctx, userId, pageNumber, selfCmd) {
    ctx.components.rows[0].components[0].setCustomId(`STOCKS-REFRESH-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
    ctx.components.rows[0].components[1].setCustomId(`STOCKS-BACK-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
    ctx.components.rows[0].components[2].setCustomId(`STOCKS-NEXT-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
    const stocks = {
      "green": await ctx.bot.stocks.get(userId, "green", "used"),
      "greenMax": await ctx.bot.stocks.get(userId, "green", "max"),
      "blue": await ctx.bot.stocks.get(userId, "blue", "used"),
      "blueMax": await ctx.bot.stocks.get(userId, "blue", "max"),
      "yellow": await ctx.bot.stocks.get(userId, "yellow", "used"),
      "yellowMax": await ctx.bot.stocks.get(userId, "yellow", "max"),
      "red": await ctx.bot.stocks.get(userId, "red", "used"),
      "redMax": await ctx.bot.stocks.get(userId, "red", "max"),
      "white": await ctx.bot.stocks.get(userId, "white", "used"),
      "whiteMax": await ctx.bot.stocks.get(userId, "white", "max"),
      "black": await ctx.bot.stocks.get(userId, "black", "used"),
      "blackMax": await ctx.bot.stocks.get(userId, "black", "max"),
      "brown": await ctx.bot.stocks.get(userId, "brown", "used"),
      "brownMax": await ctx.bot.stocks.get(userId, "brown", "max"),
      "purple": await ctx.bot.stocks.get(userId, "purple", "used"),
      "purpleMax": await ctx.bot.stocks.get(userId, "purple", "max")
    };
    let userobj;
    if (selfCmd)
      userobj = await ctx.client.users.fetch(userId);
    let message;
    if (!selfCmd) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB YOUR BOUGHT STOCKS").setDescription(`
					${pageNumber === 1 ? `\xBB \u{1F7E2} Green Stock
							\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
							\xBB \u{1F535} Blue Stock
							\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
							\xBB \u{1F7E1} Yellow Stock
							\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
							\xBB \u{1F534} Red Stock
							\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`` : pageNumber === 2 ? `\xBB \u26AA White Stock
							\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
							\xBB \u26AB Black Stock
							\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
							\xBB \u{1F7E4} Brown Stock
							\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
							\xBB \u{1F7E3} Purple Stock
							\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\`` : ""}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE " + pageNumber });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB DEINE LISTE VON AKTIEN IM BESITZ").setDescription(`
						${pageNumber === 1 ? `\xBB \u{1F7E2} Gr\xFCne Aktie
								\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
								\xBB \u{1F535} Blaue Aktie
								\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
								\xBB \u{1F7E1} Gelbe Aktie
								\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
								\xBB \u{1F534} Rote Aktie
								\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`` : pageNumber === 2 ? `\xBB \u26AA Wei\xDFe Aktie
								\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
								\xBB \u26AB Schwarze Aktie
								\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
								\xBB \u{1F7E4} Braune Aktie
								\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
								\xBB \u{1F7E3} Lila Aktie
								\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\`` : ""}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE " + pageNumber });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB THE BOUGHT STOCKS OF " + userobj.username.toUpperCase()).setDescription(`
					${pageNumber === 1 ? `\xBB \u{1F7E2} Green Stock
							\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
							\xBB \u{1F535} Blue Stock
							\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
							\xBB \u{1F7E1} Yellow Stock
							\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
							\xBB \u{1F534} Red Stock
							\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`` : pageNumber === 2 ? `\xBB \u26AA White Stock
							\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
							\xBB \u26AB Black Stock
							\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
							\xBB \u{1F7E4} Brown Stock
							\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
							\xBB \u{1F7E3} Purple Stock
							\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\`` : ""}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE " + pageNumber });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB DIE LISTE VON AKTIEN IM BESITZ VON " + userobj.username.toUpperCase()).setDescription(`
						${pageNumber === 1 ? `\xBB \u{1F7E2} Gr\xFCne Aktie
								\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
								\xBB \u{1F535} Blaue Aktie
								\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
								\xBB \u{1F7E1} Gelbe Aktie
								\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
								\xBB \u{1F534} Rote Aktie
								\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`` : pageNumber === 2 ? `\xBB \u26AA Wei\xDFe Aktie
								\`\`\`${stocks.white} / ${stocks.whiteMax}\`\`\`
								\xBB \u26AB Schwarze Aktie
								\`\`\`${stocks.black} / ${stocks.blackMax}\`\`\`
								\xBB \u{1F7E4} Braune Aktie
								\`\`\`${stocks.brown} / ${stocks.brownMax}\`\`\`
								\xBB \u{1F7E3} Lila Aktie
								\`\`\`${stocks.purple} / ${stocks.purpleMax}\`\`\`` : ""}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE " + pageNumber });
      }
    }
    ctx.log(false, `[BTN] STOCKS : REFRESH :${ctx.interaction.user.id !== userId ? ` ${userId} :` : ""} ${pageNumber} : ${stocks.green} : ${stocks.blue} : ${stocks.yellow} : ${stocks.red} : ${stocks.white} : ${stocks.black} : ${stocks.brown} : ${stocks.purple}`);
    return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=refresh.js.map
