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
var page_exports = {};
__export(page_exports, {
  default: () => page_default
});
module.exports = __toCommonJS(page_exports);
var import_discord = require("discord.js");
var import_simple_git = __toESM(require("simple-git"));
const git = (0, import_simple_git.default)();
var page_default = {
  data: {
    name: "commits-page"
  },
  async execute(ctx, commitCount, pageNumber, type) {
    if (type === "back")
      pageNumber--;
    if (type === "next")
      pageNumber++;
    if (pageNumber === 0)
      return;
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
    if (commits.length - commitCount > 0)
      commits.splice(commitCount, commits.length - commitCount);
    const startIndex = (pageNumber - 1) * 10;
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
    ctx.components.rows[0].components[0].setCustomId(`COMMITS-REFRESH-${commitCount}-${pageNumber}`);
    ctx.components.rows[0].components[1].setCustomId(`COMMITS-BACK-${commitCount}-${pageNumber}`);
    ctx.components.rows[0].components[2].setCustomId(`COMMITS-NEXT-${commitCount}-${pageNumber}`);
    if (!ctx.components.rows[0].components[1].data.disabled && pageNumber <= 1)
      ctx.components.rows[0].components[1].setDisabled(true);
    else
      ctx.components.rows[0].components[1].setDisabled(false);
    if (!ctx.components.rows[0].components[2].data.disabled && pageNumber >= Math.ceil(commits.length / 10))
      ctx.components.rows[0].components[2].setDisabled(true);
    else
      ctx.components.rows[0].components[2].setDisabled(false);
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB GIT COMMITS").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE " + pageNumber });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB GIT COMMITS").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE " + pageNumber });
    }
    ctx.log(false, `[BTN] COMMITS : ${type.toUpperCase()} : ${type.toUpperCase()} : ${commits.length} : ${pageNumber}`);
    return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=page.js.map
