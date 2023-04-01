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
var search_exports = {};
__export(search_exports, {
  default: () => search_default
});
module.exports = __toCommonJS(search_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var search_default = {
  data: new import_discord2.SlashCommandBuilder().setName("search").setDMPermission(false).setDescription("SHOW A BUTTON TO A SEARCH").setDescriptionLocalizations({
    de: "ZEIGE EINEN KNOPF ZU EINER SUCHE"
  }).addStringOption((option) => option.setName("query").setNameLocalizations({
    de: "suche"
  }).setDescription("THE QUERY").setDescriptionLocalizations({
    de: "DIE SUCHE"
  }).setRequired(true)).addStringOption((option) => option.setName("engine").setDescription("THE SEARCH ENGINE").setDescriptionLocalizations({
    de: "DIE SUCHMASCHINE"
  }).setRequired(false).addChoices(
    // Setup Choices
    { name: "\u{1F914} GOOGLE", value: "Google" },
    { name: "\u2B50 BING", value: "Bing" },
    { name: "\u2B50 YAHOO", value: "Yahoo" },
    { name: "\u2B50 DUCKDUCKGO", value: "DuckDuckGo" }
  )),
  async execute(ctx) {
    let query = ctx.getOption("query");
    let engine = ctx.getOption("engine");
    if (!engine)
      engine = "Google";
    query = encodeURIComponent(query);
    const google = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("\u{1F440} ANSCHAUEN").setURL("https://google.com/search?q=" + query).setStyle(import_discord.ButtonStyle.Link)
    );
    const bing = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("\u{1F440} ANSCHAUEN").setURL("https://bing.com/search?q=" + query).setStyle(import_discord.ButtonStyle.Link)
    );
    const yahoo = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("\u{1F440} ANSCHAUEN").setURL("https://search.yahoo.com/search?q=" + query).setStyle(import_discord.ButtonStyle.Link)
    );
    const duck = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("\u{1F440} ANSCHAUEN").setURL("https://duckduckgo.com/?q=" + query).setStyle(import_discord.ButtonStyle.Link)
    );
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:SEARCH:1024389710279348354> \xBB SEARCH").setDescription(`\xBB Click Below to look up results for **${decodeURIComponent(query)}** on **${engine}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:SEARCH:1024389710279348354> \xBB SUCHEN").setDescription(`\xBB Klicke unten um nach Ergebnissen f\xFCr **${decodeURIComponent(query)}** auf **${engine}** zu finden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] SEARCH : "${decodeURIComponent(query).toUpperCase()}" : ${engine.toUpperCase()}`);
    if (engine === "Google") {
      await ctx.interaction.reply({ embeds: [message], components: [google] });
    }
    ;
    if (engine === "Bing") {
      await ctx.interaction.reply({ embeds: [message], components: [bing] });
    }
    ;
    if (engine === "Yahoo") {
      await ctx.interaction.reply({ embeds: [message], components: [yahoo] });
    }
    ;
    if (engine === "DuckDuckGo") {
      await ctx.interaction.reply({ embeds: [message], components: [duck] });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=search.js.map
