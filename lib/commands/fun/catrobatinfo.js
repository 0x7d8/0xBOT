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
var catrobatinfo_exports = {};
__export(catrobatinfo_exports, {
  default: () => catrobatinfo_default
});
module.exports = __toCommonJS(catrobatinfo_exports);
var import_discord = require("discord.js");
var import_axios = __toESM(require("axios"));
var catrobatinfo_default = {
  data: new import_discord.SlashCommandBuilder().setName("catrobatinfo").setDMPermission(false).setDescription("GET INFO ABOUT A CATROBAT PROJECT").setDescriptionLocalizations({
    de: "BEKOMME INFO \xDCBER EIN CATROBAT PROJEKT"
  }).addStringOption((option) => option.setName("id").setDescription("THE ID").setDescriptionLocalizations({
    de: "DIE ID"
  }).setRequired(true)),
  async execute(ctx) {
    await ctx.interaction.deferReply();
    const id = ctx.getOption("id");
    const req = await (0, import_axios.default)({
      method: "GET",
      url: `https://share.catrob.at/api/project/${id}`,
      validateStatus: false,
      headers: {}
    });
    const info = req.data;
    if (req.status !== 200 && req.status !== 404) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB CATROBAT PROJECT INFO").setDescription(`\xBB Couldnt reach the Catrobat Servers! (Status ${req.status})`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB CATROBAT PROJEKT INFO").setDescription(`\xBB Konnte die Catrobat Server nicht erreichen! (Status ${req.status})`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()} : SERVERSDOWN`);
      return ctx.interaction.editReply({ embeds: [message2] });
    }
    if (req.status === 404) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB CATROBAT PROJECT INFO").setDescription(`\xBB The Project **${id}** was not found!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB CATROBAT PROJEKT INFO").setDescription(`\xBB Das Projekt **${id}** wurde nicht gefunden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()} : NOTEXIST`);
      return ctx.interaction.editReply({ embeds: [message2] });
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB CATROBAT PROJECT INFO").setThumbnail(info.screenshot_small).setDescription(`
				[${info.name}](https://share.catrob.at/app/project/${id})

				\xBB Description
				\`\`\`${info.description.replace("```", "``")}\`\`\`
				\xBB Size
				\`\`\`${Number(info.filesize).toFixed(2)}MB\`\`\`
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB CATOBAT PROJEKT INFO").setThumbnail(info.screenshot_small).setDescription(`
					[${info.name}](https://share.catrob.at/app/project/${id})

					\xBB Beschreibung
					\`\`\`${info.description.replace("```", "``")}\`\`\`
					\xBB Gr\xF6\xDFe
					\`\`\`${Number(info.filesize).toFixed(2)}MB\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()}`);
    return ctx.interaction.editReply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=catrobatinfo.js.map
