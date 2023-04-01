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
var showerthought_exports = {};
__export(showerthought_exports, {
  default: () => showerthought_default
});
module.exports = __toCommonJS(showerthought_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var import_axios = __toESM(require("axios"));
var showerthought_default = {
  data: new import_discord2.SlashCommandBuilder().setName("showerthought").setDMPermission(false).setDescription("GET A SHOWERTHOUGHT").setDescriptionLocalizations({
    de: "BEKOMME EINE DUSCH-PHILOSOPHIE"
  }),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "showerthought")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB The **\`/showerthought\`** Command is disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Der **\`/showerthought\`** Befehl ist auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] SHOWERTHOUGHT : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    await ctx.interaction.deferReply();
    const req = await import_axios.default.get(`https://www.reddit.com/r/Showerthoughts/random/.json`);
    const res = req.data;
    let upvotes = res[0].data.children[0].data.ups;
    if (upvotes === 187)
      upvotes += " \u{1F40A}";
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("NEW").setEmoji("1055826473442873385").setCustomId("showerthought").setStyle(import_discord.ButtonStyle.Primary),
      new import_discord.ButtonBuilder().setEmoji("1044959793317691513").setLabel(String(upvotes)).setCustomId("BIN-1").setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("NEU").setEmoji("1055826473442873385").setCustomId("showerthought").setStyle(import_discord.ButtonStyle.Primary),
        new import_discord.ButtonBuilder().setEmoji("1044959793317691513").setLabel(String(upvotes)).setCustomId("BIN-1").setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:IMAGE:1024405297579696179> \xBB SHOWERTHOUGHT").setDescription(`
				\xBB Thought
				\`\`\`${res[0].data.children[0].data.title}\`\`\`
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      const germanThought = (await (0, import_axios.default)({
        method: "POST",
        url: "https://api-free.deepl.com/v2/translate",
        headers: {
          "Authentication": `DeepL-Auth-Key ${ctx.client.config.keys.deepl}`,
          "User-Agent": `0xBOT/${ctx.client.config.version}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: `auth_key=${ctx.client.config.keys.deepl}&text=${encodeURIComponent(res[0].data.children[0].data.title)}&target_lang=DE`
      })).data;
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:IMAGE:1024405297579696179> \xBB DUSCH-PHILOSOPHIE").setDescription(`
					\xBB Gedanke
					\`\`\`${germanThought.translations[0].text}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] SHOWERTHOUGHT : ${upvotes}^`);
    return ctx.interaction.editReply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=showerthought.js.map
