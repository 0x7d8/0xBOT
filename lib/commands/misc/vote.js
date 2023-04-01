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
var vote_exports = {};
__export(vote_exports, {
  default: () => vote_default
});
module.exports = __toCommonJS(vote_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var vote_default = {
  data: new import_discord2.SlashCommandBuilder().setName("vote").setDMPermission(false).setDescription("VOTE FOR THE BOT").setDescriptionLocalizations({
    de: "VOTE F\xDCR DEN BOT"
  }),
  async execute(ctx) {
    const row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("TOP.GG").setURL("https://top.gg/bot/1001944224545128588/vote").setStyle(import_discord.ButtonStyle.Link),
      new import_discord.ButtonBuilder().setLabel("DBL.COM").setURL("https://discordbotlist.com/bots/0xbot/upvote").setStyle(import_discord.ButtonStyle.Link)
    );
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB VOTE").setDescription(`\xBB Click below to go to Vote for the Bot!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB VOTEN").setDescription(`\xBB Klicke unten um f\xFCr den Bot zu Voten!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] VOTE`);
    return ctx.interaction.reply({ embeds: [message], components: [row], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=vote.js.map
