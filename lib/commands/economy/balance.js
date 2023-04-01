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
var balance_exports = {};
__export(balance_exports, {
  default: () => balance_default
});
module.exports = __toCommonJS(balance_exports);
var import_discord = require("discord.js");
var balance_default = {
  data: new import_discord.SlashCommandBuilder().setName("balance").setDMPermission(false).setDescription("SEE THE BALANCE").setDescriptionLocalizations({
    de: "SEHE DEN KONTOSTAND"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    let money;
    if (!user) {
      money = await ctx.bot.money.get(ctx.interaction.user.id);
      ctx.log(false, `[CMD] BALANCE : ${money}\u20AC`);
    } else {
      money = await ctx.bot.money.get(user.id);
      ctx.log(false, `[CMD] BALANCE : ${user} : ${money}\u20AC`);
    }
    let message;
    if (!user) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB YOUR BALANCE").setDescription(`\xBB Your Balance is **$${money}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB DEIN GELDSTAND").setDescription(`\xBB Dein Geldstand betr\xE4gt **${money}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB THE BALANCE OF " + user.username.toUpperCase()).setDescription(`\xBB The Balance of <@${user.id}> is **$${money}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB DER GELDSTAND VON " + user.username.toUpperCase()).setDescription(`\xBB Der Geldstand von <@${user.id}> betr\xE4gt **${money}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=balance.js.map
