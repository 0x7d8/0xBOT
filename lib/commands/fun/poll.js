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
var poll_exports = {};
__export(poll_exports, {
  default: () => poll_default
});
module.exports = __toCommonJS(poll_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var poll_default = {
  data: new import_discord2.SlashCommandBuilder().setName("poll").setDMPermission(false).setDescription("MAKE A POLL").setDescriptionLocalizations({
    de: "MACHE EINE UMFRAGE"
  }).addStringOption((option) => option.setName("text").setDescription("THE TEXT").setDescriptionLocalizations({
    de: "DER TEXT"
  }).setRequired(true)),
  async execute(ctx) {
    const question = ctx.getOption("text");
    const row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1044959793317691513").setLabel("0 [0%]").setCustomId("POLL-YES").setStyle(import_discord.ButtonStyle.Success),
      new import_discord.ButtonBuilder().setEmoji("1044959826914070568").setLabel("0 [0%]").setCustomId("POLL-NO").setStyle(import_discord.ButtonStyle.Danger)
    );
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:POLL:1024391847092703365> \xBB POLL").setDescription(`
				\xBB Question
				\`\`\`${question}\`\`\`
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:POLL:1024391847092703365> \xBB ABSTIMMUNG").setDescription(`
					\xBB Frage
					\`\`\`${question}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] POLL : ${question.toUpperCase()}`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=poll.js.map
