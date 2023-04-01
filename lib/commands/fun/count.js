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
var count_exports = {};
__export(count_exports, {
  default: () => count_default
});
module.exports = __toCommonJS(count_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var count_default = {
  data: new import_discord2.SlashCommandBuilder().setName("count").setDescription("PRESS A BUTTON").setDescriptionLocalizations({
    de: "DR\xDCCKE EINEN KNOPF"
  }).setDMPermission(false).addStringOption((option) => option.setName("mode").setNameLocalizations({
    de: "modus"
  }).setDescription("THE MODE").setDescriptionLocalizations({
    de: "DER MODUS"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} PLUS", value: "plus" },
    { name: "\u{1F7E1} PLUS & MINUS", value: "minus" }
  )),
  async execute(ctx) {
    const mode = ctx.getOption("mode");
    let row;
    if (mode === "plus") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1024358756940775504").setCustomId("COUNT-PLUS").setStyle(import_discord.ButtonStyle.Secondary)
      );
    } else {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1024358756940775504").setCustomId("COUNT-PLUS").setStyle(import_discord.ButtonStyle.Secondary),
        new import_discord.ButtonBuilder().setEmoji("1024358810418151494").setCustomId("COUNT-MINUS").setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:INFINITE:1024406060380979300> \xBB COUNTING").setDescription(`
				\xBB Current Number
				\`\`\`0\`\`\`
			`).setFooter({ text: "\xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:INFINITE:1024406060380979300> \xBB Z\xC4HLEN").setDescription(`
					\xBB Aktuelle Nummer
					\`\`\`0\`\`\`
				`).setFooter({ text: "\xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] COUNT : ${mode.toUpperCase()}`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=count.js.map
