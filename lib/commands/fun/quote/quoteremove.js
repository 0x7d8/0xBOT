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
var quoteremove_exports = {};
__export(quoteremove_exports, {
  default: () => quoteremove_default
});
module.exports = __toCommonJS(quoteremove_exports);
var import_discord = require("discord.js");
var quoteremove_default = {
  data: new import_discord.SlashCommandBuilder().setName("quoteremove").setDMPermission(false).setDescription("REMOVE QUOTES").setDescriptionLocalizations({
    de: "ENTFERNE ZITATE"
  }).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "anzahl"
  }).setDescription("THE AMOUNT").setDescriptionLocalizations({
    de: "DIE ANZAHL"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F4B0} [01] 1000\u20AC", value: 1 },
    { name: "\u{1F4B0} [02] 2000\u20AC", value: 2 },
    { name: "\u{1F4B0} [03] 3000\u20AC", value: 3 },
    { name: "\u{1F4B0} [04] 4000\u20AC", value: 4 },
    { name: "\u{1F4B0} [05] 5000\u20AC", value: 5 }
  )),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "quotes")) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Quotes are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Zitate sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] QUOTEREMOVE : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const amount = ctx.getOption("amount");
    const cost = amount * 1e3;
    const quotes = await ctx.bot.quotes.get(ctx.interaction.user.id);
    const money = await ctx.bot.money.get(ctx.interaction.user.id);
    if (quotes - amount < 0) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have that many Quotes, you only have **${quotes}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast garnicht so viele Zitate, du hast nur **${quotes}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : NOTENOUGHQUOTES`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (money < cost) {
      const missing = cost - money;
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are Missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB QUOTES: " + quotes });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB QUOTES: " + quotes });
      }
      ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let word;
    if (amount === 1)
      word = "Quote";
    else
      word = "Quotes";
    if (ctx.metadata.language === "de") {
      if (amount == 1)
        word = "Zitat";
      else
        word = "Zitate";
    }
    const newquotes = quotes - 1;
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB ZITATE ENTFERNEN").setDescription(`\xBB You successfully removed **${amount}** ${word} for **$${cost}**!`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB QUOTES: " + newquotes });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB ZITATE ENTFERNEN").setDescription(`\xBB Du hast erfolgreich **${amount}** ${word} f\xFCr **${cost}\u20AC** entfernt!`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB QUOTES: " + newquotes });
    }
    ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
    ctx.bot.quotes.rem(ctx.interaction.user.id, amount);
    ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : ${cost}\u20AC`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=quoteremove.js.map
