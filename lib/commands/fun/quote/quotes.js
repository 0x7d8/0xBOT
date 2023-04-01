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
var quotes_exports = {};
__export(quotes_exports, {
  default: () => quotes_default
});
module.exports = __toCommonJS(quotes_exports);
var import_discord = require("discord.js");
var quotes_default = {
  data: new import_discord.SlashCommandBuilder().setName("quotes").setDMPermission(false).setDescription("SEE THE QUOTES").setDescriptionLocalizations({
    de: "SEHE DIE ZITATE"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "quotes")) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Quotes are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Zitate sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] QUOTES : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const user = ctx.interaction.options.getUser("user");
    let quotes;
    if (user == null) {
      quotes = await ctx.bot.quotes.get(ctx.interaction.user.id);
      ctx.log(false, `[CMD] QUOTES : ${quotes}`);
    } else {
      quotes = await ctx.bot.quotes.get(user.id);
      ctx.log(false, `[CMD] QUOTES : ${user} : ${quotes}`);
    }
    let word;
    if (quotes === 1)
      word = "Quote";
    else
      word = "Quotes";
    if (ctx.metadata.language === "de") {
      if (quotes === 1)
        word = "Zitat";
      else
        word = "Zitate";
    }
    let message;
    if (!user) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB YOUR QUOTES").setDescription(`\xBB You have **${quotes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB DEINE ZITATE").setDescription(`\xBB Du hast **${quotes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB THE QUOTES OF " + user.username.toUpperCase()).setDescription(`\xBB <@${user.id}> has **${quotes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUOTES:1024406448127623228> \xBB DIE ZITATE VON " + user.username.toUpperCase()).setDescription(`\xBB <@${user.id}> hat **${quotes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=quotes.js.map
