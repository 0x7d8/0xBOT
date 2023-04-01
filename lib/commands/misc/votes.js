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
var votes_exports = {};
__export(votes_exports, {
  default: () => votes_default
});
module.exports = __toCommonJS(votes_exports);
var import_discord = require("discord.js");
var votes_default = {
  data: new import_discord.SlashCommandBuilder().setName("votes").setDMPermission(false).setDescription("SEE THE VOTES").setDescriptionLocalizations({
    de: "SEHE DIE VOTES"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    let votes;
    if (!user) {
      votes = await ctx.bot.votes.get(ctx.interaction.user.id + "-A");
      ctx.log(false, `[CMD] VOTES : ${votes}`);
    } else {
      votes = await ctx.bot.votes.get(user.id + "-A");
      ctx.log(false, `[CMD] VOTES : ${user.id} : ${votes}`);
    }
    let word;
    if (votes === 1)
      word = "Vote";
    else
      word = "Votes";
    let message;
    if (!user) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB YOUR VOTES").setDescription(`\xBB You have **${votes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB DEINE VOTES").setDescription(`\xBB Du hast **${votes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB THE VOTES OF " + user.username.toUpperCase()).setDescription(`\xBB <@${user.id}> has **${votes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB DIE VOTES VON " + user.username.toUpperCase()).setDescription(`\xBB <@${user.id}> hat **${votes}** ${word}!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=votes.js.map
