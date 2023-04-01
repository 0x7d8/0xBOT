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
var commits_exports = {};
__export(commits_exports, {
  default: () => commits_default
});
module.exports = __toCommonJS(commits_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var import_simple_git = __toESM(require("simple-git"));
const git = (0, import_simple_git.default)();
var commits_default = {
  data: new import_discord2.SlashCommandBuilder().setName("commits").setDMPermission(false).setDescription("SEE ALL COMMITS").setDescriptionLocalizations({
    de: "SEHE ALLE COMMITS"
  }),
  async execute(ctx) {
    let embedDesc = "";
    const gitInfos = await git.log({
      "--pretty": 'format:{"hash":"%h","subject":"%s","author":"%aN","authorDate":"%ad"}'
    });
    const commits = gitInfos.all;
    commits.sort((a, b) => {
      const dateA = new Date(a.authorDate).getTime();
      const dateB = new Date(b.authorDate).getTime();
      return dateA - dateB;
    });
    let index = 0;
    commits.reverse().forEach((commit) => {
      commits[index++] = { ...commit, count: index };
    });
    const startIndex = (Math.ceil(commits.length / 10) - 1) * 10;
    const endIndex = Math.min(startIndex + 10, commits.length);
    for (const element of commits.slice(startIndex, endIndex).reverse()) {
      const count = element.count;
      let formattedCount = count.toString();
      if (count < 100)
        formattedCount = "0" + count;
      if (count < 10)
        formattedCount = "00" + count;
      embedDesc += `**\`${formattedCount}.\`** \xBB ${element.message}
`;
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("UPDATE").setCustomId(`COMMITS-REFRESH-${commits.length}`).setStyle(import_discord.ButtonStyle.Primary),
      new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`COMMITS-BACK-${commits.length}-${Math.ceil(commits.length / 10)}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`COMMITS-NEXT-${commits.length}-${Math.ceil(commits.length / 10)}`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("AKTUALISIEREN").setCustomId(`COMMITS-REFRESH-${commits.length}`).setStyle(import_discord.ButtonStyle.Primary),
        new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`COMMITS-BACK-${commits.length}-${Math.ceil(commits.length / 10)}`).setStyle(import_discord.ButtonStyle.Secondary),
        new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`COMMITS-NEXT-${commits.length}-${Math.ceil(commits.length / 10)}`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB GIT COMMITS").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE " + Math.ceil(commits.length / 10) });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB GIT COMMITS").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE " + Math.ceil(commits.length / 10) });
    }
    ctx.log(false, `[CMD] COMMITS : ${commits.length} : ${Math.ceil(commits.length / 10)}`);
    return ctx.interaction.reply({ embeds: [message], components: [row] }).catch(() => {
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=commits.js.map
