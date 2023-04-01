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
var donate_exports = {};
__export(donate_exports, {
  default: () => donate_default
});
module.exports = __toCommonJS(donate_exports);
var import_discord = require("discord.js");
var donate_default = {
  data: new import_discord.SlashCommandBuilder().setName("donate").setDMPermission(false).setDescription("DONATE THE BOT").setDescriptionLocalizations({
    de: "SPENDE DEM BOT"
  }),
  async execute(ctx) {
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB DONATE").setDescription(`
				\xBB Link
				https://donate.rjansen.de

				\xBB QR Code
			`).setImage("https://img.rjansen.de/bot/donate.png").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB SPENDEN").setDescription(`
					\xBB Link
					https://donate.rjansen.de

					\xBB QR Code
				`).setImage("https://img.rjansen.de/bot/donate.png").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] DONATE <3`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=donate.js.map
