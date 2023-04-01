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
var mcsrvinfo_exports = {};
__export(mcsrvinfo_exports, {
  default: () => mcsrvinfo_default
});
module.exports = __toCommonJS(mcsrvinfo_exports);
var import_discord = require("discord.js");
var import_axios = __toESM(require("axios"));
var mcsrvinfo_default = {
  data: new import_discord.SlashCommandBuilder().setName("mcsrvinfo").setDMPermission(false).setDescription("GET INFO ABOUT A MINECRAFT SERVER").setDescriptionLocalizations({
    de: "BEKOMME INFO \xDCBER EINEN MINECRAFT SERVER"
  }).addStringOption((option) => option.setName("address").setNameLocalizations({
    de: "adresse"
  }).setDescription("THE ADDRESS").setDescriptionLocalizations({
    de: "DIE ADRESSE"
  }).setRequired(true)),
  async execute(ctx) {
    await ctx.interaction.deferReply();
    const address = ctx.getOption("address");
    const req = await (0, import_axios.default)({
      method: "GET",
      url: `https://api.mcsrvstat.us/2/${encodeURIComponent(address)}`,
      validateStatus: false,
      headers: {}
    });
    const info = req.data;
    if (info.ip === "127.0.0.1") {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB MINECRAFT SERVER INFO").setDescription(`\xBB The Server **${address}** was not found!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB MINECRAFT SERVER INFO").setDescription(`\xBB Der Server **${address}** wurde nicht gefunden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] MCSRVINFO : ${address.toUpperCase()} : NOTEXIST`);
      return ctx.interaction.editReply({ embeds: [message2] });
    }
    let status = "\u{1F7E1} UNKNOWN";
    if ("online" in info && info.online)
      status = "\u{1F7E2} ONLINE";
    if ("online" in info && !info.online)
      status = "\u{1F534} OFFLINE";
    let players = { online: "?", slots: "?" };
    if ("players" in info)
      players = { online: info.players.online.toString(), slots: info.players.max.toString() };
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB MINECRAFT SERVER INFO").setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`).setDescription(`
				${status}

				\xBB IP
				\`\`\`${info.ip}:${info.port}\`\`\`
				\xBB Players
				\`\`\`${players.online}/${players.slots}\`\`\`
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CUBE:1024404832452350032> \xBB MINECRAFT SERVER INFO").setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`).setDescription(`
					${status}

					\xBB IP
					\`\`\`${info.ip}:${info.port}\`\`\`
					\xBB Spieler
					\`\`\`${players.online}/${players.slots}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] MCSRVINFO : ${address.toUpperCase()}`);
    return ctx.interaction.editReply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=mcsrvinfo.js.map
