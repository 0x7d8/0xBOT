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
var meme_exports = {};
__export(meme_exports, {
  default: () => meme_default
});
module.exports = __toCommonJS(meme_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var import_axios = __toESM(require("axios"));
var meme_default = {
  data: new import_discord2.SlashCommandBuilder().setName("meme").setDMPermission(false).setDescription("GET A MEME").setDescriptionLocalizations({
    de: "BEKOMME EIN MEME"
  }),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "meme")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB The **\`/meme\`** Command is disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Der **\`/meme\`** Befehl ist auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] MEME : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    await ctx.interaction.deferReply();
    const random = ctx.bot.random(1, 5);
    let subreddit;
    if (random === 1)
      subreddit = "memes";
    if (random === 2)
      subreddit = "me_irl";
    if (random === 3)
      subreddit = "CrappyDesign";
    if (random === 4)
      subreddit = "dankmemes";
    if (random === 5)
      subreddit = "terriblefacebookmemes";
    const req = await import_axios.default.get(`https://www.reddit.com/r/${subreddit}/random/.json`);
    const res = req.data;
    let upvotes = res[0].data.children[0].data.ups;
    let comments = res[0].data.children[0].data.num_comments;
    if (upvotes === 187)
      upvotes += " \u{1F40A}";
    if (comments === 187)
      comments += " \u{1F40A}";
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("NEW").setEmoji("1055826473442873385").setCustomId("meme").setStyle(import_discord.ButtonStyle.Primary),
      new import_discord.ButtonBuilder().setEmoji("1044959793317691513").setLabel(String(upvotes)).setCustomId("BIN-1").setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
      new import_discord.ButtonBuilder().setEmoji("1054857046916341861").setLabel(String(comments)).setCustomId("BIN-2").setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("NEU").setEmoji("1055826473442873385").setCustomId("meme").setStyle(import_discord.ButtonStyle.Primary),
        new import_discord.ButtonBuilder().setEmoji("1044959793317691513").setLabel(String(upvotes)).setCustomId("BIN-1").setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
        new import_discord.ButtonBuilder().setEmoji("1054857046916341861").setLabel(String(comments)).setCustomId("BIN-2").setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:IMAGE:1024405297579696179> \xBB MEME").setDescription(`
				\xBB Title
				\`\`\`${res[0].data.children[0].data.title}\`\`\`
				\xBB Subreddit
				\`\`\`r/${subreddit}\`\`\`
			`).setImage(res[0].data.children[0].data.url).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:IMAGE:1024405297579696179> \xBB MEME").setDescription(`
					\xBB Titel
					\`\`\`${res[0].data.children[0].data.title}\`\`\`
					\xBB Subreddit
					\`\`\`r/${subreddit}\`\`\`
				`).setImage(res[0].data.children[0].data.url).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] MEME : ${subreddit.toUpperCase()} : ${upvotes}^ : ${comments}`);
    return ctx.interaction.editReply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=meme.js.map
