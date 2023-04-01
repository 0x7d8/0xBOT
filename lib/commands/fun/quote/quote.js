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
var quote_exports = {};
__export(quote_exports, {
  default: () => quote_default
});
module.exports = __toCommonJS(quote_exports);
var import_discord = require("discord.js");
var quote_default = {
  data: new import_discord.SlashCommandBuilder().setName("quote").setDescription("QUOTE SOMETHING").setDescriptionLocalizations({
    de: "ZITIERE ETWAS"
  }).setDMPermission(false).addStringOption((option) => option.setName("quote").setNameLocalizations({
    de: "zitat"
  }).setDescription("THE QUOTE").setDescriptionLocalizations({
    de: "DAS ZITAT"
  }).setRequired(true)).addUserOption((option) => option.setName("author").setNameLocalizations({
    de: "autor"
  }).setDescription("THE AUTHOR").setDescriptionLocalizations({
    de: "DER AUTOR"
  }).setRequired(false)),
  async execute(ctx) {
    const ms = (await import("pretty-ms")).default;
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "quotes")) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Quotes are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Zitate sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] QUOTE : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const quote = ctx.getOption("quote");
    const author = ctx.interaction.options.getUser("author");
    if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, "quote")).onCooldown) {
      const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, "quote")).remaining;
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You still have a Cooldown of **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast leider noch einen Cooldown von **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] QUOTE : ONCOOLDOWN : ${ms(timeLeft, { secondsDecimalDigits: 0 })}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let message;
    if (!author || ctx.interaction.user.id === author.id) {
      const amount = await ctx.bot.quotes.get(ctx.interaction.user.id) + 1;
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB A WISE QUOTE").setDescription(`\xBB "${quote}" ~<@${ctx.interaction.user.id}>`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB QUOTES: " + amount });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB EIN WEISES ZITAT").setDescription(`\xBB "${quote}" ~<@${ctx.interaction.user.id}>`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB ZITATE: " + amount });
      }
      ctx.log(false, `[CMD] QUOTE : ${quote.toUpperCase()}`);
    } else {
      const amount = await ctx.bot.quotes.get(author.id) + 1;
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB A QUOTE").setDescription(`\xBB "${quote}" ~<@${author.id}>`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB QUOTES: " + amount });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB EIN ZITAT").setDescription(`\xBB "${quote}" ~<@${author.id}>`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB ZITATE: " + amount });
      }
      ctx.log(false, `[CMD] QUOTE : ${quote.toUpperCase()} : ${author.id}`);
      ctx.bot.quotes.add(author.id, 1);
    }
    ctx.bot.cooldown.set(ctx.interaction.user.id, "quote", 1 * 60 * 1e3);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=quote.js.map
