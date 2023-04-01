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
var yes_exports = {};
__export(yes_exports, {
  default: () => yes_default
});
module.exports = __toCommonJS(yes_exports);
var import_discord = require("discord.js");
var yes_default = {
  data: {
    name: "stock-yes"
  },
  async execute(ctx, stock, userid, type, amount) {
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
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] STOCK : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    const cost = amount * ctx.client.stocks[stock];
    if (type === "buy") {
      if (balance < cost) {
        const missing = cost - balance;
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] STOCKBUY : ${stock.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      ctx.components.rows[0].components[0].setDisabled(true);
      ctx.components.rows[0].components[1].setDisabled(true);
      ctx.components.rows[0].components[2].setDisabled(true);
      ctx.components.rows[0].components[0].setStyle(2);
      ctx.components.rows[0].components[2].setStyle(2);
      const transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: ctx.interaction.user.id,
          amount: cost,
          type: "negative"
        },
        reciever: {
          id: `${amount}x ${stock.toUpperCase()} STOCK`,
          amount: cost,
          type: "positive"
        }
      });
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY STOCKS").setDescription(`
					\xBB You successfully bought **${amount}x** **${name}** Stock for **$${cost}**!

					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language == "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AKTIEN KAUFEN").setDescription(`
						\xBB Du hast erfolgreich **${amount}x** **${name}** Aktie f\xFCr **${cost}\u20AC** gekauft!

						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.stocks.add(ctx.interaction.user.id, stock, "used", amount);
      ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
      ctx.log(false, `[BTN] STOCKBUY : ${stock.toUpperCase()} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    } else if (type === "sell") {
      if (await ctx.bot.stocks.get(ctx.interaction.user.id, stock, "used") < amount) {
        const missing = amount - await ctx.bot.stocks.get(ctx.interaction.user.id, stock, "used");
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Stocks for that, you are missing **${missing}** **${name}** Stock!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.interaction.guildLocale) {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast daf\xFCr nicht genug Aktien, dir fehlen **${missing}** **${name}** Aktie!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] STOCKSELL : ${stock.toUpperCase()} : ${amount} : ${cost}\u20AC : NOTENOUGHSTOCKS`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      ctx.components.rows[0].components[0].setDisabled(true);
      ctx.components.rows[0].components[1].setDisabled(true);
      ctx.components.rows[0].components[2].setDisabled(true);
      ctx.components.rows[0].components[0].setStyle(2);
      ctx.components.rows[0].components[2].setStyle(2);
      const transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: `${amount}x ${stock.toUpperCase()} STOCK`,
          amount: cost,
          type: "negative"
        },
        reciever: {
          id: ctx.interaction.user.id,
          amount: cost,
          type: "positive"
        }
      });
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB SELL STOCKS").setDescription(`
					\xBB You successfully sold **${amount}x** **${name}** Stock for **$${cost}**!

					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB AKTIEN VERKAUFEN").setDescription(`
						\xBB Du hast erfolgreich **${amount}x** **${name}** Aktie f\xFCr **${cost}\u20AC** verkauft!

						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.stocks.rem(ctx.interaction.user.id, stock, "used", amount);
      ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
      ctx.log(false, `[BTN] STOCKSELL : ${stock.toUpperCase()} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=yes.js.map
