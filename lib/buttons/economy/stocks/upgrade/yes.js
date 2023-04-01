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
    name: "stockupgrade-yes"
  },
  async execute(ctx, stock, userid, amount) {
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] STOCKUPGRADE : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
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
    const type = "buy";
    if (type === "buy") {
      if (balance < cost) {
        const missing = cost - balance;
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] STOCKUPGRADE : ${stock.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
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
      ctx.components.rows[0].components[0].setDisabled(true);
      ctx.components.rows[0].components[1].setDisabled(true);
      ctx.components.rows[0].components[1].setStyle(2);
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY STOCK SLOTS").setDescription(`\xBB You successfully bought **${amount}x** ${emoji} Slots for **$${cost}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language == "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AKTIEN SLOTS KAUFEN").setDescription(`\xBB Du hast erfolgreich **${amount}x** ${emoji} Slots f\xFCr **${cost}\u20AC** gekauft!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
      ctx.bot.stocks.add(ctx.interaction.user.id, stock, "max", amount);
      ctx.log(false, `[BTN] STOCKUPGRADE : ${amount}x : ${stock.toUpperCase()} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=yes.js.map
