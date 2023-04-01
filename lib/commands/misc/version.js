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
var version_exports = {};
__export(version_exports, {
  default: () => version_default
});
module.exports = __toCommonJS(version_exports);
var import_discord = require("discord.js");
var version_default = {
  data: new import_discord.SlashCommandBuilder().setName("version").setDMPermission(false).setDescription("THE BOT VERSION").setDescriptionLocalizations({
    de: "DIE BOT VERSION"
  }),
  async execute(ctx) {
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB BOT VERSION").setDescription(`
				\xBB Bot Version
				\`\`\`${ctx.client.config.version} (V3)\`\`\`
				\xBB Library
				\`\`\`discord.js ${import_discord.version}\`\`\`
				\xBB Author
				\`\`\`0x4096#7678\`\`\`
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB BOT VERSION").setDescription(`
					\xBB Bot Version
					\`\`\`${ctx.client.config.version} (V3)\`\`\`
					\xBB Bibliothek
					\`\`\`discord.js ${import_discord.version}\`\`\`
					\xBB Autor
					\`\`\`0x4096#7678\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] VERSION`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=version.js.map
